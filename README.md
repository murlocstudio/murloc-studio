# Murloc Studio (murlocstudio) - Web & Headless CMS

> **Murloc Studio** is an ultra-clean, minimal, editorial one-page music studio landing website and headless CMS admin panel built with Next.js (App Router), TypeScript, Tailwind CSS, and Supabase.

---

## 🌟 Key Features

### 1. Landing Page Experience
- **Editorial White Aesthetic**: Clean off-white palette, deep charcoal typography, subtle borders, soft shadows, and warm recording red indicators.
- **Section Anchors**: Smooth navigation across `#studios`, `#equipment`, `#services`, `#catalog`, `#story`, `#location`, and `#contact`.
- **3 Recording Studios**:
  - **Studio A**: Main Live Room & 32-Channel SSL 4000E console, Yamaha C7 Concert Grand.
  - **Studio B**: Dolby Atmos 7.1.4 & Vocal Suite (Sony C-800G, Tube-Tech CL1B).
  - **Studio C**: Mixing, Mastering & 4K Multi-camera Broadcast Podcast Studio.
  - Interactive room switcher, acoustic parameters matrix ($RT60$, isolation, monitoring), and gear lists.
- **Categorized Equipment Inventory**: Microphones, Outboard & Preamps, Monitoring, Instruments & Amplifiers, with category filters, real-time search, and daily rental tags.
- **Services & Rental**: Recording, Mixing, Mastering, Podcast, Rehearsals, and Gear Rental with deliverables breakdown and pricing info.
- **Client Catalog & Audio Player**: Featured albums/singles, release years, genre badges, embedded waveform audio preview bar, and Spotify/Apple Music streaming links.
- **Studio Story & Architecture**: Acoustic philosophy (box-in-a-box construction, floating floors, QRD diffusers) and engineering team bios.
- **Location, Hours & Booking Inquiry**: Responsive Google Maps iframe, WhatsApp quick direct chat, working hours, and real-time reservation form.

### 2. Dynamic Headless CMS Admin Panel (`/admin`)
- **Authentication**: Supabase Auth with email & password (includes immediate demo preview mode).
- **Global Settings & SEO Editor**: Update headlines, hero copy, philosophy narrative, address, working hours, phone, WhatsApp, and meta keywords without touching code.
- **Studio Rooms CRUD**: Manage room specs, acoustic parameters, hourly rates, and photos.
- **Equipment Inventory CRUD**: Add, edit, delete, assign gear to rooms, and configure rental status with daily prices.
- **Services CRUD**: Edit service titles, descriptions, deliverables, icons, and pricing.
- **Artist Portfolio CRUD**: Add releases, cover artwork, audio preview URLs, and streaming links.
- **Inquiries Inbox**: Review incoming client reservations, update status (`new`, `in_review`, `confirmed`), and contact clients via one-click WhatsApp/Phone.

### 3. SEO & Performance
- **Brand Keywords**: Target keyword `murlocstudio` and `Murloc Studio` throughout metadata.
- **JSON-LD Schema**: Structured data for `LocalBusiness`, `MusicVenue`, and `ProfessionalService` with geo coordinates, opening hours, and price ranges.
- **Dynamic Sitemap & Robots**: Generated dynamically via `sitemap.ts` and `robots.ts`.
- **Image Optimization**: Next.js `<Image>` component with AVIF/WebP support and lazy loading.

---

## 🏗️ File Architecture

```
├── supabase/
│   └── schema.sql                   # Complete PostgreSQL schema, RLS policies, Storage buckets & seed data
├── src/
│   ├── app/
│   │   ├── admin/
│   │   │   ├── components/          # CMS tab editors (Settings, Rooms, Equipment, Services, Portfolio, Inquiries)
│   │   │   ├── login/               # Admin login portal
│   │   │   └── page.tsx             # Master Admin CMS dashboard
│   │   ├── api/
│   │   │   └── contact/route.ts     # Reservation API endpoint
│   │   ├── globals.css              # Editorial aesthetic variables & custom scrollbars
│   │   ├── layout.tsx               # Root layout with JSON-LD schema & SEO metadata
│   │   ├── page.tsx                 # Home Page SSR entrypoint
│   │   ├── robots.ts                # Dynamic robots.txt
│   │   └── sitemap.ts               # Dynamic sitemap.xml
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx           # Editorial header with live ON AIR indicator & mobile drawer
│   │   │   ├── Footer.tsx           # Studio footer with legal & quick links
│   │   │   └── AudioPlayerBar.tsx   # Floating preview audio player
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx      # Impactful headline & visual showcase
│   │   │   ├── StudiosSection.tsx   # 3 Recording Studios with acoustic specs matrix
│   │   │   ├── EquipmentSection.tsx # Filterable gear inventory & rental tags
│   │   │   ├── ServicesSection.tsx  # Production services with deliverables & pricing
│   │   │   ├── PortfolioSection.tsx # Client release catalog & preview triggers
│   │   │   ├── StorySection.tsx     # Brand story & engineering team bios
│   │   │   └── LocationContactSection.tsx # Google Map, WhatsApp quick link & booking form
│   │   ├── seo/
│   │   │   └── JsonLd.tsx           # Schema.org structured data component
│   │   └── OnePageStudioClient.tsx  # Client shell managing sections & audio state
│   ├── lib/
│   │   ├── data/
│   │   │   ├── mock-data.ts         # High quality baseline seed data
│   │   │   ├── studio-api.ts        # Server-side Supabase query layer
│   │   │   └── client-api.ts        # Client-side mutation helper
│   │   ├── supabase/
│   │   │   ├── client.ts            # Browser Supabase client
│   │   │   └── server.ts            # Server Supabase client (SSR)
│   │   └── utils.ts                 # Utility functions (cn, formatters)
│   └── types/
│       └── database.ts              # TypeScript domain types & DB interfaces
├── .env.example                     # Environment variables template
├── next.config.mjs                  # Next.js image domain whitelist & optimizations
├── tailwind.config.ts               # Custom editorial theme palette
├── tsconfig.json                    # Strict TypeScript configuration
└── package.json
```

---

## 🚀 Getting Started

### 1. Installation
```bash
npm install
```

### 2. Environment Configuration
Create a `.env.local` file from `.env.example`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_STUDIO_PHONE=+90 212 555 0199
NEXT_PUBLIC_STUDIO_WHATSAPP=905300000000
NEXT_PUBLIC_STUDIO_EMAIL=info@murlocstudio.com
```

### 3. Supabase Setup
1. Open your Supabase Dashboard at [supabase.com](https://supabase.com).
2. Go to **SQL Editor** and run the contents of [`supabase/schema.sql`](file:///supabase/schema.sql).
3. This creates all tables (`site_settings`, `studio_rooms`, `equipment`, `services`, `portfolio_artists`, `contact_inquiries`), configures Row Level Security (RLS), sets up the `studio-assets` storage bucket, and seeds initial data.
4. Create an admin user in **Supabase Dashboard > Authentication > Users**.

### 4. Run Locally
```bash
npm run dev
```
- Main Landing Site: `http://localhost:3000`
- Admin CMS Dashboard: `http://localhost:3000/admin`
- Admin Login: `http://localhost:3000/admin/login`

### 5. Deployment to Vercel
1. Push this repository to GitHub/GitLab.
2. Import the project in [Vercel](https://vercel.com).
3. Add the environment variables from `.env.example`.
4. Deploy!
