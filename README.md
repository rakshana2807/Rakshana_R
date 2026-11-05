# 🌌 Rakshana R. — Cinematic 3D Personal Portfolio

> **"I DESIGN THE VISION. I CODE THE EXPERIENCE."**

A premium, interactive personal portfolio website for **Rakshana R.** — B.Tech Information Technology student, UI/UX Designer, and Frontend Developer. Built with cutting-edge 3D web technologies, cinematic lighting, and modern motion design.

---

## ⚡ Tech Stack

- **Framework**: React 18 with TypeScript & Vite
- **3D Graphics & WebGL**: Three.js, `@react-three/fiber`, `@react-three/drei`
- **Styling**: Tailwind CSS & Modern CSS3 Glassmorphism
- **Smooth Scrolling**: Lenis (`lenis`)
- **Icons**: Lucide React
- **Sound Design**: Procedural Web Audio API Synthesizer (Zero external dependencies)

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Production Build
```bash
npm run build
```
Creates an optimized, production-ready bundle in `dist/`.

### 4. Preview Production Build
```bash
npm run preview
```

---

## 📁 Project Structure

```
rakshana/
├── public/
│   ├── rr-icon.svg             # Monogram Favicon
│   └── resume.pdf              # Upload slot for your official PDF resume
├── src/
│   ├── 3d/
│   │   ├── HeroScene.tsx        # React Three Fiber 3D core, rings & particle galaxy
│   │   └── BackgroundCanvas.tsx # Ambient interactive canvas particle network
│   ├── data/
│   │   └── portfolioData.ts     # Centralized, strictly accurate portfolio data store
│   ├── layout/
│   │   ├── Navbar.tsx           # Floating glass navbar with sound toggle & mobile drawer
│   │   └── Footer.tsx           # Footer with social links & back-to-top control
│   ├── modals/
│   │   ├── ProjectModal.tsx     # Deep-dive project architecture inspector
│   │   ├── CertificateModal.tsx # High-resolution credential inspector
│   │   └── ResumeModal.tsx      # Printable executive CV viewer
│   ├── sections/
│   │   ├── Hero.tsx             # Cinematic hero with animated typography & 3D canvas
│   │   ├── About.tsx            # Interactive 3D profile visual & design philosophy
│   │   ├── Skills.tsx           # 5 categories, interactive filters & proficiency tags
│   │   ├── Projects.tsx         # 6 featured projects with 3D tilt & live URLs
│   │   ├── Certifications.tsx   # 9 certifications, NPTEL Top 5% & LeetCode badges
│   │   ├── Experience.tsx       # Thiranex EduTech UI/UX internship timeline
│   │   ├── Education.tsx        # Bannari Amman Institute of Technology B.Tech IT
│   │   ├── ResumeSection.tsx    # Explore My Resume CTA & upload target note
│   │   └── Contact.tsx          # Contact form, direct mailto/tel, and copy triggers
│   ├── ui/
│   │   ├── CustomCursor.tsx     # Trailing cursor with magnetic blend
│   │   ├── Preloader.tsx        # RR monogram intro loader (0-100%)
│   │   └── SoundEffects.ts      # Web Audio API futuristic sound synthesizer
│   ├── App.tsx                  # Root application orchestrator
│   ├── main.tsx                 # Entry point with Lenis smooth scroll
│   └── index.css                # Atmospheric glow utilities & typography
├── tailwind.config.js           # Theme palette: space black, electric violet, cyan
├── vite.config.ts               # Bundler config with code splitting & symlink handling
└── package.json
```

---

## ✏️ Updating Portfolio Information

All content (projects, certifications, bio, contact numbers, social handles) is cleanly separated in:
👉 [`src/data/portfolioData.ts`](./src/data/portfolioData.ts)

Simply edit this single file to update any text, links, or project details across the entire portfolio.

---

## 📄 Uploading Official Resume PDF

Place your exported resume PDF into:
👉 `public/resume.pdf`

Both the **Download Resume** buttons in the Hero, Navbar, and Resume Section will immediately download this file without requiring any code changes.

---

## 🌐 Deploy to Vercel

```bash
npm run build
```
Connect your repository to [Vercel](https://vercel.com/) or run:
```bash
npx vercel
```
Vite output directory: `dist`.
