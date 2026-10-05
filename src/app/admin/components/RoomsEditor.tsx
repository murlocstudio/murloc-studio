'use client';

import React, { useState } from 'react';
import { StudioRoom } from '@/types/database';
import { Plus, Trash2, Edit2, Check, Save, CheckCircle2 } from 'lucide-react';
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';
import { ImageUploadInput } from '@/components/ui/ImageUploadInput';

interface RoomsEditorProps {
  initialRooms: StudioRoom[];
}

export const RoomsEditor: React.FC<RoomsEditorProps> = ({ initialRooms }) => {
  const [rooms, setRooms] = useState<StudioRoom[]>(initialRooms);
  const [editingRoom, setEditingRoom] = useState<StudioRoom | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleEdit = (room: StudioRoom) => {
    setEditingRoom({ ...room });
  };

  const handleSaveRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingRoom) return;

    if (isSupabaseConfigured()) {
      const supabase = createClient();
      if (supabase) {
        await supabase
          .from('studio_rooms')
          .upsert({
            id: editingRoom.id,
            name: editingRoom.name,
            slug: editingRoom.slug,
            short_tag: editingRoom.short_tag,
            description: editingRoom.description,
            size_sqm: editingRoom.size_sqm,
            acoustic_specs: editingRoom.acoustic_specs,
            features: editingRoom.features,
            images: editingRoom.images,
            primary_image: editingRoom.primary_image,
            hourly_rate_info: editingRoom.hourly_rate_info,
            order_index: editingRoom.order_index,
            updated_at: new Date().toISOString(),
          });
      }
    }

    setRooms(rooms.map((r) => (r.id === editingRoom.id ? editingRoom : r)));
    setEditingRoom(null);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {saveSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Stüdyo odası başarıyla güncellendi!</span>
        </div>
      )}

      {/* Editing Modal / Drawer */}
      {editingRoom && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-zinc-200 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
              <h3 className="text-lg font-bold text-zinc-950 font-display">
                Oda Düzenle: {editingRoom.name}
              </h3>
              <button
                onClick={() => setEditingRoom(null)}
                className="text-xs text-zinc-400 hover:text-zinc-950 font-mono"
              >
                Kapat
              </button>
            </div>

            <form onSubmit={handleSaveRoom} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase text-zinc-700 font-semibold">Oda Adı</label>
                  <input
                    type="text"
                    required
                    value={editingRoom.name}
                    onChange={(e) => setEditingRoom({ ...editingRoom, name: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-zinc-50 border border-zinc-200 rounded-xl"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase text-zinc-700 font-semibold">Kısa Etiket</label>
                  <input
                    type="text"
                    required
                    value={editingRoom.short_tag}
                    onChange={(e) => setEditingRoom({ ...editingRoom, short_tag: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-zinc-50 border border-zinc-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase text-zinc-700 font-semibold">Açıklama</label>
                <textarea
                  rows={3}
                  value={editingRoom.description}
                  onChange={(e) => setEditingRoom({ ...editingRoom, description: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-zinc-50 border border-zinc-200 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase text-zinc-700 font-semibold">Alan (m²)</label>
                  <input
                    type="number"
                    value={editingRoom.size_sqm}
                    onChange={(e) => setEditingRoom({ ...editingRoom, size_sqm: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 text-xs bg-zinc-50 border border-zinc-200 rounded-xl"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase text-zinc-700 font-semibold">Saatlik Ücret</label>
                  <input
                    type="text"
                    value={editingRoom.hourly_rate_info}
                    onChange={(e) => setEditingRoom({ ...editingRoom, hourly_rate_info: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-zinc-50 border border-zinc-200 rounded-xl"
                  />
                </div>
              </div>

              <ImageUploadInput
                label="Oda Ana Görseli"
                value={editingRoom.primary_image}
                onChange={(url) => setEditingRoom({ ...editingRoom, primary_image: url })}
                folder="rooms"
              />

              {/* Acoustic Specs */}
              <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-200 space-y-3">
                <span className="text-xs font-mono font-bold uppercase text-zinc-700">Akustik Değerler</span>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <input
                    type="text"
                    placeholder="RT60 (Örn: 0.28s)"
                    value={editingRoom.acoustic_specs.rt60 || ''}
                    onChange={(e) =>
                      setEditingRoom({
                        ...editingRoom,
                        acoustic_specs: { ...editingRoom.acoustic_specs, rt60: e.target.value },
                      })
                    }
                    className="px-3 py-2 bg-white border border-zinc-200 rounded-xl"
                  />
                  <input
                    type="text"
                    placeholder="İzolasyon (Örn: STC 68dB)"
                    value={editingRoom.acoustic_specs.isolation || ''}
                    onChange={(e) =>
                      setEditingRoom({
                        ...editingRoom,
                        acoustic_specs: { ...editingRoom.acoustic_specs, isolation: e.target.value },
                      })
                    }
                    className="px-3 py-2 bg-white border border-zinc-200 rounded-xl"
                  />
                  <input
                    type="text"
                    placeholder="Dinleme Monitörü"
                    value={editingRoom.acoustic_specs.monitoring || ''}
                    onChange={(e) =>
                      setEditingRoom({
                        ...editingRoom,
                        acoustic_specs: { ...editingRoom.acoustic_specs, monitoring: e.target.value },
                      })
                    }
                    className="px-3 py-2 bg-white border border-zinc-200 rounded-xl col-span-2"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-zinc-100">
                <button
                  type="button"
                  onClick={() => setEditingRoom(null)}
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

      {/* Room Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {rooms.map((room) => (
          <div
            key={room.id}
            className="bg-white rounded-3xl p-6 border border-zinc-200/90 shadow-subtle flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-zinc-100">
                <img src={room.primary_image} alt={room.name} className="w-full h-full object-cover" />
                <div className="absolute top-2 right-2 bg-zinc-950/80 backdrop-blur-md text-white text-[10px] font-mono px-2.5 py-1 rounded-full">
                  {room.size_sqm} m²
                </div>
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-red-600 font-bold">
                  {room.short_tag}
                </span>
                <h4 className="text-base font-bold text-zinc-950 font-display mt-0.5">
                  {room.name}
                </h4>
                <p className="text-xs text-zinc-500 line-clamp-2 mt-1">
                  {room.description}
                </p>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-zinc-100 flex items-center justify-between">
              <span className="text-xs font-mono font-semibold text-zinc-900">
                {room.hourly_rate_info}
              </span>
              <button
                onClick={() => handleEdit(room)}
                className="p-2 text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100 rounded-xl transition-colors flex items-center gap-1 text-xs font-medium"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Düzenle</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
