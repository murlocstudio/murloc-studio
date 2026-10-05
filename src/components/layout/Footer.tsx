import React from 'react';
import Link from 'next/link';
import { Disc, ArrowUp, Instagram, Youtube, Music, MapPin, Phone, Mail, Clock } from 'lucide-react';
import { SiteSettings } from '@/types/database';

interface FooterProps {
  settings: SiteSettings;
}

export const Footer: React.FC<FooterProps> = ({ settings }) => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-zinc-950 text-zinc-300 border-t border-zinc-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-zinc-800/80">
          {/* Col 1 & 2: Brand & Description */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white text-zinc-950 flex items-center justify-center font-bold">
                <Disc className="w-4 h-4 text-red-600 animate-spin" style={{ animationDuration: '8s' }} />
              </div>
              <span className="text-xl font-bold tracking-tight text-white uppercase font-display">
                Murloc Studio
              </span>
            </div>
            <p className="text-sm text-zinc-400 max-w-sm leading-relaxed">
              Murloc Studio, müzik yapımcıları, bağımsız sanatçılar ve ses profesyonelleri için en yüksek kalitede analog ve dijital kayıt, miksaj, mastering ve Dolby Atmos hizmetleri sunar.
            </p>
            <div className="flex items-center gap-3 pt-2">
              {settings.instagram_url && (
                <a
                  href={settings.instagram_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              )}
              {settings.spotify_url && (
                <a
                  href={settings.spotify_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors"
                  aria-label="Spotify"
                >
                  <Music className="w-4 h-4" />
                </a>
              )}
              {settings.youtube_url && (
                <a
                  href={settings.youtube_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Col 3: Quick Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold">
              Bölümler
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#studios" className="hover:text-white transition-colors">
                  Stüdyo Odaları
                </Link>
              </li>
              <li>
                <Link href="#equipment" className="hover:text-white transition-colors">
                  Ekipman Parkuru
                </Link>
              </li>
              <li>
                <Link href="#services" className="hover:text-white transition-colors">
                  Hizmetler & Fiyatlar
                </Link>
              </li>
              <li>
                <Link href="#catalog" className="hover:text-white transition-colors">
                  Sanatçı Portfolyosu
                </Link>
              </li>
              <li>
                <Link href="#story" className="hover:text-white transition-colors">
                  Akustik Felsefe
                </Link>
              </li>
              <li>
                <Link href="#location" className="hover:text-white transition-colors">
                  Konum & Ulaşım
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold">
              Hizmetlerimiz
            </h4>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li>Canlı Hücum & Vokal Kaydı</li>
              <li>SSL Analog Miksaj</li>
              <li>7.1.4 Dolby Atmos Prodüksiyon</li>
              <li>Analog Mastering Zinciri</li>
              <li>4K Podcast Çekimi & Kurgu</li>
              <li>Ekipman & Backline Kiralama</li>
            </ul>
          </div>

          {/* Col 5: Contact & Hours */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold">
              Stüdyo İletişim
            </h4>
            <div className="space-y-2.5 text-xs text-zinc-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-zinc-500 shrink-0 mt-0.5" />
                <span>{settings.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                <a href={`tel:${settings.phone}`} className="hover:text-white">
                  {settings.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                <a href={`mailto:${settings.email}`} className="hover:text-white">
                  {settings.email}
                </a>
              </div>
              <div className="flex items-start gap-2 pt-1 border-t border-zinc-900">
                <Clock className="w-3.5 h-3.5 text-zinc-500 shrink-0 mt-0.5" />
                <span>{settings.working_hours}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div className="flex items-center gap-4 flex-wrap">
            <span>© {currentYear} Murloc Studio (murlocstudio). Tüm hakları saklıdır.</span>
            <span className="hidden sm:inline">•</span>
            <Link href="/admin" className="hover:text-zinc-400 font-mono transition-colors">
              CMS Admin Girişi
            </Link>
          </div>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-zinc-300 transition-colors p-1"
          >
            <span>Başa Dön</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
