import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialAccounts, supportedPlatforms } from '../data/platforms';

const ManagerContext = createContext();

export const ManagerProvider = ({ children }) => {
  const [accounts, setAccounts] = useState(() => {
    const saved = localStorage.getItem('zea_accounts');
    let loaded = initialAccounts;
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) loaded = parsed;
      } catch (e) {}
    }
    // Migration: ensure Dola & ChatGPT accounts have accurate URLs and clean names
    return loaded.map(acc => {
      if (acc.provider === 'dola' && (acc.url?.includes('dola.me') || acc.url === 'https://web.dola.me' || !acc.url)) {
        return { ...acc, url: 'https://www.dola.com/chat/' };
      }
      if (acc.provider === 'chatgpt') {
        const updated = { ...acc, url: 'https://chatgpt.com/' };
        if (updated.name === 'ChatGPT Plus Agency') {
          updated.name = 'ChatGPT';
        }
        return updated;
      }
      return acc;
    });
  });

  // Sidebar visibility toggle state
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    const saved = localStorage.getItem('zea_sidebar_open');
    return saved !== null ? saved === 'true' : true;
  });

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => {
      const next = !prev;
      localStorage.setItem('zea_sidebar_open', String(next));
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
      }, 60);
      return next;
    });
  };

  // Active tab: 'dashboard' or an account ID
  const [activeTabId, setActiveTabId] = useState('dashboard');
  
  // List of open tabs: [ { id: 'dashboard', title: 'Dashboard' }, ...accounts ]
  const [openTabs, setOpenTabs] = useState([
    { id: 'dashboard', name: 'Dashboard Akun', provider: 'all' }
  ]);

  const [filterProvider, setFilterProvider] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState(null);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  // Toast
  const [toast, setToast] = useState(null);

  useEffect(() => {
    localStorage.setItem('zea_accounts', JSON.stringify(accounts));
  }, [accounts]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  const openAccountTab = (account) => {
    // Add to open tabs if not already open
    setOpenTabs(prev => {
      const exists = prev.some(t => t.id === account.id);
      if (!exists) {
        return [...prev, account];
      }
      return prev;
    });
    setActiveTabId(account.id);
  };

  const closeTab = (id, e) => {
    if (e) e.stopPropagation();
    if (id === 'dashboard') return; // Cannot close dashboard

    if (window.chrome?.webview) {
      window.chrome.webview.postMessage({
        type: 'CLOSE_TAB',
        tabId: id
      });
    }

    setOpenTabs(prev => {
      const remaining = prev.filter(t => t.id !== id);
      if (activeTabId === id) {
        // Switch to the last open tab or dashboard
        const nextActive = remaining[remaining.length - 1] || { id: 'dashboard' };
        setActiveTabId(nextActive.id);
      }
      return remaining;
    });
  };

  const addAccount = (data) => {
    const platform = supportedPlatforms.find(p => p.id === data.provider) || supportedPlatforms[0];
    const newAccount = {
      id: 'zea-' + Date.now().toString(36) + '-' + Math.random().toString(36).substring(2, 7),
      name: data.name.trim() || `${platform.name} Akun`,
      provider: data.provider,
      url: data.url?.trim() || platform.defaultUrl,
      email: data.email?.trim() || null,
      favorite: false,
      order: accounts.length,
      status: 'Ready',
      lastActive: 'Baru dibuat',
      notes: data.notes?.trim() || '',
      proxy: data.proxy?.trim() || ''
    };

    setAccounts(prev => [newAccount, ...prev]);
    showToast(`Akun '${newAccount.name}' berhasil ditambahkan!`);
    openAccountTab(newAccount);
    setIsAddModalOpen(false);
    setEditingAccount(null);
  };

  const updateAccount = (id, updatedFields) => {
    setAccounts(prev =>
      prev.map(acc => (acc.id === id ? { ...acc, ...updatedFields } : acc))
    );
    // Update also in open tabs if open
    setOpenTabs(prev =>
      prev.map(tab => (tab.id === id ? { ...tab, ...updatedFields } : tab))
    );

    // If URL was modified, notify native WebView2 to navigate
    if (updatedFields.url && window.chrome?.webview) {
      window.chrome.webview.postMessage({
        type: 'NAVIGATE',
        tabId: id,
        url: updatedFields.url
      });
    }

    showToast('Perubahan akun berhasil disimpan!');
    setIsAddModalOpen(false);
    setEditingAccount(null);
  };

  const deleteAccount = (id) => {
    const acc = accounts.find(a => a.id === id);
    if (!acc) return;
    if (window.confirm(`Yakin ingin menghapus profil akun '${acc.name}'? Data login & sesi akun ini akan dibersihkan.`)) {
      setAccounts(prev => prev.filter(a => a.id !== id));
      closeTab(id);
      showToast(`Akun '${acc.name}' dihapus`, 'info');
    }
  };

  const duplicateAccount = (id) => {
    const source = accounts.find(a => a.id === id);
    if (!source) return;

    const duplicated = {
      ...source,
      id: 'zea-' + Date.now().toString(36) + '-' + Math.random().toString(36).substring(2, 7),
      name: `${source.name} (Copy)`,
      order: accounts.length,
      lastActive: 'Baru diduplikasi'
    };

    setAccounts(prev => [duplicated, ...prev]);
    showToast(`Akun diduplikasi: '${duplicated.name}'`);
    openAccountTab(duplicated);
  };

  const toggleFavorite = (id, e) => {
    if (e) e.stopPropagation();
    setAccounts(prev =>
      prev.map(acc => (acc.id === id ? { ...acc, favorite: !acc.favorite } : acc))
    );
  };

  const openAddModal = (accountToEdit = null) => {
    setEditingAccount(accountToEdit);
    setIsAddModalOpen(true);
  };

  const exportAccountsJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(accounts, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `zea_accounts_backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('File backup accounts.json berhasil diekspor!');
  };

  const importAccountsJson = (jsonString) => {
    try {
      const parsed = JSON.parse(jsonString);
      if (Array.isArray(parsed) && parsed.length > 0) {
        setAccounts(parsed);
        showToast(`Berhasil mengimpor ${parsed.length} akun!`);
        return true;
      }
    } catch (e) {
      showToast('Gagal mengimpor: format JSON tidak valid', 'error');
    }
    return false;
  };

  const activeAccount = accounts.find(a => a.id === activeTabId) || null;

  return (
    <ManagerContext.Provider
      value={{
        accounts,
        activeTabId,
        setActiveTabId,
        openTabs,
        openAccountTab,
        closeTab,
        filterProvider,
        setFilterProvider,
        searchQuery,
        setSearchQuery,
        addAccount,
        updateAccount,
        deleteAccount,
        duplicateAccount,
        toggleFavorite,
        isAddModalOpen,
        setIsAddModalOpen,
        editingAccount,
        openAddModal,
        isSettingsModalOpen,
        setIsSettingsModalOpen,
        exportAccountsJson,
        importAccountsJson,
        activeAccount,
        isSidebarOpen,
        toggleSidebar,
        toast,
        showToast
      }}
    >
      {children}
    </ManagerContext.Provider>
  );
};

export const useManager = () => {
  const context = useContext(ManagerContext);
  if (!context) {
    throw new Error('useManager must be used within ManagerProvider');
  }
  return context;
};
