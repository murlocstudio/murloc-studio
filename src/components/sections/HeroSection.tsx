'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { SiteSettings } from '@/types/database';

interface HeroSectionProps {
  settings: SiteSettings;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ settings }) => {
  return (
    <section className="relative min-h-[85vh] flex flex-col justify-between pt-32 pb-12 bg-white text-[#0F1012] overflow-hidden">
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 vintage-overlay opacity-60 pointer-events-none" />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full my-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left: Typography & Actions */}
          <div className="lg:col-span-7 space-y-6">
            {/* Location & Vintage Tag */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-zinc-100 border border-zinc-200 text-xs font-mono text-zinc-800">
              <span className="w-2 h-2 rounded-full bg-[#E26D4B] animate-pulse" />
              <span className="font-bold tracking-widest uppercase">TUNUS CAD. NO: 14/5 • ANKARA / ÇANKAYA</span>
            </div>

            {/* Sound City Style Massive Headline */}
            <div className="space-y-2">
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter uppercase font-display leading-[0.9] text-[#0F1012]">
                Murloc <span className="text-[#E26D4B]">Music</span> <br className="hidden sm:inline" />
                <span className="text-[#4A8B9E]">Studio</span>
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-zinc-600 font-mono font-medium max-w-xl pt-2 leading-relaxed">
                {settings.hero_subheadline ||
                  'Ankara Tunus Caddesi’nde canlı hücum kayıt, vokal prodüksiyonu, analog miksaj, grup provaları ve derslikler.'}
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <Link
                href="#contact"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-[#E26D4B] text-white font-mono font-bold text-xs uppercase tracking-wider hover:bg-[#c95b3b] transition-all shadow-sm active:scale-98"
              >
                <span>ONLINE RANDEVU AL</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>

              <Link
                href="#rates"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-zinc-100 text-zinc-900 border border-zinc-200 font-mono font-bold text-xs uppercase tracking-wider hover:bg-zinc-200 transition-all active:scale-98"
              >
                <span>SAATLİK ÜCRETLER</span>
                <ArrowDown className="w-4 h-4 text-[#4A8B9E]" />
              </Link>
            </div>
          </div>

          {/* Right: Studio Room Showcase Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-zinc-900 border border-zinc-200 shadow-xl">
              <Image
                src={settings.hero_image_url}
                alt="Murloc Music Studio Live Room and Amp Setup"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6 text-white font-mono">
                <span className="text-[10px] text-[#E26D4B] font-bold uppercase tracking-widest">
                  CANLI HÜCUM KAYIT & PROVA
                </span>
                <span className="text-sm font-bold uppercase">Studio A • Live Room</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Keywords Ticker in Clean Off-White */}
      <div className="relative z-10 border-y border-zinc-200 bg-zinc-50 py-3 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between text-[11px] font-mono font-bold tracking-wider text-zinc-500 overflow-x-auto whitespace-nowrap gap-6 scrollbar-none">
          <span>KAYIT</span>
          <span className="text-[#E26D4B]">•</span>
          <span>GÜRÜLTÜ</span>
          <span className="text-[#4A8B9E]">•</span>
          <span>MIX & MASTERING</span>
          <span className="text-[#E26D4B]">•</span>
          <span>PROVA</span>
          <span className="text-[#4A8B9E]">•</span>
          <span>HÜCUM KAYIT</span>
          <span className="text-[#E26D4B]">•</span>
          <span>DERSLİK</span>
          <span className="text-[#4A8B9E]">•</span>
          <span>VINTAGE LAMBALI AMFİLER</span>
          <span className="text-[#E26D4B]">•</span>
          <span>TUNUS CADDESİ</span>
        </div>
      </div>
    </section>
  );
};
