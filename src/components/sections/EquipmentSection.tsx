'use client';

import React, { useState } from 'react';
import { Equipment } from '@/types/database';
import { Search } from 'lucide-react';

interface EquipmentSectionProps {
  equipment: Equipment[];
}

export const EquipmentSection: React.FC<EquipmentSectionProps> = ({ equipment }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'All', label: 'TÜM EKİPMAN' },
    { id: 'Microphones', label: 'MİKROFONLAR' },
    { id: 'Outboard & Preamps', label: 'PREAMP & OUTBOARD' },
    { id: 'Instruments & Amplifiers', label: 'AMFİLER & DAVUL' },
  ];

  const filteredEquipment = equipment.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.specs && item.specs.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="equipment" className="py-24 bg-white text-[#0F1012] border-t border-zinc-200 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header matching the Instagram Post */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-zinc-200">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-mono uppercase tracking-widest text-[#E26D4B] font-bold">
              DONANIM & BACKLINE LİSTESİ
            </span>
            <h2 className="text-4xl sm:text-6xl font-black uppercase font-display tracking-tight leading-none">
              <span className="text-[#E26D4B]">BURADA </span>
              <span className="text-[#4A8B9E]">NELER VAR?</span>
            </h2>
            <p className="text-xs sm:text-sm font-mono text-zinc-600 pt-1">
              Neumann, Neve, Universal Audio, Fender, Marshall ve Ampeg donanım zinciri.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Ekipman ara..."
              className="w-full pl-9 pr-4 py-2 text-xs font-mono bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:border-[#E26D4B] text-zinc-900 placeholder:text-zinc-400"
            />
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
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-[#0F1012] text-white shadow-sm'
                    : 'bg-zinc-100 text-zinc-600 border border-zinc-200 hover:text-zinc-950'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Equipment Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEquipment.map((gear) => (
            <div
              key={gear.id}
              className="bg-zinc-50 rounded-2xl border border-zinc-200/80 p-5 flex flex-col justify-between hover:border-[#E26D4B] transition-all shadow-xs group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#E26D4B] font-bold">
                    {gear.brand}
                  </span>
                  <span className="text-[10px] font-mono text-zinc-400 uppercase">
                    {gear.category.split('&')[0]}
                  </span>
                </div>

                <h3 className="text-base font-bold uppercase font-display text-zinc-950 group-hover:text-[#E26D4B] transition-colors leading-snug">
                  {gear.name}
                </h3>

                {gear.specs && (
                  <p className="text-xs font-mono text-zinc-600 line-clamp-2 leading-relaxed">
                    {gear.specs}
                  </p>
                )}
              </div>

              {gear.is_rentable && (
                <div className="pt-3 mt-3 border-t border-zinc-200 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-[#4A8B9E] font-semibold">Dış Kiralama:</span>
                  <span className="text-zinc-950 font-bold">{gear.rental_daily_price || 'Müsait'}</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredEquipment.length === 0 && (
          <div className="text-center py-16 bg-zinc-50 rounded-2xl border border-zinc-200">
            <p className="text-xs font-mono text-zinc-500">Aradığınız kriterlere uygun donanım bulunamadı.</p>
          </div>
        )}
      </div>
    </section>
  );
};
