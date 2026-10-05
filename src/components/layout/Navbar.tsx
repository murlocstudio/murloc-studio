'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Radio, ArrowUpRight, Phone, Disc, Lock } from 'lucide-react';
import { SiteSettings } from '@/types/database';

interface NavbarProps {
  settings: SiteSettings;
}

export const Navbar: React.FC<NavbarProps> = ({ settings }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Stüdyolar', href: '#studios' },
    { label: 'Ekipmanlar', href: '#equipment' },
    { label: 'Hizmetler', href: '#services' },
    { label: 'Portfolyo', href: '#catalog' },
    { label: 'Hikayemiz', href: '#story' },
    { label: 'Konum & İletişim', href: '#location' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-md border-b border-zinc-200/80 shadow-sm py-3.5'
          : 'bg-white/70 backdrop-blur-xs border-b border-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Studio Brand Logo & Live ON AIR Indicator */}
          <Link href="/" className="group flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-zinc-950 text-white flex items-center justify-center font-bold tracking-tighter text-lg shadow-sm group-hover:scale-105 transition-transform">
              <span className="font-mono text-xs text-red-500 font-black tracking-widest mr-[-2px]">M</span>
              <Disc className="w-4 h-4 text-zinc-300 animate-spin" style={{ animationDuration: '6s' }} />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-extrabold tracking-tight text-zinc-950 uppercase font-display flex items-center gap-1.5">
                Murloc Studio
                <span className="text-[10px] text-zinc-400 font-mono font-normal lowercase tracking-normal">
                  .com
                </span>
              </span>
              <div className="flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
                </span>
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 font-semibold">
                  ON AIR
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-zinc-600 hover:text-zinc-950 transition-colors py-1 relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-zinc-950 transition-all duration-200 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/admin"
              className="p-2 rounded-lg text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 transition-colors"
              title="Yönetim Paneli"
            >
              <Lock className="w-4 h-4" />
            </Link>

            <a
              href={`tel:${settings.phone}`}
              className="hidden xl:flex items-center gap-1.5 text-xs font-mono font-medium text-zinc-600 hover:text-zinc-950 px-2.5 py-1.5 rounded-md hover:bg-zinc-100 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-zinc-400" />
              <span>{settings.phone}</span>
            </a>

            <Link
              href="#contact"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-zinc-950 text-white hover:bg-zinc-800 transition-all shadow-sm active:scale-95"
            >
              <span>Rezervasyon Yap</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <Link
              href="#contact"
              className="px-3 py-1.5 rounded-full text-xs font-semibold bg-zinc-950 text-white"
            >
              Rezervasyon
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-zinc-700 hover:bg-zinc-100 focus:outline-none"
              aria-label="Menüyü Aç/Kapat"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-zinc-200 px-6 py-6 space-y-4 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
            <div className="flex items-center gap-2">
              <Radio className="w-4 h-4 text-red-600 animate-pulse" />
              <span className="text-xs font-mono font-semibold uppercase text-zinc-600">
                Murloc Studio İstanbul
              </span>
            </div>
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs font-medium text-zinc-500 hover:text-zinc-900 flex items-center gap-1"
            >
              <Lock className="w-3 h-3" />
              CMS Panel
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-2 pt-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-semibold text-zinc-800 hover:text-zinc-950 hover:bg-zinc-50 py-2.5 px-3 rounded-lg transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-zinc-100 flex flex-col gap-2">
            <a
              href={`tel:${settings.phone}`}
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-zinc-100 text-zinc-800 font-medium text-sm"
            >
              <Phone className="w-4 h-4 text-zinc-500" />
              {settings.phone}
            </a>
            <Link
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-zinc-950 text-white font-semibold text-sm"
            >
              <span>Online Rezervasyon & İletişim</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
