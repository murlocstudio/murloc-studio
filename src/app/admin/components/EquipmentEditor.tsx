'use client';

import React, { useState } from 'react';
import { Equipment, StudioRoom } from '@/types/database';
import { Plus, Trash2, Edit2, CheckCircle2, Search, Sliders } from 'lucide-react';
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';

interface EquipmentEditorProps {
  initialEquipment: Equipment[];
  rooms: StudioRoom[];
}

export const EquipmentEditor: React.FC<EquipmentEditorProps> = ({ initialEquipment, rooms }) => {
  const [equipmentList, setEquipmentList] = useState<Equipment[]>(initialEquipment);
  const [editingItem, setEditingItem] = useState<Partial<Equipment> | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const categories = [
    'Microphones',
    'Outboard & Preamps',
    'Monitoring',
    'Instruments & Amplifiers',
    'DAW & Converters',
  ];

  const handleAddNew = () => {
    setEditingItem({
      id: `eq-custom-${Date.now()}`,
      name: '',
      brand: '',
      category: 'Microphones',
      specs: '',
      is_rentable: false,
      rental_daily_price: '',
      image_url: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=600&q=80',
      order_index: equipmentList.length + 1,
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem || !editingItem.name) return;

    const itemToSave = editingItem as Equipment;

    if (isSupabaseConfigured()) {
      const supabase = createClient();
      if (supabase) {
        await supabase.from('equipment').upsert(itemToSave);
      }
    }

    const exists = equipmentList.some((eq) => eq.id === itemToSave.id);
    if (exists) {
      setEquipmentList(equipmentList.map((eq) => (eq.id === itemToSave.id ? itemToSave : eq)));
    } else {
      setEquipmentList([itemToSave, ...equipmentList]);
    }

    setEditingItem(null);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bu ekipmanı silmek istediğinizden emin misiniz?')) return;

    if (isSupabaseConfigured()) {
      const supabase = createClient();
      if (supabase) {
        await supabase.from('equipment').delete().eq('id', id);
      }
    }

    setEquipmentList(equipmentList.filter((eq) => eq.id !== id));
  };

  const filtered = equipmentList.filter(
    (eq) =>
      eq.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      eq.brand.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {saveSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Ekipman envanteri güncellendi!</span>
        </div>
      )}

      {/* Top action bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Ekipman ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-xs bg-white border border-zinc-200 rounded-xl focus:ring-2 focus:ring-zinc-950"
          />
        </div>

        <button
          onClick={handleAddNew}
          className="px-4 py-2.5 bg-zinc-950 text-white text-xs font-semibold rounded-xl hover:bg-zinc-800 flex items-center justify-center gap-2 transition-all active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Yeni Ekipman Ekle</span>
        </button>
      </div>

      {/* Modal Editor */}
      {editingItem && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-zinc-200 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
              <h3 className="text-base font-bold text-zinc-950 font-display">
                {editingItem.id?.includes('custom') ? 'Yeni Ekipman Ekle' : 'Ekipman Düzenle'}
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
                  <label className="text-xs font-mono uppercase text-zinc-700 font-semibold">Marka</label>
                  <input
                    type="text"
                    required
                    value={editingItem.brand || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, brand: e.target.value })}
                    placeholder="Neumann"
                    className="w-full px-3 py-2 text-xs bg-zinc-50 border border-zinc-200 rounded-xl"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-mono uppercase text-zinc-700 font-semibold">Kategori</label>
                  <select
                    value={editingItem.category || 'Microphones'}
                    onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-zinc-50 border border-zinc-200 rounded-xl"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono uppercase text-zinc-700 font-semibold">Model / İsim</label>
                <input
                  type="text"
                  required
                  value={editingItem.name || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                  placeholder="U 87 Ai (Stereo Set)"
                  className="w-full px-3 py-2 text-xs bg-zinc-50 border border-zinc-200 rounded-xl"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono uppercase text-zinc-700 font-semibold">Ait Olduğu Oda</label>
                <select
                  value={editingItem.studio_room_id || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, studio_room_id: e.target.value || null })}
                  className="w-full px-3 py-2 text-xs bg-zinc-50 border border-zinc-200 rounded-xl"
                >
                  <option value="">Genel / Bağımsız Ekipman</option>
                  {rooms.map((r) => (
                    <option key={r.id} value={r.id}>{r.name}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono uppercase text-zinc-700 font-semibold">Teknik Özellikler</label>
                <textarea
                  rows={2}
                  value={editingItem.specs || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, specs: e.target.value })}
                  placeholder="Geniş diyaframlı kondenser stüdyo mikrofonu"
                  className="w-full px-3 py-2 text-xs bg-zinc-50 border border-zinc-200 rounded-xl"
                />
              </div>

              <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-200 space-y-3">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="is_rentable"
                    checked={editingItem.is_rentable || false}
                    onChange={(e) => setEditingItem({ ...editingItem, is_rentable: e.target.checked })}
                    className="rounded border-zinc-300 text-zinc-950 focus:ring-zinc-950"
                  />
                  <label htmlFor="is_rentable" className="text-xs font-semibold text-zinc-900 cursor-pointer">
                    Dışarıya Kiralanabilir Ekipman
                  </label>
                </div>

                {editingItem.is_rentable && (
                  <div className="space-y-1 pt-1">
                    <label className="text-[11px] font-mono uppercase text-zinc-500">Günlük Kiralama Ücreti</label>
                    <input
                      type="text"
                      value={editingItem.rental_daily_price || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, rental_daily_price: e.target.value })}
                      placeholder="1.500 ₺ / Gün"
                      className="w-full px-3 py-2 text-xs bg-white border border-zinc-200 rounded-xl"
                    />
                  </div>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono uppercase text-zinc-700 font-semibold">Görsel URL</label>
                <input
                  type="text"
                  value={editingItem.image_url || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, image_url: e.target.value })}
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

      {/* Equipment Table */}
      <div className="bg-white rounded-3xl border border-zinc-200/90 overflow-hidden shadow-subtle">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-50 border-b border-zinc-200 text-zinc-500 font-mono uppercase text-[11px]">
              <tr>
                <th className="py-3 px-4">Ekipman</th>
                <th className="py-3 px-4">Kategori</th>
                <th className="py-3 px-4">Oda</th>
                <th className="py-3 px-4">Kiralama</th>
                <th className="py-3 px-4 text-right">İşlem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-zinc-50/80 transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-bold text-zinc-950">{item.name}</div>
                    <div className="text-[11px] text-zinc-400 font-mono">{item.brand}</div>
                  </td>
                  <td className="py-3 px-4 font-mono text-zinc-600">{item.category}</td>
                  <td className="py-3 px-4 text-zinc-600">
                    {rooms.find((r) => r.id === item.studio_room_id)?.name.split('(')[0] || 'Genel'}
                  </td>
                  <td className="py-3 px-4">
                    {item.is_rentable ? (
                      <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                        {item.rental_daily_price || 'Aktif'}
                      </span>
                    ) : (
                      <span className="text-[10px] text-zinc-400 font-mono">Stüdyo İçi</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => setEditingItem({ ...item })}
                        className="p-1.5 text-zinc-500 hover:text-zinc-950 hover:bg-zinc-100 rounded-lg"
                        title="Düzenle"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg"
                        title="Sil"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
