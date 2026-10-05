'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Equipment } from '@/types/database';
import { Sliders, Mic, Speaker, Music, Search, CheckCircle2, Sparkles } from 'lucide-react';

interface EquipmentSectionProps {
  equipment: Equipment[];
}

export const EquipmentSection: React.FC<EquipmentSectionProps> = ({ equipment }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [onlyRentable, setOnlyRentable] = useState<boolean>(false);

  const categories = [
    { id: 'All', label: 'Tüm Ekipmanlar' },
    { id: 'Microphones', label: 'Mikrofonlar' },
    { id: 'Outboard & Preamps', label: 'Outboard & Preamp' },
    { id: 'Monitoring', label: 'Monitör & Dinleme' },
    { id: 'Instruments & Amplifiers', label: 'Enstrüman & Amfi' },
  ];

  const filteredEquipment = equipment.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.specs && item.specs.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesRentable = !onlyRentable || item.is_rentable;
    return matchesCategory && matchesSearch && matchesRentable;
  });

  return (
    <section id="equipment" className="py-24 bg-zinc-50 border-t border-zinc-200/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-600"></span>
              <span className="text-xs font-mono uppercase tracking-widest text-zinc-500 font-semibold">
                Sektör Standardı Donanım
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-950 font-display tracking-tight">
              Analog & Dijital Ekipman Parkuru
            </h2>
            <p className="text-base sm:text-lg text-zinc-600">
              Neumann, Neve, Tube-Tech, Genelec ve Telefunken gibi ses dünyasının mihenk taşı ekipmanları.
            </p>
          </div>

          {/* Search and Rental Toggle */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Model, marka veya özellik ara..."
                className="w-full sm:w-64 pl-9 pr-4 py-2 text-xs bg-white border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-950 text-zinc-900 placeholder:text-zinc-400"
              />
            </div>
            <button
              onClick={() => setOnlyRentable(!onlyRentable)}
              className={`px-3.5 py-2 text-xs font-semibold rounded-xl border transition-all flex items-center justify-center gap-1.5 ${
                onlyRentable
                  ? 'bg-zinc-950 text-white border-zinc-950'
                  : 'bg-white text-zinc-700 border-zinc-200 hover:bg-zinc-100'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Sadece Kiralanabilir</span>
            </button>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-zinc-950 text-white shadow-sm'
                    : 'bg-white text-zinc-600 border border-zinc-200 hover:bg-zinc-100'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Equipment Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredEquipment.map((gear) => (
            <div
              key={gear.id}
              className="group bg-white rounded-2xl border border-zinc-200/90 overflow-hidden shadow-subtle hover:shadow-elevated transition-all flex flex-col justify-between"
            >
              <div>
                {/* Gear Image */}
                {gear.image_url ? (
                  <div className="relative aspect-[16/10] bg-zinc-100 overflow-hidden">
                    <Image
                      src={gear.image_url}
                      alt={gear.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {gear.is_rentable && (
                      <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-mono font-bold text-zinc-900 border border-zinc-200 shadow-sm flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        Kiralanabilir
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="p-4 bg-zinc-100 flex items-center justify-between">
                    <span className="text-xs font-mono uppercase text-zinc-400">{gear.category}</span>
                    {gear.is_rentable && (
                      <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                        Kiralama
                      </span>
                    )}
                  </div>
                )}

                {/* Content */}
                <div className="p-5 space-y-2">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 font-bold">
                    {gear.brand}
                  </div>
                  <h3 className="text-sm font-bold text-zinc-950 group-hover:text-red-600 transition-colors leading-snug">
                    {gear.name}
                  </h3>
                  {gear.specs && (
                    <p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed">
                      {gear.specs}
                    </p>
                  )}
                </div>
              </div>

              {/* Bottom Price/Rental Info */}
              <div className="p-5 pt-0 mt-auto">
                <div className="pt-3 border-t border-zinc-100 flex items-center justify-between text-xs">
                  <span className="text-zinc-400 text-[11px]">Kiralama:</span>
                  <span className="font-mono font-semibold text-zinc-900">
                    {gear.rental_daily_price || 'Sadece Stüdyo İçi'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredEquipment.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-zinc-200">
            <p className="text-sm text-zinc-500">Aradığınız kriterlere uygun ekipman bulunamadı.</p>
          </div>
        )}
      </div>
    </section>
  );
};
