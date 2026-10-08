'use client';

import React from 'react';
import Image from 'next/image';
import { SiteSettings } from '@/types/database';
import { ShieldCheck, Volume2 } from 'lucide-react';

interface StorySectionProps {
  settings: SiteSettings;
}

export const StorySection: React.FC<StorySectionProps> = ({ settings }) => {
  return (
    <section id="story" className="py-24 bg-zinc-50 text-[#0F1012] border-t border-zinc-200 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Candid Studio Photo */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-zinc-900 border border-zinc-200 shadow-xl">
              <Image
                src={settings.story_image_url}
                alt="Murloc Music Studio Ankara Rehearsal and Live Session"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-xs font-mono text-white">
                <span className="text-[#E26D4B] font-bold">KAVAKLIDERE / TUNUS CAD.</span>
                <span className="text-white/80">EST. ANKARA</span>
              </div>
            </div>
          </div>

          {/* Right: Concise Story */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-[#E26D4B] font-bold">
                MURLOC MUSIC STUDIO HİKAYESİ
              </span>
              <h2 className="text-3xl sm:text-5xl font-black uppercase font-display tracking-tight text-[#0F1012]">
                {settings.story_title || 'Müziğin ve Sesin Ham Gücü'}
              </h2>
            </div>

            <p className="text-xs sm:text-sm font-mono text-zinc-600 leading-relaxed">
              {settings.story_narrative ||
                'Murloc Music Studio, Ankara müzik sahnesinin kalbi Kavaklıdere Tunus Caddesi’nde kuruldu. Amacımız sade: Sanatçıların en doğal performansını, analog sıcaklık ve tavizsiz akustik izolasyonla mikrofona aktarmak.'}
            </p>

            {/* Micro Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-white border border-zinc-200 shadow-xs space-y-1">
                <div className="flex items-center gap-2 text-zinc-900 font-bold text-xs font-mono uppercase">
                  <Volume2 className="w-4 h-4 text-[#E26D4B]" />
                  <span>Canlı Hücum Kayıt</span>
                </div>
                <p className="text-[11px] font-mono text-zinc-500">
                  Aynı odada grubunuzla canlı çalarak doğal dinamikleri yakalayın.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-zinc-200 shadow-xs space-y-1">
                <div className="flex items-center gap-2 text-zinc-900 font-bold text-xs font-mono uppercase">
                  <ShieldCheck className="w-4 h-4 text-[#4A8B9E]" />
                  <span>Saf Akustik Alan</span>
                </div>
                <p className="text-[11px] font-mono text-zinc-500">
                  Yüzer zemin, sessiz havalandırma ve profesyonel difüzyon.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
