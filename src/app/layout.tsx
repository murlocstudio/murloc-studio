import type { Metadata, Viewport } from 'next';
import './globals.css';
import { JsonLd } from '@/components/seo/JsonLd';
import { initialSiteSettings } from '@/lib/data/mock-data';

export const viewport: Viewport = {
  themeColor: '#0F1012',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://murlocstudio.com'),
  title: {
    default: 'Murloc Music Studio | Ankara Kayıt, Prova & Prodüksiyon Stüdyosu',
    template: '%s | Murloc Music Studio',
  },
  description:
    'Murloc Music Studio (@studiomurloc) - Ankara Çankaya Kavaklıdere Tunus Caddesi merkezli profesyonel ses kayıt, grup provası, canlı hücum kayıt ve analog miksaj stüdyosu.',
  keywords: [
    'studiomurloc',
    'murlocstudio',
    'Murloc Music Studio',
    'ankara müzik stüdyosu',
    'tunus caddesi prova stüdyosu',
    'kavaklıdere ses kayıt',
    'hücum kayıt ankara',
    'ankara prova stüdyosu',
    'vokal kaydı ankara',
  ],
  authors: [{ name: 'Murloc Music Studio', url: 'https://murlocstudio.com' }],
  creator: 'Murloc Music Studio',
  publisher: 'Murloc Music Studio',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: 'https://murlocstudio.com',
    siteName: 'Murloc Music Studio',
    title: 'Murloc Music Studio | Ankara Tunus Caddesi Müzik Stüdyosu',
    description:
      'Ankara Tunus Caddesi’nde canlı hücum kayıt, grup provaları, analog miksaj ve profesyonel donanım parkuru.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&h=630&q=85',
        width: 1200,
        height: 630,
        alt: 'Murloc Music Studio Ankara',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Murloc Music Studio | Ankara Kayıt & Prova',
    description:
      'Ankara Tunus Caddesi’nde canlı hücum kayıt, grup provaları ve analog ses stüdyosu.',
    images: ['https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&h=630&q=85'],
  },
  alternates: {
    canonical: '/',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="scroll-smooth">
      <head>
        <JsonLd settings={initialSiteSettings} />
      </head>
      <body className="min-h-screen bg-[#0F1012] text-[#FAF8F5] antialiased selection:bg-[#E26D4B] selection:text-white">
        {children}
      </body>
    </html>
  );
}
