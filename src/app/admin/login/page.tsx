'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Disc, Lock, Mail, ArrowRight, ShieldAlert, Sparkles, ArrowLeft } from 'lucide-react';
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isConfigured = isSupabaseConfigured();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    try {
      if (!isConfigured) {
        // Demo mode fallback: simulate instant successful admin login
        sessionStorage.setItem('murloc_admin_auth', 'demo_admin_session');
        router.push('/admin');
        return;
      }

      const supabase = createClient();
      if (!supabase) throw new Error('Supabase client initialize failed');

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.session) {
        router.push('/admin');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Giriş başarısız. Lütfen bilgilerinizi kontrol ediniz.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoAccess = () => {
    sessionStorage.setItem('murloc_admin_auth', 'demo_admin_session');
    router.push('/admin');
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background visual ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(220,38,38,0.15),transparent_50%)] pointer-events-none" />
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors mb-6 font-mono"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Ana Sayfaya Dön</span>
        </Link>

        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-white text-zinc-950 flex items-center justify-center font-bold shadow-lg">
            <Disc className="w-5 h-5 text-red-600 animate-spin" style={{ animationDuration: '6s' }} />
          </div>
          <h2 className="text-2xl font-extrabold text-white font-display tracking-tight uppercase">
            Murloc CMS
          </h2>
        </div>
        <p className="text-center text-xs text-zinc-400 font-mono">
          Yönetici & İçerik Yönetim Paneli
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
        <div className="bg-zinc-900/90 border border-zinc-800 backdrop-blur-xl py-8 px-6 shadow-2xl rounded-3xl sm:px-10 space-y-6">
          {!isConfigured && (
            <div className="p-3.5 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-start gap-3">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div className="text-xs text-amber-200">
                <span className="font-bold">Önizleme Modu: </span>
                Supabase bilgileri henüz bağlanmadığı için doğrudan demo yönetici girişi yapabilirsiniz.
              </div>
            </div>
          )}

          {errorMessage && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-300 rounded-xl text-xs flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold mb-1.5">
                Yönetici E-Posta
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@murlocstudio.com"
                  className="w-full pl-10 pr-4 py-2.5 text-xs bg-zinc-950 border border-zinc-800 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold mb-1.5">
                Parola
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-2.5 text-xs bg-zinc-950 border border-zinc-800 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-semibold text-xs rounded-xl shadow-lg transition-colors flex items-center justify-center gap-2 active:scale-98 disabled:opacity-50"
            >
              <span>{loading ? 'Giriş Yapılıyor...' : 'Yönetim Paneline Giriş'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          {!isConfigured && (
            <button
              type="button"
              onClick={handleDemoAccess}
              className="w-full py-2.5 px-4 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-medium text-xs rounded-xl transition-colors border border-zinc-700/60"
            >
              Hızlı Demo Yönetici Olarak Devam Et
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
