import React, { useState, useRef, useEffect, useCallback } from 'react';
import { BrowserToolbar } from './BrowserToolbar';
import { allSupportedPlatforms } from '../../data/platforms';
import { PlatformLogo } from './PlatformLogo';
import { 
  ShieldCheck, 
  ExternalLink
} from 'lucide-react';

export const BrowserView = ({ account }) => {
  const mountRef = useRef(null);
  const platform = allSupportedPlatforms.find(p => p.id === account.provider) || allSupportedPlatforms[0];

  // Helper to sync viewport bounds to C# desktop host
  const syncViewport = useCallback(() => {
    if (!mountRef.current || !window.chrome?.webview) return;
    const rect = mountRef.current.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return;

    window.chrome.webview.postMessage({
      type: 'SYNC_VIEWPORT',
      tabId: account.id,
      accountId: account.id,
      service: account.provider,
      accountName: account.name,
      url: account.url, // ALWAYS use account.url to prevent cross-tab URL leakage
      visible: true,
      x: Math.round(rect.left),
      y: Math.round(rect.top),
      width: Math.round(rect.width),
      height: Math.round(rect.height)
    });
  }, [account.id, account.provider, account.name, account.url]);

  // Sync viewport on account change, mount, resize, and scroll
  useEffect(() => {
    syncViewport();

    const handleResize = () => syncViewport();
    window.addEventListener('resize', handleResize);

    const observer = new ResizeObserver(() => syncViewport());
    if (mountRef.current) {
      observer.observe(mountRef.current);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
      if (window.chrome?.webview) {
        window.chrome.webview.postMessage({
          type: 'SYNC_VIEWPORT',
          tabId: account.id,
          visible: false
        });
      }
    };
  }, [account.id, account.url, syncViewport]);

  const isDesktop = typeof window !== 'undefined' && !!window.chrome?.webview;

  return (
    <div className="flex-1 flex flex-col h-full bg-white overflow-hidden relative">
      {/* Native Browser Mount Surface - Maximized full-screen viewport */}
      <div 
        id="browser-viewport" 
        ref={mountRef} 
        className="w-full h-full flex-1 bg-white"
      />

      {/* Fallback View when tested outside native ZeaAppManager.exe shell */}
      {!isDesktop && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-8 bg-rose-50/70 text-center">
          <div className="w-16 h-16 rounded-2xl bg-zea-800 text-white flex items-center justify-center mb-4 shadow-xl">
            <PlatformLogo provider={platform.id} size="lg" />
          </div>
          <h3 className="text-xl font-bold text-neutral-800 mb-1">
            Browser Native WebView2 Aktif di ZeaAppManager.exe
          </h3>
          <p className="text-sm text-neutral-600 max-w-md mb-6 leading-relaxed">
            Tab <strong>{account.name}</strong> ({platform.name}) berjalan sebagai instance WebView2 Native terisolasi dengan sesi mandiri.
          </p>
          <div className="flex items-center gap-3">
            <a 
              href={account.url}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 rounded-xl bg-zea-700 hover:bg-zea-800 text-white text-xs font-bold shadow-md inline-flex items-center gap-2 transition-transform active:scale-95"
            >
              <ExternalLink className="w-4 h-4" />
              Buka {account.name} di Browser Luar
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
