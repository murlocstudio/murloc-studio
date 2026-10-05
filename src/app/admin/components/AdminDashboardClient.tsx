'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { StudioDataBundle } from '@/types/database';
import { SettingsEditor } from './SettingsEditor';
import { RoomsEditor } from './RoomsEditor';
import { EquipmentEditor } from './EquipmentEditor';
import { ServicesEditor } from './ServicesEditor';
import { PortfolioEditor } from './PortfolioEditor';
import { InquiriesEditor } from './InquiriesEditor';
import {
  Sliders,
  Home,
  Music,
  Disc,
  MessageSquare,
  Globe,
  LogOut,
  ExternalLink,
  Layers,
  Radio,
  Sparkles,
} from 'lucide-react';
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';

interface AdminDashboardClientProps {
  initialData: StudioDataBundle;
}

export const AdminDashboardClient: React.FC<AdminDashboardClientProps> = ({ initialData }) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<
    'settings' | 'rooms' | 'equipment' | 'services' | 'portfolio' | 'inquiries'
  >('settings');

  const [isLoadingAuth, setIsLoadingAuth] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      if (isSupabaseConfigured()) {
        const supabase = createClient();
        if (supabase) {
          const { data } = await supabase.auth.getSession();
          if (!data.session) {
            router.push('/admin/login');
            return;
          }
        }
      } else {
        const demoAuth = sessionStorage.getItem('murloc_admin_auth');
        if (!demoAuth) {
          router.push('/admin/login');
          return;
        }
      }
      setIsLoadingAuth(false);
    }
    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    if (isSupabaseConfigured()) {
      const supabase = createClient();
      if (supabase) {
        await supabase.auth.signOut();
      }
    }
    sessionStorage.removeItem('murloc_admin_auth');
    router.push('/admin/login');
  };

  if (isLoadingAuth) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-white">
        <div className="flex items-center gap-3">
          <Disc className="w-6 h-6 animate-spin text-red-600" />
          <span className="text-sm font-mono">Yetki doğrulanıyor...</span>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'settings', label: 'Genel & SEO', icon: Globe },
    { id: 'rooms', label: 'Stüdyolar (A, B, C)', icon: Home },
    { id: 'equipment', label: 'Ekipman Envanteri', icon: Sliders },
    { id: 'services', label: 'Hizmetler & Fiyatlar', icon: Layers },
    { id: 'portfolio', label: 'Sanatçı Kataloğu', icon: Music },
    { id: 'inquiries', label: 'Rezervasyon Talepleri', icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen bg-zinc-100 flex flex-col md:flex-row text-zinc-900 selection:bg-zinc-950 selection:text-white">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-zinc-950 text-zinc-300 p-6 flex flex-col justify-between border-r border-zinc-800 shrink-0">
        <div className="space-y-8">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white text-zinc-950 flex items-center justify-center font-bold">
              <Disc className="w-4 h-4 text-red-600 animate-spin" style={{ animationDuration: '8s' }} />
            </div>
            <div>
              <span className="text-sm font-bold tracking-tight text-white font-display block">
                Murloc CMS
              </span>
              <span className="text-[10px] text-zinc-400 font-mono">Headless Studio Panel</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all text-left ${
                    isActive
                      ? 'bg-white text-zinc-950 shadow-sm'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-red-600' : 'text-zinc-400'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="pt-6 border-t border-zinc-800 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-medium text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors"
          >
            <span className="flex items-center gap-2">
              <Radio className="w-3.5 h-3.5 text-red-500" />
              Canlı Siteyi Aç
            </span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium text-red-400 hover:bg-red-950/40 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Çıkış Yap</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 sm:p-10 max-w-6xl mx-auto overflow-y-auto">
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 mb-8 border-b border-zinc-200">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-red-600 font-bold">
              Murloc Studio CMS
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 font-display">
              {tabs.find((t) => t.id === activeTab)?.label}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="px-4 py-2 bg-white border border-zinc-300 text-zinc-800 text-xs font-semibold rounded-xl hover:bg-zinc-50 flex items-center gap-1.5 transition-all shadow-subtle"
            >
              <span>Siteyi Gör</span>
              <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
            </Link>
          </div>
        </div>

        {/* Tab Components */}
        {activeTab === 'settings' && <SettingsEditor initialSettings={initialData.settings} />}
        {activeTab === 'rooms' && <RoomsEditor initialRooms={initialData.rooms} />}
        {activeTab === 'equipment' && (
          <EquipmentEditor initialEquipment={initialData.equipment} rooms={initialData.rooms} />
        )}
        {activeTab === 'services' && <ServicesEditor initialServices={initialData.services} />}
        {activeTab === 'portfolio' && <PortfolioEditor initialPortfolio={initialData.portfolio} />}
        {activeTab === 'inquiries' && <InquiriesEditor />}
      </main>
    </div>
  );
};
