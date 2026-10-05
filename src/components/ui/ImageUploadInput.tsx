'use client';

import React, { useState, useRef } from 'react';
import { Upload, Link as LinkIcon, X, Check, Loader2, Image as ImageIcon } from 'lucide-react';
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';

interface ImageUploadInputProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  bucketName?: string;
  folder?: string;
}

export const ImageUploadInput: React.FC<ImageUploadInputProps> = ({
  label,
  value,
  onChange,
  bucketName = 'studio-assets',
  folder = 'uploads',
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [useUrlInput, setUseUrlInput] = useState(!value || value.startsWith('http'));
  const [dragActive, setDragActive] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Client-side image compression before upload
  const compressImage = (file: File): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const reader = new FileReader();

      reader.onload = (e) => {
        img.src = e.target?.result as string;
      };
      reader.onerror = reject;

      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 1920;
        const MAX_HEIGHT = 1080;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(file);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob(
          (blob) => {
            if (blob) resolve(blob);
            else resolve(file);
          },
          'image/webp',
          0.85
        );
      };

      reader.readAsDataURL(file);
    });
  };

  const handleFileUpload = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setUploadError('Lütfen geçerli bir görsel dosyası (JPEG, PNG, WebP) seçiniz.');
      return;
    }

    setIsUploading(true);
    setUploadError(null);

    try {
      if (!isSupabaseConfigured()) {
        // Fallback for preview/demo mode: create local object preview URL or Unsplash placeholder
        const localUrl = URL.createObjectURL(file);
        onChange(localUrl);
        setIsUploading(false);
        return;
      }

      const supabase = createClient();
      if (!supabase) throw new Error('Supabase client failed');

      // 1. Compress Image
      const compressedBlob = await compressImage(file);
      const cleanFileName = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
      const filePath = `${folder}/${cleanFileName}`;

      // 2. Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from(bucketName)
        .upload(filePath, compressedBlob, {
          contentType: 'image/webp',
          upsert: true,
        });

      if (error) throw error;

      // 3. Get Public URL
      const { data: urlData } = supabase.storage.from(bucketName).getPublicUrl(filePath);
      if (urlData?.publicUrl) {
        onChange(urlData.publicUrl);
      }
    } catch (err: any) {
      console.error('Image upload failed:', err);
      setUploadError(err.message || 'Görsel yüklenirken bir hata oluştu.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-mono uppercase tracking-wider text-zinc-700 font-semibold">
          {label}
        </label>
        <button
          type="button"
          onClick={() => setUseUrlInput(!useUrlInput)}
          className="text-[11px] font-mono text-zinc-500 hover:text-zinc-900 flex items-center gap-1"
        >
          {useUrlInput ? (
            <>
              <Upload className="w-3 h-3" />
              <span>Dosya Yükle</span>
            </>
          ) : (
            <>
              <LinkIcon className="w-3 h-3" />
              <span>URL Olarak Gir</span>
            </>
          )}
        </button>
      </div>

      {useUrlInput ? (
        <div className="space-y-2">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="https://images.unsplash.com/..."
            className="w-full px-4 py-2.5 text-xs bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-zinc-950 font-mono text-zinc-900"
          />
        </div>
      ) : (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={() => setDragActive(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2 ${
            dragActive
              ? 'border-red-500 bg-red-50/40'
              : 'border-zinc-300 hover:border-zinc-400 bg-zinc-50/50'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleFileUpload(e.target.files[0]);
              }
            }}
          />

          {isUploading ? (
            <div className="flex flex-col items-center gap-2 py-2">
              <Loader2 className="w-6 h-6 animate-spin text-red-600" />
              <span className="text-xs font-mono text-zinc-600 font-semibold">
                Optimize ediliyor ve yükleniyor...
              </span>
            </div>
          ) : (
            <>
              <div className="w-10 h-10 rounded-xl bg-white border border-zinc-200 flex items-center justify-center text-zinc-600 shadow-xs">
                <Upload className="w-4 h-4" />
              </div>
              <div className="text-xs text-zinc-700">
                <span className="font-semibold text-zinc-950">Görseli buraya sürükleyin</span> veya tıklayarak seçin
              </div>
              <span className="text-[10px] font-mono text-zinc-400">
                WebP formatında otomatik sıkıştırılır (Max 1920px)
              </span>
            </>
          )}
        </div>
      )}

      {uploadError && (
        <p className="text-xs text-red-600 font-mono">{uploadError}</p>
      )}

      {/* Thumbnail Preview */}
      {value && (
        <div className="relative w-full h-32 rounded-xl overflow-hidden bg-zinc-100 border border-zinc-200 group">
          <img src={value} alt="Seçilen Görsel Önizlemesi" className="w-full h-full object-cover" />
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onChange('');
            }}
            className="absolute top-2 right-2 p-1.5 rounded-lg bg-zinc-950/80 hover:bg-red-600 text-white transition-colors"
            title="Görseli Kaldır"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          <div className="absolute bottom-2 left-2 bg-zinc-950/80 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-mono text-white">
            Önizleme
          </div>
        </div>
      )}
    </div>
  );
};
