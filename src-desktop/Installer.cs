using System;
using System.IO;
using System.IO.Compression;
using System.Drawing;
using System.Reflection;
using System.Diagnostics;
using System.Windows.Forms;

namespace ZeaAppManager.Installer {
    static class Program {
        [STAThread]
        static void Main(string[] args) {
            Application.EnableVisualStyles();
            Application.SetCompatibleTextRenderingDefault(false);

            Application.Run(new InstallerForm());
        }
    }

    public class InstallerForm : Form {
        private ProgressBar pbar;
        private Label lblStatus;
        private Timer timer;
        private int progressStep = 0;
        private string targetDir;
        private string exePath;

        public InstallerForm() {
            this.Text = "Zea App Manager - Setup Portable";
            this.FormBorderStyle = FormBorderStyle.FixedDialog;
            this.MaximizeBox = false;
            this.MinimizeBox = false;
            this.StartPosition = FormStartPosition.CenterScreen;
            this.Size = new Size(460, 260);
            this.BackColor = Color.FromArgb(250, 246, 245);

            string iconPath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "zea.ico");
            if (File.Exists(iconPath)) {
                try { this.Icon = new Icon(iconPath); } catch { }
            }

            Panel pnlHeader = new Panel();
            pnlHeader.Dock = DockStyle.Top;
            pnlHeader.Height = 70;
            pnlHeader.BackColor = Color.FromArgb(122, 31, 31); // Zea Burgundy

            Label lblTitle = new Label();
            lblTitle.Text = "Zea App Manager";
            lblTitle.Font = new Font("Segoe UI", 14, FontStyle.Bold);
            lblTitle.ForeColor = Color.White;
            lblTitle.Location = new Point(20, 14);
            lblTitle.AutoSize = true;
            pnlHeader.Controls.Add(lblTitle);

            Label lblSub = new Label();
            lblSub.Text = "Multi-Account AI Suite (Google Flow, Dola, ChatGPT, Claude)";
            lblSub.Font = new Font("Segoe UI", 8.5f, FontStyle.Regular);
            lblSub.ForeColor = Color.FromArgb(253, 214, 214);
            lblSub.Location = new Point(22, 40);
            lblSub.AutoSize = true;
            pnlHeader.Controls.Add(lblSub);

            this.Controls.Add(pnlHeader);

            lblStatus = new Label();
            lblStatus.Text = "Menyiapkan berkas Zea App Manager...";
            lblStatus.Font = new Font("Segoe UI", 9, FontStyle.Regular);
            lblStatus.ForeColor = Color.FromArgb(60, 60, 60);
            lblStatus.Location = new Point(24, 95);
            lblStatus.Size = new Size(400, 20);
            this.Controls.Add(lblStatus);

            pbar = new ProgressBar();
            pbar.Location = new Point(24, 125);
            pbar.Size = new Size(396, 24);
            pbar.Style = ProgressBarStyle.Continuous;
            pbar.Value = 10;
            this.Controls.Add(pbar);

            Label lblPath = new Label();
            lblPath.Text = "Lokasi: %LOCALAPPDATA%\\ZeaAppManager\\App";
            lblPath.Font = new Font("Segoe UI", 7.5f, FontStyle.Italic);
            lblPath.ForeColor = Color.FromArgb(120, 120, 120);
            lblPath.Location = new Point(24, 160);
            lblPath.AutoSize = true;
            this.Controls.Add(lblPath);

            string localAppData = Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData);
            targetDir = Path.Combine(localAppData, "ZeaAppManager", "App");
            exePath = Path.Combine(targetDir, "ZeaAppManager.exe");

            timer = new Timer();
            timer.Interval = 120;
            timer.Tick += Timer_Tick;
            timer.Start();
        }

        private void Timer_Tick(object sender, EventArgs e) {
            progressStep++;
            if (progressStep == 2) {
                pbar.Value = 35;
                lblStatus.Text = "Mengekstrak profil dan dependensi WebView2...";
                ExtractEmbeddedZip();
            } else if (progressStep == 5) {
                pbar.Value = 75;
                lblStatus.Text = "Membuat shortcut di Desktop...";
                CreateShortcuts();
            } else if (progressStep == 8) {
                pbar.Value = 100;
                lblStatus.Text = "Selesai! Membuka Zea App Manager...";
            } else if (progressStep >= 10) {
                timer.Stop();
                try {
                    if (File.Exists(exePath)) {
                        Process.Start(new ProcessStartInfo(exePath) {
                            WorkingDirectory = targetDir
                        });
                    }
                } catch { }
                Application.Exit();
            }
        }

        private void ExtractEmbeddedZip() {
            try {
                if (!Directory.Exists(targetDir)) {
                    Directory.CreateDirectory(targetDir);
                }

                Assembly asm = Assembly.GetExecutingAssembly();
                using (Stream stream = asm.GetManifestResourceStream("app_manager_bundle.zip")) {
                    if (stream != null) {
                        string tempZip = Path.Combine(Path.GetTempPath(), "zea_mgr_" + Guid.NewGuid().ToString("N") + ".zip");
                        using (FileStream fs = new FileStream(tempZip, FileMode.Create)) {
                            stream.CopyTo(fs);
                        }
                        
                        using (ZipArchive archive = ZipFile.OpenRead(tempZip)) {
                            foreach (ZipArchiveEntry entry in archive.Entries) {
                                string destinationPath = Path.GetFullPath(Path.Combine(targetDir, entry.FullName));
                                if (entry.FullName.EndsWith("/") || entry.FullName.EndsWith("\\")) {
                                    Directory.CreateDirectory(destinationPath);
                                } else {
                                    string dir = Path.GetDirectoryName(destinationPath);
                                    if (!Directory.Exists(dir)) {
                                        Directory.CreateDirectory(dir);
                                    }
                                    entry.ExtractToFile(destinationPath, true);
                                }
                            }
                        }

                        try { File.Delete(tempZip); } catch { }
                    }
                }
            } catch (Exception ex) {
                MessageBox.Show("Error saat ekstraksi: " + ex.Message);
            }
        }

        private void CreateShortcuts() {
            try {
                Type shellType = Type.GetTypeFromProgID("WScript.Shell");
                if (shellType != null) {
                    dynamic shell = Activator.CreateInstance(shellType);
                    string desktop = Environment.GetFolderPath(Environment.SpecialFolder.DesktopDirectory);
                    string shortcutPath = Path.Combine(desktop, "Zea App Manager.lnk");

                    dynamic shortcut = shell.CreateShortcut(shortcutPath);
                    shortcut.TargetPath = exePath;
                    shortcut.WorkingDirectory = targetDir;
                    shortcut.Description = "Zea App Manager - Multi-Account AI Suite";
                    string iconFile = Path.Combine(targetDir, "zea.ico");
                    if (File.Exists(iconFile)) {
                        shortcut.IconLocation = iconFile + ",0";
                    }
                    shortcut.Save();

                    // Start Menu Shortcut
                    string startMenu = Environment.GetFolderPath(Environment.SpecialFolder.Programs);
                    string startMenuShortcut = Path.Combine(startMenu, "Zea App Manager.lnk");
                    dynamic smShortcut = shell.CreateShortcut(startMenuShortcut);
                    smShortcut.TargetPath = exePath;
                    smShortcut.WorkingDirectory = targetDir;
                    smShortcut.Description = "Zea App Manager";
                    if (File.Exists(iconFile)) {
                        smShortcut.IconLocation = iconFile + ",0";
                    }
                    smShortcut.Save();
                }
            } catch { }
        }
    }
}
