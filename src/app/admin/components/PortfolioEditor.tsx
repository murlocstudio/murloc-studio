'use client';

import React, { useState } from 'react';
import { PortfolioArtist } from '@/types/database';
import { Plus, Trash2, Edit2, CheckCircle2, Music, ExternalLink } from 'lucide-react';
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';
import { ImageUploadInput } from '@/components/ui/ImageUploadInput';

interface PortfolioEditorProps {
  initialPortfolio: PortfolioArtist[];
}

export const PortfolioEditor: React.FC<PortfolioEditorProps> = ({ initialPortfolio }) => {
  const [portfolio, setPortfolio] = useState<PortfolioArtist[]>(initialPortfolio);
  const [editingItem, setEditingItem] = useState<Partial<PortfolioArtist> | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleAddNew = () => {
    setEditingItem({
      id: `art-custom-${Date.now()}`,
      artist_name: '',
      project_title: '',
      genre: 'Indie Pop',
      role_description: 'Studio A Kayıt & Analog Mix',
      image_url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80',
      release_year: new Date().getFullYear(),
      stream_url: 'https://open.spotify.com',
      preview_audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      order_index: portfolio.length + 1,
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem || !editingItem.artist_name || !editingItem.project_title) return;

    const itemToSave = editingItem as PortfolioArtist;

    if (isSupabaseConfigured()) {
      const supabase = createClient();
      if (supabase) {
        await supabase.from('portfolio_artists').upsert(itemToSave);
      }
    }

    const exists = portfolio.some((p) => p.id === itemToSave.id);
    if (exists) {
      setPortfolio(portfolio.map((p) => (p.id === itemToSave.id ? itemToSave : p)));
    } else {
      setPortfolio([itemToSave, ...portfolio]);
    }

    setEditingItem(null);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bu parçayı/sanatçıyı katalogdan kaldırmak istediğinizden emin misiniz?')) return;

    if (isSupabaseConfigured()) {
      const supabase = createClient();
      if (supabase) {
        await supabase.from('portfolio_artists').delete().eq('id', id);
      }
    }

    setPortfolio(portfolio.filter((p) => p.id !== id));
  };

  return (
    <div className="space-y-6">
      {saveSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Sanatçı kataloğu başarıyla güncellendi!</span>
        </div>
      )}

      <div className="flex justify-end">
        <button
          onClick={handleAddNew}
          className="px-4 py-2.5 bg-zinc-950 text-white text-xs font-semibold rounded-xl hover:bg-zinc-800 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Yeni Albüm / Single Ekle</span>
        </button>
      </div>

      {editingItem && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-zinc-200 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
              <h3 className="text-base font-bold text-zinc-950 font-display">
                {editingItem.id?.includes('custom') ? 'Kataloğa Yeni Yapım Ekle' : 'Kayıt Düzenle'}
              </h3>
              <button
                onClick={() => setEditingItem(null)}
                className="text-xs text-zinc-400 hover:text-zinc-950 font-mono"
              >
                Kapat
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-mono uppercase text-zinc-700 font-semibold">Sanatçı / Grup</label>
                  <input
                    type="text"
                    required
                    value={editingItem.artist_name || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, artist_name: e.target.value })}
                    placeholder="Madrigal"
                    className="w-full px-3 py-2 text-xs bg-zinc-50 border border-zinc-200 rounded-xl"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-mono uppercase text-zinc-700 font-semibold">Proje / Şarkı Adı</label>
                  <input
                    type="text"
                    required
                    value={editingItem.project_title || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, project_title: e.target.value })}
                    placeholder="Sonsuz Dans (Single)"
                    className="w-full px-3 py-2 text-xs bg-zinc-50 border border-zinc-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-mono uppercase text-zinc-700 font-semibold">Müzik Türü</label>
                  <input
                    type="text"
                    required
                    value={editingItem.genre || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, genre: e.target.value })}
                    placeholder="Alternatif Rock"
                    className="w-full px-3 py-2 text-xs bg-zinc-50 border border-zinc-200 rounded-xl"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-mono uppercase text-zinc-700 font-semibold">Yayın Yılı</label>
                  <input
                    type="number"
                    value={editingItem.release_year || 2024}
                    onChange={(e) => setEditingItem({ ...editingItem, release_year: parseInt(e.target.value) || 2024 })}
                    className="w-full px-3 py-2 text-xs bg-zinc-50 border border-zinc-200 rounded-xl font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono uppercase text-zinc-700 font-semibold">Stüdyo Rolü Açıklaması</label>
                <input
                  type="text"
                  value={editingItem.role_description || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, role_description: e.target.value })}
                  placeholder="Studio A Canlı Hücum & Dolby Atmos Mix"
                  className="w-full px-3 py-2 text-xs bg-zinc-50 border border-zinc-200 rounded-xl"
                />
              </div>

              <ImageUploadInput
                label="Albüm / Tekli Kapak Görseli"
                value={editingItem.image_url || ''}
                onChange={(url) => setEditingItem({ ...editingItem, image_url: url })}
                folder="portfolio"
              />

              <div className="space-y-1">
                <label className="text-xs font-mono uppercase text-zinc-700 font-semibold">Spotify / Streaming Bağlantısı</label>
                <input
                  type="text"
                  value={editingItem.stream_url || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, stream_url: e.target.value })}
                  placeholder="https://open.spotify.com/track/..."
                  className="w-full px-3 py-2 text-xs bg-zinc-50 border border-zinc-200 rounded-xl font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono uppercase text-zinc-700 font-semibold">Ön Dinleme Ses Dosyası (MP3/WAV URL)</label>
                <input
                  type="text"
                  value={editingItem.preview_audio_url || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, preview_audio_url: e.target.value })}
                  placeholder="https://.../preview.mp3"
                  className="w-full px-3 py-2 text-xs bg-zinc-50 border border-zinc-200 rounded-xl font-mono"
                />
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-zinc-100">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 text-xs font-medium text-zinc-600 hover:bg-zinc-100 rounded-xl"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold bg-zinc-950 text-white rounded-xl hover:bg-zinc-800"
                >
                  Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {portfolio.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-3xl p-5 border border-zinc-200/90 shadow-subtle flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-zinc-100">
                <img src={item.image_url} alt={item.project_title} className="w-full h-full object-cover" />
                <div className="absolute top-2 left-2 bg-zinc-950/80 backdrop-blur-md text-white text-[10px] font-mono px-2.5 py-1 rounded-full">
                  {item.release_year}
                </div>
                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-md text-zinc-900 text-[10px] font-mono font-bold px-2.5 py-1 rounded-full">
                  {item.genre}
                </div>
              </div>

              <div>
                <div className="text-[11px] font-mono uppercase text-red-600 font-bold">{item.artist_name}</div>
                <h4 className="text-sm font-bold text-zinc-950 truncate mt-0.5">{item.project_title}</h4>
                {item.role_description && (
                  <p className="text-xs text-zinc-500 truncate mt-0.5">{item.role_description}</p>
                )}
              </div>
            </div>

            <div className="pt-3 mt-3 border-t border-zinc-100 flex items-center justify-between">
              {item.stream_url ? (
                <a
                  href={item.stream_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-zinc-500 hover:text-zinc-950 font-mono flex items-center gap-1"
                >
                  <span>Spotify</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              ) : (
                <span className="text-xs text-zinc-400 font-mono">Link yok</span>
              )}

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setEditingItem({ ...item })}
                  className="p-1.5 text-zinc-500 hover:text-zinc-950 hover:bg-zinc-100 rounded-lg"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
