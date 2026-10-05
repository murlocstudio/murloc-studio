'use client';

import React from 'react';
import Image from 'next/image';
import { SiteSettings } from '@/types/database';
import { Volume2, ShieldCheck, Award, Users, Disc } from 'lucide-react';

interface StorySectionProps {
  settings: SiteSettings;
}

export const StorySection: React.FC<StorySectionProps> = ({ settings }) => {
  const teamMembers = [
    {
      name: 'Mert Aksoy',
      role: 'Baş Ses Mühendisi & Kurucu',
      bio: 'Berklee College of Music mezunu. 12 yılı aşkın analog miksaj ve Dolby Atmos mastering tecrübesi.',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'Eren Yılmaz',
      role: 'Kayıt Mühendisi & Davul Teknisyeni',
      bio: 'Canlı hücum kayıtları ve davul akordu uzmanı. 50+ albüm prodüksiyonunda baş mühendis.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'Selin Kaya',
      role: 'Vokal Prodüktörü & Mastering Mühendisi',
      bio: 'Vokal editi, Dolby Atmos uzamsal ses dizaynı ve analog mastering zinciri sorumlusu.',
      image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    },
  ];

  return (
    <section id="story" className="py-24 bg-white border-t border-zinc-200/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Story Narrative & Visual Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Image */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/3] sm:aspect-[16/11] rounded-3xl overflow-hidden bg-zinc-900 border border-zinc-200 shadow-elevated">
              <Image
                src={settings.story_image_url}
                alt="Murloc Studio Control Room and Acoustic Philosophy"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-8 text-white">
                <span className="text-xs font-mono tracking-wider uppercase text-red-400 font-semibold">
                  EST. 2018 • İSTANBUL
                </span>
                <p className="text-lg font-bold font-display mt-1">
                  "Müzik sadece duyulmaz, kusursuz bir odada tüm varlığıyla hissedilir."
                </p>
              </div>
            </div>
          </div>

          {/* Right: Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-600"></span>
                <span className="text-xs font-mono uppercase tracking-widest text-zinc-500 font-semibold">
                  Murloc Studio Felsefesi
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-950 font-display tracking-tight">
                {settings.story_title || 'Kusursuz Ses Tutkusuyla Doğdu'}
              </h2>
            </div>

            <p className="text-base text-zinc-600 leading-relaxed">
              {settings.story_narrative ||
                'Murloc Studio, müzisyenlerin ve prodüktörlerin yaratıcı vizyonlarını en yüksek ses kalitesiyle gerçekleştirebilmeleri amacıyla kuruldu.'}
            </p>

            {/* Architecture Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/80 space-y-1.5">
                <div className="flex items-center gap-2 text-zinc-950 font-bold text-sm">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Box-in-a-Box Mimari</span>
                </div>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  Dış gürültülerden ve mekanik titreşimlerden tamamen izole, yüzer zeminli bağımsız kabinler.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/80 space-y-1.5">
                <div className="flex items-center gap-2 text-zinc-950 font-bold text-sm">
                  <Volume2 className="w-4 h-4 text-red-600" />
                  <span>QRD Akustik Difüzyon</span>
                </div>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  Dengeli yansımalar ve homojen bas tepkisi için matematiksel olarak modellenmiş ahşap difüzörler.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="space-y-10 pt-10 border-t border-zinc-200/80">
          <div className="space-y-2 max-w-xl">
            <h3 className="text-2xl font-bold text-zinc-950 font-display">
              Deneyimli Prodüksiyon & Mühendislik Ekibi
            </h3>
            <p className="text-sm text-zinc-500">
              Müziğinizin her frekansını ve duygusunu en doğru şekilde yansıtan uzman kadromuz.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, idx) => (
              <div
                key={idx}
                className="bg-zinc-50 rounded-3xl p-6 border border-zinc-200/80 flex items-start gap-4 hover:bg-white hover:shadow-card transition-all"
              >
                <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-zinc-200 shrink-0">
                  <Image src={member.image} alt={member.name} fill className="object-cover" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-base font-bold text-zinc-950">{member.name}</h4>
                  <div className="text-xs font-mono text-red-600 font-semibold">{member.role}</div>
                  <p className="text-xs text-zinc-500 leading-relaxed pt-1">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
