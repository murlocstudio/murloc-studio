'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Equipment } from '@/types/database';
import { Sliders, Mic, Music, Speaker, CheckCircle2, Search } from 'lucide-react';

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
    <section id="equipment" className="py-24 bg-[#0F1012] text-[#FAF8F5] border-t border-white/10 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header matching the Instagram Post */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-mono uppercase tracking-widest text-[#E26D4B] font-bold">
              DONANIM & BACKLINE LİSTESİ
            </span>
            <h2 className="text-4xl sm:text-6xl font-black uppercase font-display tracking-tight leading-none">
              <span className="text-[#E26D4B]">BURADA </span>
              <span className="text-[#4A8B9E]">NELER VAR?</span>
            </h2>
            <p className="text-xs sm:text-sm font-mono text-[#FAF8F5]/70 pt-1">
              Neumann, Neve, Universal Audio, Fender, Marshall ve Ampeg donanım zinciri.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-[#FAF8F5]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Ekipman ara..."
              className="w-full pl-9 pr-4 py-2 text-xs font-mono bg-[#16171A] border border-white/10 rounded-xl focus:outline-none focus:border-[#E26D4B] text-[#FAF8F5] placeholder:text-[#FAF8F5]/40"
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
                    ? 'bg-[#E26D4B] text-white shadow-sm'
                    : 'bg-[#16171A] text-[#FAF8F5]/60 border border-white/10 hover:text-[#FAF8F5]'
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
              className="bg-[#16171A] rounded-2xl border border-white/10 p-5 flex flex-col justify-between hover:border-[#E26D4B]/50 transition-all group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#E26D4B] font-bold">
                    {gear.brand}
                  </span>
                  <span className="text-[10px] font-mono text-[#FAF8F5]/40 uppercase">
                    {gear.category.split('&')[0]}
                  </span>
                </div>

                <h3 className="text-base font-bold uppercase font-display text-[#FAF8F5] group-hover:text-[#E26D4B] transition-colors leading-snug">
                  {gear.name}
                </h3>

                {gear.specs && (
                  <p className="text-xs font-mono text-[#FAF8F5]/60 line-clamp-2 leading-relaxed">
                    {gear.specs}
                  </p>
                )}
              </div>

              {gear.is_rentable && (
                <div className="pt-3 mt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-[#4A8B9E] font-semibold">Dış Kiralama:</span>
                  <span className="text-[#FAF8F5] font-bold">{gear.rental_daily_price || 'Müsait'}</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredEquipment.length === 0 && (
          <div className="text-center py-16 bg-[#16171A] rounded-2xl border border-white/10">
            <p className="text-xs font-mono text-[#FAF8F5]/50">Aradığınız kriterlere uygun donanım bulunamadı.</p>
          </div>
        )}
      </div>
    </section>
  );
};
