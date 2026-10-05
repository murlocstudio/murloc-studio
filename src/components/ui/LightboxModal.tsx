'use client';

import React from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';

interface LightboxModalProps {
  imageUrl: string | null;
  title?: string;
  onClose: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({ imageUrl, title, onClose }) => {
  if (!imageUrl) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center"
      >
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 sm:right-0 p-2 text-zinc-400 hover:text-white transition-colors"
          aria-label="Kapat"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="relative w-full aspect-[16/10] max-h-[80vh] rounded-3xl overflow-hidden bg-zinc-950 border border-zinc-800 shadow-2xl">
          <Image
            src={imageUrl}
            alt={title || 'Murloc Studio Media'}
            fill
            className="object-contain"
            sizes="90vw"
            priority
          />
        </div>

        {title && (
          <div className="mt-3 text-xs font-mono text-zinc-400 text-center">
            {title}
          </div>
        )}
      </div>
    </div>
  );
};
