# 🚀 Luminary — Next-Gen Student Learning Dashboard

Luminary is a futuristic student learning dashboard built as a premium spatial computing interface. It features a "Dark Cosmos / Liquid Glass" aesthetic, combining deep indigo and purple nebula glows, SVG grain overlays, glassmorphic bento grids, and customized animations.

## 🛠️ Tech Stack & Dependencies

- **Framework**: Next.js 14+ (App Router)
- **Database / BaaS**: Supabase (PostgreSQL)
- **Styling**: Tailwind CSS + custom CSS property system
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Language**: TypeScript (Strict Mode)

---

## 🏛️ Architecture Decisions

### 1. Server/Client Split
- **`DashboardPage`** (`app/dashboard/page.tsx`) is a Next.js Server Component that handles authentication, database connections, and fetches courses directly from Supabase server-side.
- **Bento Components & Tiles** are marked as `"use client"` components. Data flows down from the server-side fetch as TypeScript-typed props. This ensures search engines index pages correctly, initial loads are lightning-fast, and animations run smoothly client-side.

### 2. Why Partial `<Suspense>` Streaming
- Rather than blocking the entire page transition with a route-level `loading.tsx`, using `<Suspense>` allows **partial streaming**.
- The main application layout, Sidebar, Header, and structural Bento wrappers render immediately, while course-specific tiles are deferred until database fetches resolve. This dramatically lowers perceived load time and improves overall responsiveness.

### 3. Animation Architecture
- All entrance animations are handled by **Framer Motion** using custom `variants` and `staggerChildren` on the parent grid container.
- Individual tiles define their `hidden` and `show` states.
- The premium **blur-in entrance** (`filter: blur(8px) -> blur(0px)`) is styled with `will-change: filter` to ensure browser GPU-compositing, keeping animations at a locked 60fps.

### 4. Zero Layout Shift (CLS) Strategy
- To prevent Cumulative Layout Shift, all interactive card hover transitions are limited to GPU-accelerated CSS properties (`transform: scale`, `transform: translate`, `opacity`).
- Changes to layout-triggering properties (`width`, `height`, `margin`, `padding`) are strictly avoided during animations.
- The CSS Bento grid uses fixed `grid-template-areas` and aspect ratios so that grid tiles maintain exact dimensions before and after cards load.

### 5. Dynamic Icon Resolution
- A utility component `DynamicIcon` acts as a resolver. It accepts an `icon_name` string field stored in the Supabase PostgreSQL database, imports the Lucide icon namespace dynamically, and falls back to a default `BookOpen` icon if the database key doesn't match an active icon.

---

## 🚀 Setup & Launch

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yashchaudhari11/Next-Gen.git
   cd Next-Gen
   ```

2. **Install packages**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Copy `.env.example` to `.env.local` and add your Supabase credentials:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   ```

4. **Database Schema & Seed**:
   Run the following commands in your Supabase SQL editor:
   ```sql
   CREATE TABLE courses (
     id          uuid         PRIMARY KEY DEFAULT gen_random_uuid(),
     title       text         NOT NULL,
     progress    integer      NOT NULL CHECK (progress >= 0 AND progress <= 100),
     icon_name   text         NOT NULL,
     created_at  timestamptz  DEFAULT now()
   );

   INSERT INTO courses (title, progress, icon_name) VALUES
     ('Advanced React Patterns',      75, 'Code2'),
     ('System Design Fundamentals',   42, 'Server'),
     ('TypeScript Mastery',           88, 'FileCode'),
     ('UI/UX Principles',             31, 'Palette');
   ```

5. **Run Development Server**:
   ```bash
   npm run dev
   ```
   *Note: If no Supabase environment variables are configured, click **"Explore Demo Mode"** on the database offline screen to load pre-seeded mock course details.*
