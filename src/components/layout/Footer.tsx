'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUp, Instagram, Music, MapPin, Mail, Clock, Lock } from 'lucide-react';
import { SiteSettings } from '@/types/database';
import { MurlocLogo } from '@/components/ui/MurlocLogo';

interface FooterProps {
  settings: SiteSettings;
}

export const Footer: React.FC<FooterProps> = ({ settings }) => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-zinc-50 text-[#0F1012] border-t border-zinc-200 pt-16 pb-12 font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-zinc-200">
          {/* Brand */}
          <div className="md:col-span-5 space-y-4">
            <MurlocLogo size={46} showText={true} textColor="#0F1012" />
            <p className="text-xs text-zinc-600 max-w-sm leading-relaxed pt-2">
              Ankara Tunus Caddesi'nde canlı hücum kayıt, grup provaları, analog miksaj ve profesyonel ses mühendisliği.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={settings.instagram_url || 'https://instagram.com/studiomurloc'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white border border-zinc-200 flex items-center justify-center text-zinc-700 hover:text-[#E26D4B] hover:border-[#E26D4B] transition-colors shadow-xs"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              {settings.spotify_url && (
                <a
                  href={settings.spotify_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white border border-zinc-200 flex items-center justify-center text-zinc-700 hover:text-[#4A8B9E] hover:border-[#4A8B9E] transition-colors shadow-xs"
                  aria-label="Spotify"
                >
                  <Music className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Quick Nav */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-[#E26D4B] font-bold">
              BÖLÜMLER
            </h4>
            <ul className="space-y-2 text-xs text-zinc-600">
              <li>
                <Link href="#studios" className="hover:text-zinc-950 transition-colors">
                  Stüdyo Odaları
                </Link>
              </li>
              <li>
                <Link href="#rates" className="hover:text-zinc-950 transition-colors">
                  Saatlik Oda Ücretleri
                </Link>
              </li>
              <li>
                <Link href="#equipment" className="hover:text-zinc-950 transition-colors">
                  Donanım & Amfiler
                </Link>
              </li>
              <li>
                <Link href="#story" className="hover:text-zinc-950 transition-colors">
                  Murloc Hikayesi
                </Link>
              </li>
              <li>
                <Link href="#location" className="hover:text-zinc-950 transition-colors">
                  Konum & Randevu
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-[#4A8B9E] font-bold">
              STÜDYO İLETİŞİM
            </h4>
            <div className="space-y-2 text-xs text-zinc-600">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#E26D4B] shrink-0 mt-0.5" />
                <span>{settings.address || 'Kavaklıdere Mah. Tunus Cad. No: 14/5, Çankaya / Ankara'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#4A8B9E] shrink-0" />
                <span>{settings.working_hours || 'Haftanın 7 Günü: 10:00 - 02:00'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                <span>{settings.email || 'studiomurloc@gmail.com'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div className="flex items-center gap-3">
            <span>© {currentYear} Murloc Music Studio. Ankara.</span>
            <span>•</span>
            <Link href="/admin" className="hover:text-zinc-900 transition-colors flex items-center gap-1">
              <Lock className="w-3 h-3" />
              <span>CMS Girişi</span>
            </Link>
          </div>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-zinc-900 transition-colors"
          >
            <span>Başa Dön</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
