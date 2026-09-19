using System;
using System.IO;
using System.Drawing;
using System.Windows.Forms;
using System.Collections.Generic;
using System.Web.Script.Serialization;
using System.Threading.Tasks;
using Microsoft.Web.WebView2.Core;
using Microsoft.Web.WebView2.WinForms;

namespace ZeaAppManager.Desktop {
    static class Program {
        [STAThread]
        static void Main() {
            Application.ThreadException += (s, ev) => {
                try { File.WriteAllText(Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "crash_thread.txt"), ev.Exception.ToString()); } catch { }
            };
            AppDomain.CurrentDomain.UnhandledException += (s, ev) => {
                try { File.WriteAllText(Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "crash_domain.txt"), ev.ExceptionObject.ToString()); } catch { }
            };

            try {
                Application.EnableVisualStyles();
                Application.SetCompatibleTextRenderingDefault(false);

                MainForm form = new MainForm();
                Application.Run(form);
            } catch (Exception ex) {
                try {
                    File.WriteAllText(Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "startup_error.txt"), ex.ToString());
                } catch { }
            }
        }
    }

    public class MainForm : Form {
        private WebView2 uiWebView;
        private Panel browserPanel;
        private Dictionary<string, WebView2> tabWebViews = new Dictionary<string, WebView2>();
        private string activeTabId = null;
        private JavaScriptSerializer serializer = new JavaScriptSerializer();
        private bool isModalOpen = false;
        private string baseDataDir;
        private CoreWebView2Environment sharedEnv = null;

        public MainForm() {
            this.Text = "Zea App Manager - Multi-Account AI Suite";
            this.Width = 1360;
            this.Height = 860;
            this.MinimumSize = new Size(1020, 680);
            this.StartPosition = FormStartPosition.CenterScreen;
            this.BackColor = Color.FromArgb(250, 246, 245);

            string iconPath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "zea.ico");
            if (File.Exists(iconPath)) {
                try {
                    this.Icon = new Icon(iconPath);
                } catch { }
            }

            // Determine base data directory for multi-account persistent profiles
            string baseDir = AppDomain.CurrentDomain.BaseDirectory;
            string portableDataDir = Path.Combine(baseDir, "data");
            try {
                if (!Directory.Exists(portableDataDir)) {
                    Directory.CreateDirectory(portableDataDir);
                }
                baseDataDir = portableDataDir;
            } catch {
                baseDataDir = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData), "ZeaAppManager", "data");
                Directory.CreateDirectory(baseDataDir);
            }

            // 1. Native Browser Panel (hosts active account's WebView2)
            browserPanel = new Panel();
            browserPanel.BackColor = Color.White;
            browserPanel.Visible = false; // Hidden on dashboard
            this.Controls.Add(browserPanel);

            // 2. UI Shell WebView2 (hosts React sidebar, tabs, navbar, toolbar, dashboard)
            uiWebView = new WebView2();
            uiWebView.Dock = DockStyle.Fill;
            uiWebView.DefaultBackgroundColor = Color.FromArgb(250, 246, 245);
            this.Controls.Add(uiWebView);

            // Keep browserPanel in front of uiWebView
            browserPanel.BringToFront();

            this.Load += MainForm_Load;
            this.FormClosing += MainForm_FormClosing;
        }

        private async void MainForm_Load(object sender, EventArgs e) {
            try {
                string mainUserData = Path.Combine(baseDataDir, "profiles", "EBWebView");
                Directory.CreateDirectory(mainUserData);

                CoreWebView2EnvironmentOptions uiOptions = new CoreWebView2EnvironmentOptions();
                uiOptions.AdditionalBrowserArguments = "--noerrdialogs";

                sharedEnv = await CoreWebView2Environment.CreateAsync(null, mainUserData, uiOptions);
                await uiWebView.EnsureCoreWebView2Async(sharedEnv);

                uiWebView.CoreWebView2.Settings.IsStatusBarEnabled = false;
                uiWebView.CoreWebView2.Settings.AreDefaultContextMenusEnabled = true;
                uiWebView.CoreWebView2.Settings.IsWebMessageEnabled = true;

                // Handle IPC messages from React UI
                uiWebView.CoreWebView2.WebMessageReceived += UiWebView_WebMessageReceived;

                // Determine web app assets path
                string baseDir = AppDomain.CurrentDomain.BaseDirectory;
                string distDir = Path.Combine(baseDir, "dist");

                if (!Directory.Exists(distDir)) {
                    string parentDist = Path.GetFullPath(Path.Combine(baseDir, "..", "dist"));
                    if (Directory.Exists(parentDist)) {
                        distDir = parentDist;
                    }
                }

                if (Directory.Exists(distDir)) {
                    uiWebView.CoreWebView2.SetVirtualHostNameToFolderMapping(
                        "app.zea.local", 
                        distDir, 
                        CoreWebView2HostResourceAccessKind.Allow
                    );
                    uiWebView.CoreWebView2.Navigate("https://app.zea.local/index.html");
                } else {
                    uiWebView.CoreWebView2.Navigate("http://127.0.0.1:5173/");
                }

            } catch (Exception ex) {
                try {
                    File.WriteAllText(Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "load_error.txt"), ex.ToString());
                } catch { }
                MessageBox.Show(
                    "Gagal menginisialisasi WebView2:\n" + ex.Message + "\n\nPastikan Microsoft Edge WebView2 Runtime terpasang.",
                    "Zea App Manager - Error",
                    MessageBoxButtons.OK,
                    MessageBoxIcon.Error
                );
            }
        }

        private void UiWebView_WebMessageReceived(object sender, CoreWebView2WebMessageReceivedEventArgs e) {
            try {
                string json = e.WebMessageAsJson;
                if (string.IsNullOrEmpty(json)) return;

                Dictionary<string, object> msg = serializer.Deserialize<Dictionary<string, object>>(json);
                if (!msg.ContainsKey("type")) return;

                string type = Convert.ToString(msg["type"]);

                if (type == "SYNC_VIEWPORT") {
                    HandleSyncViewport(msg);
                } else if (type == "NAVIGATE") {
                    HandleNavigate(msg);
                } else if (type == "RELOAD") {
                    HandleReload(msg);
                } else if (type == "GO_BACK") {
                    HandleGoBack(msg);
                } else if (type == "GO_FORWARD") {
                    HandleGoForward(msg);
                } else if (type == "CLOSE_TAB") {
                    HandleCloseTab(msg);
                } else if (type == "CLEAR_SESSION") {
                    HandleClearSession(msg);
                } else if (type == "MODAL_STATE") {
                    HandleModalState(msg);
                }
            } catch { }
        }

        private async void HandleSyncViewport(Dictionary<string, object> msg) {
            try {
                bool visible = false;
                if (msg.ContainsKey("visible")) {
                    visible = Convert.ToBoolean(msg["visible"]);
                }

                if (!visible || isModalOpen) {
                    browserPanel.Visible = false;
                    return;
                }

                float dpi = this.CreateGraphics().DpiX / 96f;
                int x = (int)(Convert.ToSingle(msg["x"]) * dpi);
                int y = (int)(Convert.ToSingle(msg["y"]) * dpi);
                int width = (int)(Convert.ToSingle(msg["width"]) * dpi);
                int height = (int)(Convert.ToSingle(msg["height"]) * dpi);

                if (width > 20 && height > 20) {
                    browserPanel.SetBounds(x, y, width, height);
                }

                browserPanel.Visible = true;
                browserPanel.BringToFront();

                string tabId = msg.ContainsKey("tabId") ? Convert.ToString(msg["tabId"]) : null;
                string accountId = msg.ContainsKey("accountId") ? Convert.ToString(msg["accountId"]) : tabId;
                string service = msg.ContainsKey("service") ? Convert.ToString(msg["service"]) : "flow";
                string url = msg.ContainsKey("url") ? Convert.ToString(msg["url"]) : "https://labs.google/flow";

                if (!string.IsNullOrEmpty(tabId)) {
                    await SwitchOrCreateTabAsync(tabId, accountId, service, url);
                }
            } catch { }
        }

        private async Task SwitchOrCreateTabAsync(string tabId, string accountId, string service, string initialUrl) {
            activeTabId = tabId;

            WebView2 webView;
            if (!tabWebViews.TryGetValue(tabId, out webView)) {
                webView = new WebView2();
                webView.Dock = DockStyle.Fill;
                webView.DefaultBackgroundColor = Color.White;
                browserPanel.Controls.Add(webView);
                tabWebViews[tabId] = webView;

                if (sharedEnv != null) {
                    string safeAccount = CleanFileName(accountId);
                    CoreWebView2ControllerOptions controllerOptions = sharedEnv.CreateCoreWebView2ControllerOptions();
                    controllerOptions.ProfileName = safeAccount;
                    controllerOptions.IsInPrivateModeEnabled = false;

                    await webView.EnsureCoreWebView2Async(sharedEnv, controllerOptions);

                    // Use standard Chrome UserAgent so Google login and Flow load without 403 or disallowed_useragent
                    webView.CoreWebView2.Settings.UserAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36";
                    webView.CoreWebView2.Settings.AreDefaultContextMenusEnabled = true;
                    webView.CoreWebView2.Settings.IsStatusBarEnabled = false;
                    webView.CoreWebView2.Settings.AreDevToolsEnabled = true;

                    // Track URL and title changes and sync back to React address bar
                    webView.CoreWebView2.SourceChanged += (s, args) => NotifyUrlChanged(tabId, webView);
                    webView.CoreWebView2.NavigationCompleted += (s, args) => NotifyUrlChanged(tabId, webView);
                    webView.CoreWebView2.DocumentTitleChanged += (s, args) => NotifyUrlChanged(tabId, webView);

                    // Download handling
                    webView.CoreWebView2.DownloadStarting += (s, args) => {
                        try {
                            string downloads = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.UserProfile), "Downloads");
                            if (Directory.Exists(downloads)) {
                                args.ResultFilePath = Path.Combine(downloads, Path.GetFileName(args.ResultFilePath));
                            }
                        } catch { }
                    };

                    // Handle popups/redirects
                    webView.CoreWebView2.NewWindowRequested += (s, args) => {
                        if (!string.IsNullOrEmpty(args.Uri)) {
                            args.Handled = true;
                            webView.CoreWebView2.Navigate(args.Uri);
                        }
                    };

                    webView.CoreWebView2.Navigate(initialUrl);
                }
            } else {
                if (webView.CoreWebView2 != null && (webView.Source == null || string.IsNullOrEmpty(webView.Source.ToString()) || webView.Source.ToString() == "about:blank")) {
                    webView.CoreWebView2.Navigate(initialUrl);
                }
            }

            // Show active WebView, hide others
            foreach (var kvp in tabWebViews) {
                if (kvp.Key == tabId) {
                    kvp.Value.Visible = true;
                    kvp.Value.BringToFront();
                } else {
                    kvp.Value.Visible = false;
                }
            }
        }

        private void NotifyUrlChanged(string tabId, WebView2 webView) {
            try {
                if (uiWebView != null && uiWebView.CoreWebView2 != null && webView.CoreWebView2 != null) {
                    var msg = new Dictionary<string, object>();
                    msg["type"] = "URL_CHANGED";
                    msg["tabId"] = tabId;
                    msg["url"] = webView.CoreWebView2.Source;
                    msg["title"] = webView.CoreWebView2.DocumentTitle;
                    msg["canGoBack"] = webView.CoreWebView2.CanGoBack;
                    msg["canGoForward"] = webView.CoreWebView2.CanGoForward;

                    string json = serializer.Serialize(msg);
                    uiWebView.CoreWebView2.PostWebMessageAsJson(json);
                }
            } catch { }
        }

        private void HandleNavigate(Dictionary<string, object> msg) {
            string tabId = msg.ContainsKey("tabId") ? Convert.ToString(msg["tabId"]) : activeTabId;
            if (tabId != null && tabWebViews.ContainsKey(tabId) && msg.ContainsKey("url")) {
                var wv = tabWebViews[tabId];
                string url = Convert.ToString(msg["url"]);
                if (wv.CoreWebView2 != null && !string.IsNullOrEmpty(url)) {
                    wv.CoreWebView2.Navigate(url);
                }
            }
        }

        private void HandleReload(Dictionary<string, object> msg) {
            string tabId = msg.ContainsKey("tabId") ? Convert.ToString(msg["tabId"]) : activeTabId;
            if (tabId != null && tabWebViews.ContainsKey(tabId)) {
                var wv = tabWebViews[tabId];
                if (wv.CoreWebView2 != null) wv.CoreWebView2.Reload();
            }
        }

        private void HandleGoBack(Dictionary<string, object> msg) {
            string tabId = msg.ContainsKey("tabId") ? Convert.ToString(msg["tabId"]) : activeTabId;
            if (tabId != null && tabWebViews.ContainsKey(tabId)) {
                var wv = tabWebViews[tabId];
                if (wv.CoreWebView2 != null && wv.CoreWebView2.CanGoBack) wv.CoreWebView2.GoBack();
            }
        }

        private void HandleGoForward(Dictionary<string, object> msg) {
            string tabId = msg.ContainsKey("tabId") ? Convert.ToString(msg["tabId"]) : activeTabId;
            if (tabId != null && tabWebViews.ContainsKey(tabId)) {
                var wv = tabWebViews[tabId];
                if (wv.CoreWebView2 != null && wv.CoreWebView2.CanGoForward) wv.CoreWebView2.GoForward();
            }
        }

        private void HandleCloseTab(Dictionary<string, object> msg) {
            if (!msg.ContainsKey("tabId")) return;
            string tabId = Convert.ToString(msg["tabId"]);
            if (tabWebViews.ContainsKey(tabId)) {
                var wv = tabWebViews[tabId];
                tabWebViews.Remove(tabId);
                browserPanel.Controls.Remove(wv);
                wv.Dispose();
            }
            if (activeTabId == tabId) {
                activeTabId = null;
                browserPanel.Visible = false;
            }
        }

        private async void HandleClearSession(Dictionary<string, object> msg) {
            string tabId = msg.ContainsKey("tabId") ? Convert.ToString(msg["tabId"]) : activeTabId;
            if (tabId != null && tabWebViews.ContainsKey(tabId)) {
                var wv = tabWebViews[tabId];
                if (wv.CoreWebView2 != null) {
                    await wv.CoreWebView2.Profile.ClearBrowsingDataAsync();
                    wv.CoreWebView2.Reload();
                }
            }
        }

        private void HandleModalState(Dictionary<string, object> msg) {
            if (msg.ContainsKey("isOpen")) {
                isModalOpen = Convert.ToBoolean(msg["isOpen"]);
                if (isModalOpen) {
                    browserPanel.Visible = false;
                } else if (activeTabId != null && activeTabId != "dashboard") {
                    browserPanel.Visible = true;
                    browserPanel.BringToFront();
                }
            }
        }

        private static string CleanFileName(string name) {
            if (string.IsNullOrEmpty(name)) return "default";
            char[] invalid = Path.GetInvalidFileNameChars();
            string clean = name;
            foreach (char c in invalid) {
                clean = clean.Replace(c, '_');
            }
            return clean.Trim();
        }

        private void MainForm_FormClosing(object sender, FormClosingEventArgs e) {
            try {
                File.WriteAllText(Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "closing_reason.txt"), "CloseReason: " + e.CloseReason.ToString() + "\nStackTrace: " + Environment.StackTrace);
            } catch { }
            try {
                foreach (var kvp in tabWebViews) {
                    try { kvp.Value.Dispose(); } catch { }
                }
                tabWebViews.Clear();

                if (uiWebView != null) {
                    uiWebView.Dispose();
                }
            } catch { }
        }
    }
}
