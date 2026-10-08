'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { StudioRoom, Equipment } from '@/types/database';
import { ArrowUpRight, Activity } from 'lucide-react';

interface StudiosSectionProps {
  rooms: StudioRoom[];
  equipment: Equipment[];
}

export const StudiosSection: React.FC<StudiosSectionProps> = ({ rooms, equipment }) => {
  const [activeRoomId, setActiveRoomId] = useState<string>(rooms[0]?.id || '');
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);

  const currentRoom = rooms.find((r) => r.id === activeRoomId) || rooms[0];

  if (!currentRoom) return null;

  const roomImages = currentRoom.images && currentRoom.images.length > 0
    ? currentRoom.images
    : [currentRoom.primary_image];

  return (
    <section id="studios" className="py-24 bg-white text-[#0F1012] border-t border-zinc-200 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-zinc-200">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#E26D4B] font-bold">
              KAYIT & PROVA ALANLARI
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase font-display tracking-tight text-[#0F1012]">
              Stüdyo Odaları
            </h2>
          </div>

          {/* Room Switcher */}
          <div className="flex items-center gap-2 p-1.5 bg-zinc-100 border border-zinc-200 rounded-2xl overflow-x-auto">
            {rooms.map((room) => {
              const isActive = room.id === currentRoom.id;
              return (
                <button
                  key={room.id}
                  onClick={() => {
                    setActiveRoomId(room.id);
                    setSelectedImageIndex(0);
                  }}
                  className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold tracking-wider uppercase whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-[#0F1012] text-white shadow-sm'
                      : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-200'
                  }`}
                >
                  {room.name.split('•')[0].trim()}
                </button>
              );
            })}
          </div>
        </div>

        {/* Room Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Room Visual */}
          <div className="lg:col-span-7 space-y-3">
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-200 shadow-md">
              <Image
                src={roomImages[selectedImageIndex] || currentRoom.primary_image}
                alt={currentRoom.name}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover"
              />
              <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md text-white text-xs font-mono font-bold px-3.5 py-1.5 rounded-full border border-white/10">
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
                        ? 'border-[#E26D4B] scale-95 shadow-sm'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <Image src={img} alt={`Studio view ${idx + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Room Specs & Highlights */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-[#4A8B9E] font-bold">
                {currentRoom.short_tag}
              </span>
              <h3 className="text-2xl sm:text-3xl font-black uppercase font-display text-[#0F1012]">
                {currentRoom.name}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 font-mono leading-relaxed pt-1">
                {currentRoom.description}
              </p>
            </div>

            {/* Acoustic Specs Grid */}
            <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-zinc-900 font-bold">
                <Activity className="w-4 h-4 text-[#E26D4B]" />
                <span>Teknik & Akustik Özellikler</span>
              </div>
              <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-xs font-mono">
                {currentRoom.acoustic_specs.rt60 && (
                  <div>
                    <span className="text-zinc-500 block text-[10px]">Çınlama (RT60):</span>
                    <span className="font-bold text-zinc-900">{currentRoom.acoustic_specs.rt60}</span>
                  </div>
                )}
                {currentRoom.acoustic_specs.isolation && (
                  <div>
                    <span className="text-zinc-500 block text-[10px]">İzolasyon:</span>
                    <span className="font-bold text-zinc-900">{currentRoom.acoustic_specs.isolation}</span>
                  </div>
                )}
                {currentRoom.acoustic_specs.monitoring && (
                  <div className="col-span-2 pt-2 border-t border-zinc-200">
                    <span className="text-zinc-500 block text-[10px]">Dinleme Monitörleri:</span>
                    <span className="font-bold text-[#4A8B9E]">{currentRoom.acoustic_specs.monitoring}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Room Features */}
            <ul className="space-y-2">
              {currentRoom.features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-2.5 text-xs font-mono text-zinc-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E26D4B] shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            {/* Bottom Booking Action */}
            <div className="pt-2 flex items-center justify-between gap-4 p-4 rounded-2xl bg-zinc-900 text-white shadow-sm">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block">
                  Tarife
                </span>
                <span className="text-sm font-bold font-mono text-white">
                  {currentRoom.hourly_rate_info}
                </span>
              </div>
              <Link
                href={`#contact?room=${currentRoom.slug}`}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#E26D4B] text-white font-mono font-bold text-xs uppercase tracking-wider hover:bg-[#c95b3b] transition-all"
              >
                <span>Rezerve Et</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
