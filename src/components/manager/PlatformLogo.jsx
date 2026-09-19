import React from 'react';
import { Globe } from 'lucide-react';
import flowLogo from '../../assets/logos/flow.png';
import dolaLogo from '../../assets/logos/dola.png';
import chatgptLogo from '../../assets/logos/chatgpt.png';

export const PlatformLogo = ({ provider, size = 'md', className = '' }) => {
  const sizeClasses = {
    xs: 'w-4 h-4',
    sm: 'w-5 h-5',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-10 h-10'
  };

  const sz = sizeClasses[size] || sizeClasses.md;

  switch (provider) {
    case 'google-flow':
    case 'flow':
      return (
        <div className={`${sz} ${className} shrink-0 flex items-center justify-center rounded-lg bg-white/10 p-0.5 overflow-hidden`}>
          <img 
            src={flowLogo} 
            alt="Google Flow" 
            className="w-full h-full object-contain filter drop-shadow-xs" 
          />
        </div>
      );

    case 'dola':
      return (
        <div className={`${sz} ${className} shrink-0 flex items-center justify-center rounded-lg bg-white/10 p-0.5 overflow-hidden`}>
          <img 
            src={dolaLogo} 
            alt="Dola AI" 
            className="w-full h-full object-contain filter drop-shadow-xs" 
          />
        </div>
      );

    case 'chatgpt':
      return (
        <div className={`${sz} ${className} shrink-0 flex items-center justify-center rounded-lg bg-emerald-500/20 p-0.5 overflow-hidden`}>
          <img 
            src={chatgptLogo} 
            alt="ChatGPT" 
            className="w-full h-full object-contain filter drop-shadow-xs invert" 
          />
        </div>
      );

    case 'claude':
      return (
        <div className={`${sz} ${className} shrink-0 flex items-center justify-center rounded-lg bg-amber-500/20 p-0.5 text-amber-300 font-bold text-[10px]`}>
          CL
        </div>
      );

    case 'midjourney':
      return (
        <div className={`${sz} ${className} shrink-0 flex items-center justify-center rounded-lg bg-blue-500/20 p-0.5 text-blue-300 font-bold text-[10px]`}>
          MJ
        </div>
      );

    case 'custom':
    default:
      return (
        <div className={`${sz} ${className} shrink-0 flex items-center justify-center rounded-lg bg-rose-500/20 text-rose-300`}>
          <Globe className="w-3.5 h-3.5" />
        </div>
      );
  }
};
