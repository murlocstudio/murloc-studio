'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { StudioRoom, Equipment } from '@/types/database';
import { Check, ArrowUpRight, Maximize2, Activity, Volume2, Layers, Sliders } from 'lucide-react';

interface StudiosSectionProps {
  rooms: StudioRoom[];
  equipment: Equipment[];
}

export const StudiosSection: React.FC<StudiosSectionProps> = ({ rooms, equipment }) => {
  const [activeRoomId, setActiveRoomId] = useState<string>(rooms[0]?.id || '');
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);

  const currentRoom = rooms.find((r) => r.id === activeRoomId) || rooms[0];

  // Equipment specific to active room
  const roomGear = equipment.filter((eq) => eq.studio_room_id === currentRoom?.id);

  if (!currentRoom) return null;

  const roomImages = currentRoom.images && currentRoom.images.length > 0
    ? currentRoom.images
    : [currentRoom.primary_image];

  return (
    <section id="studios" className="py-24 bg-white border-t border-zinc-200/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-600"></span>
              <span className="text-xs font-mono uppercase tracking-widest text-zinc-500 font-semibold">
                Kayıt & Prodüksiyon Alanları
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-950 font-display tracking-tight">
              3 Özel Tasarım Stüdyo Odası
            </h2>
            <p className="text-base sm:text-lg text-zinc-600">
              Her biri farklı akustik dinamiklere ve dünya standardı analog/dijital zincirlere sahip bağımsız kayıt odalarımız.
            </p>
          </div>

          {/* Room Switcher Tabs */}
          <div className="flex items-center gap-2 p-1.5 bg-zinc-100 rounded-2xl overflow-x-auto">
            {rooms.map((room) => {
              const isActive = room.id === currentRoom.id;
              return (
                <button
                  key={room.id}
                  onClick={() => {
                    setActiveRoomId(room.id);
                    setSelectedImageIndex(0);
                  }}
                  className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-zinc-950 text-white shadow-sm'
                      : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-200/60'
                  }`}
                >
                  {room.name.split('(')[0].trim()}
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Studio Room Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Gallery & Carousel */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-[16/10] rounded-3xl overflow-hidden bg-zinc-900 border border-zinc-200 shadow-elevated">
              <Image
                src={roomImages[selectedImageIndex] || currentRoom.primary_image}
                alt={currentRoom.name}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover transition-all duration-500"
              />
              <div className="absolute top-4 left-4 bg-zinc-950/80 backdrop-blur-md text-white text-xs font-mono px-3.5 py-1.5 rounded-full border border-white/10">
                {currentRoom.size_sqm} m² • {currentRoom.short_tag}
              </div>
            </div>

            {/* Thumbnails */}
            {roomImages.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {roomImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative w-24 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                      selectedImageIndex === idx
                        ? 'border-zinc-950 shadow-sm scale-95'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <Image src={img} alt={`Studio view ${idx + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Room Gear Preview */}
            {roomGear.length > 0 && (
              <div className="pt-6 border-t border-zinc-200">
                <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-500 font-semibold mb-3 flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-zinc-800" />
                  Bu Odadaki Öne Çıkan Ekipmanlar
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {roomGear.slice(0, 4).map((gear) => (
                    <div
                      key={gear.id}
                      className="p-3 rounded-xl bg-zinc-50 border border-zinc-200/80 flex items-start gap-3"
                    >
                      <div className="w-2 h-2 rounded-full bg-red-500 mt-1.5 shrink-0"></div>
                      <div>
                        <div className="text-xs font-bold text-zinc-950">{gear.name}</div>
                        <div className="text-[11px] text-zinc-500 font-mono">{gear.brand} • {gear.category}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Specs, Features & Booking CTA */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <div className="text-xs font-mono uppercase tracking-wider text-red-600 font-bold">
                {currentRoom.short_tag}
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 font-display">
                {currentRoom.name}
              </h3>
              <p className="text-sm text-zinc-600 leading-relaxed pt-2">
                {currentRoom.description}
              </p>
            </div>

            {/* Acoustic Specs Matrix */}
            <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200/80 space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-900 font-bold flex items-center gap-2">
                <Activity className="w-4 h-4 text-red-600" />
                Akustik & Teknik Parametreler
              </h4>
              <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-xs">
                {currentRoom.acoustic_specs.rt60 && (
                  <div>
                    <span className="text-zinc-500 block">Çınlama Süresi (RT60):</span>
                    <span className="font-semibold text-zinc-950 font-mono">{currentRoom.acoustic_specs.rt60}</span>
                  </div>
                )}
                {currentRoom.acoustic_specs.isolation && (
                  <div>
                    <span className="text-zinc-500 block">Ses İzolasyonu:</span>
                    <span className="font-semibold text-zinc-950 font-mono">{currentRoom.acoustic_specs.isolation}</span>
                  </div>
                )}
                {currentRoom.acoustic_specs.ceiling_height && (
                  <div>
                    <span className="text-zinc-500 block">Tavan Yüksekliği:</span>
                    <span className="font-semibold text-zinc-950 font-mono">{currentRoom.acoustic_specs.ceiling_height}</span>
                  </div>
                )}
                {currentRoom.acoustic_specs.flooring && (
                  <div>
                    <span className="text-zinc-500 block">Zemin Yapısı:</span>
                    <span className="font-semibold text-zinc-950">{currentRoom.acoustic_specs.flooring}</span>
                  </div>
                )}
                {currentRoom.acoustic_specs.monitoring && (
                  <div className="col-span-2 pt-2 border-t border-zinc-200/60">
                    <span className="text-zinc-500 block">Ana Dinleme / Monitör:</span>
                    <span className="font-semibold text-zinc-950 font-mono">{currentRoom.acoustic_specs.monitoring}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Room Features Bulleted List */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-500 font-semibold">
                Oda Donanımı & Olanaklar
              </h4>
              <ul className="space-y-2">
                {currentRoom.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-zinc-700">
                    <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Pricing & Booking Card */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-zinc-950 text-white shadow-card">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">
                  Kullanım Tarifesi
                </span>
                <div className="text-lg font-bold font-mono text-white">
                  {currentRoom.hourly_rate_info}
                </div>
              </div>
              <Link
                href={`#contact?room=${currentRoom.slug}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white text-zinc-950 font-semibold text-xs hover:bg-zinc-100 transition-all active:scale-95"
              >
                <span>Bu Odayı Rezerve Et</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
