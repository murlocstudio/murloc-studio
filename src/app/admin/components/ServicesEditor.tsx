'use client';

import React, { useState } from 'react';
import { StudioService } from '@/types/database';
import { Plus, Trash2, Edit2, CheckCircle2 } from 'lucide-react';
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';

interface ServicesEditorProps {
  initialServices: StudioService[];
}

export const ServicesEditor: React.FC<ServicesEditorProps> = ({ initialServices }) => {
  const [services, setServices] = useState<StudioService[]>(initialServices);
  const [editingService, setEditingService] = useState<Partial<StudioService> | null>(null);
  const [deliverablesRaw, setDeliverablesRaw] = useState<string>('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleAddNew = () => {
    setEditingService({
      id: `service-custom-${Date.now()}`,
      title: '',
      category: 'Production',
      short_description: '',
      description: '',
      deliverables: [],
      is_rental: false,
      price_info: 'Teklif İsteyiniz',
      badge_text: 'Yeni',
      icon_name: 'Mic',
      order_index: services.length + 1,
    });
    setDeliverablesRaw('');
  };

  const handleEdit = (srv: StudioService) => {
    setEditingService({ ...srv });
    setDeliverablesRaw((srv.deliverables || []).join('\n'));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService || !editingService.title) return;

    const parsedDeliverables = deliverablesRaw
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const serviceToSave: StudioService = {
      ...(editingService as StudioService),
      deliverables: parsedDeliverables,
    };

    if (isSupabaseConfigured()) {
      const supabase = createClient();
      if (supabase) {
        await supabase.from('services').upsert(serviceToSave);
      }
    }

    const exists = services.some((s) => s.id === serviceToSave.id);
    if (exists) {
      setServices(services.map((s) => (s.id === serviceToSave.id ? serviceToSave : s)));
    } else {
      setServices([...services, serviceToSave]);
    }

    setEditingService(null);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bu hizmeti silmek istediğinizden emin misiniz?')) return;

    if (isSupabaseConfigured()) {
      const supabase = createClient();
      if (supabase) {
        await supabase.from('services').delete().eq('id', id);
      }
    }

    setServices(services.filter((s) => s.id !== id));
  };

  return (
    <div className="space-y-6">
      {saveSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Hizmet listesi güncellendi!</span>
        </div>
      )}

      <div className="flex justify-end">
        <button
          onClick={handleAddNew}
          className="px-4 py-2.5 bg-zinc-950 text-white text-xs font-semibold rounded-xl hover:bg-zinc-800 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Yeni Hizmet Ekle</span>
        </button>
      </div>

      {editingService && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-zinc-200 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
              <h3 className="text-base font-bold text-zinc-950 font-display">
                {editingService.id?.includes('custom') ? 'Yeni Hizmet Oluştur' : 'Hizmet Düzenle'}
              </h3>
              <button
                onClick={() => setEditingService(null)}
                className="text-xs text-zinc-400 hover:text-zinc-950 font-mono"
              >
                Kapat
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-mono uppercase text-zinc-700 font-semibold">Hizmet Başlığı</label>
                <input
                  type="text"
                  required
                  value={editingService.title || ''}
                  onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                  placeholder="Vokal Kaydı & Prodüksiyon"
                  className="w-full px-3 py-2 text-xs bg-zinc-50 border border-zinc-200 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-mono uppercase text-zinc-700 font-semibold">Kategori</label>
                  <select
                    value={editingService.category || 'Production'}
                    onChange={(e) => setEditingService({ ...editingService, category: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-zinc-50 border border-zinc-200 rounded-xl"
                  >
                    <option value="Production">Production</option>
                    <option value="Post-Production">Post-Production</option>
                    <option value="Broadcasting">Broadcasting</option>
                    <option value="Rental">Rental</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-mono uppercase text-zinc-700 font-semibold">Rozet (Badge)</label>
                  <input
                    type="text"
                    value={editingService.badge_text || ''}
                    onChange={(e) => setEditingService({ ...editingService, badge_text: e.target.value })}
                    placeholder="Popüler"
                    className="w-full px-3 py-2 text-xs bg-zinc-50 border border-zinc-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono uppercase text-zinc-700 font-semibold">Açıklama</label>
                <textarea
                  rows={3}
                  value={editingService.description || ''}
                  onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-zinc-50 border border-zinc-200 rounded-xl"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono uppercase text-zinc-700 font-semibold">
                  Teslim Edilenler (Her satıra bir madde)
                </label>
                <textarea
                  rows={3}
                  value={deliverablesRaw}
                  onChange={(e) => setDeliverablesRaw(e.target.value)}
                  placeholder="24-Bit / 96kHz Ham Stemler&#10;Vokal Editleri&#10;Ön Dinleme Mixi"
                  className="w-full px-3 py-2 text-xs bg-zinc-50 border border-zinc-200 rounded-xl font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono uppercase text-zinc-700 font-semibold">Fiyat Bilgisi</label>
                <input
                  type="text"
                  value={editingService.price_info || ''}
                  onChange={(e) => setEditingService({ ...editingService, price_info: e.target.value })}
                  placeholder="1.200 ₺ / Saat"
                  className="w-full px-3 py-2 text-xs bg-zinc-50 border border-zinc-200 rounded-xl"
                />
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-zinc-100">
                <button
                  type="button"
                  onClick={() => setEditingService(null)}
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

      {/* Grid of services */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((srv) => (
          <div
            key={srv.id}
            className="bg-white rounded-3xl p-6 border border-zinc-200/90 shadow-subtle flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 font-bold">
                  {srv.category}
                </span>
                {srv.badge_text && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-800">
                    {srv.badge_text}
                  </span>
                )}
              </div>
              <h4 className="text-base font-bold text-zinc-950 font-display">{srv.title}</h4>
              <p className="text-xs text-zinc-600 line-clamp-3 leading-relaxed">{srv.description}</p>
            </div>

            <div className="pt-4 mt-4 border-t border-zinc-100 flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-zinc-900">{srv.price_info}</span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleEdit(srv)}
                  className="p-1.5 text-zinc-500 hover:text-zinc-950 hover:bg-zinc-100 rounded-lg"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(srv.id)}
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
