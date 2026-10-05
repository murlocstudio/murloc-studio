'use client';

import React, { useState } from 'react';
import { SiteSettings } from '@/types/database';
import { Save, CheckCircle2, Globe, Phone, MapPin, Sparkles } from 'lucide-react';
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';
import { ImageUploadInput } from '@/components/ui/ImageUploadInput';

interface SettingsEditorProps {
  initialSettings: SiteSettings;
}

export const SettingsEditor: React.FC<SettingsEditorProps> = ({ initialSettings }) => {
  const [settings, setSettings] = useState<SiteSettings>(initialSettings);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);

    try {
      if (isSupabaseConfigured()) {
        const supabase = createClient();
        if (supabase) {
          const { error } = await supabase
            .from('site_settings')
            .update({
              site_title: settings.site_title,
              site_tagline: settings.site_tagline,
              hero_headline: settings.hero_headline,
              hero_subheadline: settings.hero_subheadline,
              hero_image_url: settings.hero_image_url,
              story_title: settings.story_title,
              story_narrative: settings.story_narrative,
              story_image_url: settings.story_image_url,
              phone: settings.phone,
              whatsapp_number: settings.whatsapp_number,
              email: settings.email,
              address: settings.address,
              working_hours: settings.working_hours,
              instagram_url: settings.instagram_url,
              spotify_url: settings.spotify_url,
              youtube_url: settings.youtube_url,
              seo_keywords: settings.seo_keywords,
              updated_at: new Date().toISOString(),
            })
            .eq('id', settings.id);

          if (error) throw error;
        }
      }
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error('Settings save error:', err);
      alert('Ayarlar kaydedilirken hata oluştu.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSave} className="space-y-8">
      {saveSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Site ayarları ve metinler başarıyla güncellendi!</span>
        </div>
      )}

      {/* Hero Section Copy */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-zinc-200/90 shadow-subtle space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-zinc-100">
          <Sparkles className="w-5 h-5 text-red-600" />
          <div>
            <h3 className="text-base font-bold text-zinc-950 font-display">Hero & Manşet Alanı</h3>
            <p className="text-xs text-zinc-500">Ana sayfa açılış başlığı ve tanıtım görseli</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase tracking-wider text-zinc-700 font-semibold">
              Hero Başlığı (Headline)
            </label>
            <input
              type="text"
              value={settings.hero_headline}
              onChange={(e) => setSettings({ ...settings, hero_headline: e.target.value })}
              className="w-full px-4 py-2.5 text-xs bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-zinc-950 text-zinc-900"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase tracking-wider text-zinc-700 font-semibold">
              Hero Açıklama Metni (Subheadline)
            </label>
            <textarea
              rows={2}
              value={settings.hero_subheadline}
              onChange={(e) => setSettings({ ...settings, hero_subheadline: e.target.value })}
              className="w-full px-4 py-2.5 text-xs bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-zinc-950 text-zinc-900"
            />
          </div>

          <ImageUploadInput
            label="Hero Ana Görseli"
            value={settings.hero_image_url}
            onChange={(url) => setSettings({ ...settings, hero_image_url: url })}
            folder="hero"
          />
        </div>
      </div>

      {/* Story & Philosophy */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-zinc-200/90 shadow-subtle space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-zinc-100">
          <Globe className="w-5 h-5 text-zinc-800" />
          <div>
            <h3 className="text-base font-bold text-zinc-950 font-display">Stüdyo Hikayesi & Akustik Felsefe</h3>
            <p className="text-xs text-zinc-500">Murloc Studio kuruluş hikayesi ve akustik mimari açıklaması</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase tracking-wider text-zinc-700 font-semibold">
              Hikaye Başlığı
            </label>
            <input
              type="text"
              value={settings.story_title}
              onChange={(e) => setSettings({ ...settings, story_title: e.target.value })}
              className="w-full px-4 py-2.5 text-xs bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-zinc-950 text-zinc-900"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase tracking-wider text-zinc-700 font-semibold">
              Hikaye & Felsefe Metni
            </label>
            <textarea
              rows={4}
              value={settings.story_narrative}
              onChange={(e) => setSettings({ ...settings, story_narrative: e.target.value })}
              className="w-full px-4 py-2.5 text-xs bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-zinc-950 text-zinc-900"
            />
          </div>

          <ImageUploadInput
            label="Hikaye Bölümü Görseli"
            value={settings.story_image_url}
            onChange={(url) => setSettings({ ...settings, story_image_url: url })}
            folder="story"
          />
        </div>
      </div>

      {/* Contact & Social Information */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-zinc-200/90 shadow-subtle space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-zinc-100">
          <Phone className="w-5 h-5 text-zinc-800" />
          <div>
            <h3 className="text-base font-bold text-zinc-950 font-display">İletişim & Sosyal Medya</h3>
            <p className="text-xs text-zinc-500">Telefon, WhatsApp, adres ve çalışma saatleri</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase tracking-wider text-zinc-700 font-semibold">Telefon</label>
            <input
              type="text"
              value={settings.phone}
              onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
              className="w-full px-4 py-2.5 text-xs bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-zinc-950 text-zinc-900"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase tracking-wider text-zinc-700 font-semibold">WhatsApp Numarası (Ülke koduyla)</label>
            <input
              type="text"
              value={settings.whatsapp_number}
              onChange={(e) => setSettings({ ...settings, whatsapp_number: e.target.value })}
              className="w-full px-4 py-2.5 text-xs bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-zinc-950 text-zinc-900"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase tracking-wider text-zinc-700 font-semibold">E-Posta</label>
            <input
              type="email"
              value={settings.email}
              onChange={(e) => setSettings({ ...settings, email: e.target.value })}
              className="w-full px-4 py-2.5 text-xs bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-zinc-950 text-zinc-900"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase tracking-wider text-zinc-700 font-semibold">Çalışma Saatleri</label>
            <input
              type="text"
              value={settings.working_hours}
              onChange={(e) => setSettings({ ...settings, working_hours: e.target.value })}
              className="w-full px-4 py-2.5 text-xs bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-zinc-950 text-zinc-900"
            />
          </div>

          <div className="sm:col-span-2 space-y-1.5">
            <label className="text-xs font-mono uppercase tracking-wider text-zinc-700 font-semibold">Açık Adres</label>
            <input
              type="text"
              value={settings.address}
              onChange={(e) => setSettings({ ...settings, address: e.target.value })}
              className="w-full px-4 py-2.5 text-xs bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-zinc-950 text-zinc-900"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase tracking-wider text-zinc-700 font-semibold">Instagram URL</label>
            <input
              type="text"
              value={settings.instagram_url}
              onChange={(e) => setSettings({ ...settings, instagram_url: e.target.value })}
              className="w-full px-4 py-2.5 text-xs bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-zinc-950 text-zinc-900 font-mono"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase tracking-wider text-zinc-700 font-semibold">Spotify URL</label>
            <input
              type="text"
              value={settings.spotify_url}
              onChange={(e) => setSettings({ ...settings, spotify_url: e.target.value })}
              className="w-full px-4 py-2.5 text-xs bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-zinc-950 text-zinc-900 font-mono"
            />
          </div>
        </div>
      </div>

      {/* SEO & Meta */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-zinc-200/90 shadow-subtle space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-zinc-100">
          <Globe className="w-5 h-5 text-zinc-800" />
          <div>
            <h3 className="text-base font-bold text-zinc-950 font-display">SEO & Meta Anahtar Kelimeler</h3>
            <p className="text-xs text-zinc-500">Google arama motoru optimizasyonu (murlocstudio, Murloc Studio)</p>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-mono uppercase tracking-wider text-zinc-700 font-semibold">
            SEO Anahtar Kelimeler (Virgülle Ayrılmış)
          </label>
          <textarea
            rows={2}
            value={settings.seo_keywords}
            onChange={(e) => setSettings({ ...settings, seo_keywords: e.target.value })}
            className="w-full px-4 py-2.5 text-xs bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-zinc-950 text-zinc-900"
          />
        </div>
      </div>

      {/* Save Button */}
      <div className="sticky bottom-6 z-20 flex justify-end">
        <button
          type="submit"
          disabled={isSaving}
          className="px-6 py-3 bg-zinc-950 text-white hover:bg-zinc-800 text-xs font-semibold rounded-2xl shadow-elevated flex items-center gap-2 transition-all active:scale-95 disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>{isSaving ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}</span>
        </button>
      </div>
    </form>
  );
};
