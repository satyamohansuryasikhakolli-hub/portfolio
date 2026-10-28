# 🌌 Satya Mohan Surya — "Neural Cosmos" 3D Developer Portfolio

A futuristic, award-worthy 3D developer portfolio interface built for **Satya Mohan Surya** (CSE Student | Aspiring AI Engineer & Software Developer). Powered by **React 18**, **Three.js**, **React Three Fiber**, **Framer Motion**, **Lenis**, and **Tailwind CSS**.

---

## ✨ Features & Architecture

- **Neural Cosmos Aesthetic**: Dark cinematic palette (`#05060A`, `#12141C`) illuminated by electric blue (`#00D4FF`) and synapsing purple (`#8B5CF6`) gradients.
- **Interactive 3D Hero Scene**: Real-time rotating distorted wireframe icosahedron with pulsating core and a dynamic 2,200-particle starfield reacting to cursor parallax.
- **Holographic About Artifact**: Interactive 3D Torus Knot with holographic shader and mouse tracking.
- **Glassmorphism UI**: High-blur panels with glowing borders, specular glare, and an offline SVG fractal noise texture.
- **3D Tilt Project Cards**: Physics-based interactive tilt tracking with specular light reflection and tech badges.
- **Interactive Capability Matrix**: Category-filtered skill pills with dynamic proficiency telemetry bars.
- **Transmission Port (Contact)**: Glowing form with instant `mailto:` fallback, Formspree webhook readiness, copy-to-clipboard email, and celebratory particle confetti.
- **Adaptive Performance**:
  - Automatically downsizes particle count and disables postprocessing on mobile devices.
  - Automatically pauses rendering when the browser tab is hidden to conserve GPU/battery.
  - Respects `prefers-reduced-motion` with accessible fallbacks.
  - Custom trailing glowing cursor on desktop, automatically disabled on touch devices.

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v18.0 or later recommended)
- npm (v9.0 or later)

### 1. Install Dependencies
```bash
npm install --legacy-peer-deps
```

### 2. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production
```bash
npm run build
```
The compiled, chunk-optimized static bundle will be generated in the `dist/` directory.

### 4. Preview Production Build Locally
```bash
npm run preview
```

---

## ✏️ How to Edit Content (Single Source of Truth)

All personal information, bio, skills, projects, and contact links live in **ONE single file**:

📍 **[`src/data/content.js`](src/data/content.js)**

### 1. Update Bio & Details
Open `src/data/content.js` and edit `personalInfo`:
```javascript
export const personalInfo = {
  name: "Satya Mohan Surya",
  title: "CSE Student | Aspiring AI Engineer & Software Developer",
  bio: [
    "Your personalized bio paragraph 1...",
    "Your personalized bio paragraph 2...",
  ],
  status: "Available for internships & AI/software development collaborations",
  location: "Hyderabad, India",
  education: {
    degree: "B.Tech in Computer Science and Engineering",
    institution: "Your College / University Name",
    graduation: "Expected 2026"
  }
};
```

### 2. Update Skills Matrix
Edit `skillsData` to include your actual programming languages and frameworks:
```javascript
export const skillsData = [
  {
    category: "AI & Machine Learning",
    description: "Core algorithms, neural networks, and data frameworks",
    skills: [
      { name: "Python", level: 90, tag: "Primary" },
      { name: "PyTorch", level: 85, tag: "AI/ML" },
      { name: "Scikit-Learn", level: 80, tag: "Data" },
    ]
  },
  // Add or customize more categories...
];
```

### 3. Update Projects
Replace the placeholder projects in `projectsData` with your real GitHub repositories and live deployments:
```javascript
export const projectsData = [
  {
    id: "project-1",
    title: "Autonomous AI Vision Agent",
    description: "A real-time computer vision system using YOLO and Transformers for automated object detection.",
    tech: ["Python", "PyTorch", "FastAPI", "Docker"],
    github: "https://github.com/yourusername/vision-agent",
    live: "https://vision-agent.demo.com",
    isPlaceholder: false, // Set to false once filled!
    accentColor: "#00D4FF"
  },
  // Add more projects...
];
```

### 4. Update Contact & Socials
Edit `contactInfo`:
```javascript
export const contactInfo = {
  email: "satyamohansurya@example.com",
  github: "https://github.com/satyamohansurya",
  linkedin: "https://linkedin.com/in/satyamohansurya",
  twitter: "https://twitter.com/satyamohansurya",
  formspreeEndpoint: "https://formspree.io/f/your_form_id" // Optional: paste Formspree endpoint here!
};
```

---

## 🎨 How to Swap Colors & Theme

The color tokens are centralized in **[`tailwind.config.js`](tailwind.config.js)** and **[`src/index.css`](src/index.css)**:

### Color Palette Tokens (`tailwind.config.js`):
- `cosmos-950`: Base void background (`#05060A`)
- `cosmos-900`: Charcoal card background (`#0B0D14`)
- `cosmos-850`: Panel base (`#12141C`)
- `neon.blue`: Primary electric cyan accent (`#00D4FF`)
- `neon.purple`: Synaptic violet accent (`#8B5CF6`)

To customize:
1. Change hex codes in `tailwind.config.js` under `theme.extend.colors`.
2. In `src/components/three/ParticleField.jsx` and `NeuralCoreMesh.jsx`, change `THREE.Color` hex strings to match your new palette.

---

## 🚢 Deployment Guide

### Deploying to Vercel (Recommended)
1. Push your repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "feat: Neural Cosmos 3D portfolio"
   git remote add origin https://github.com/<your-username>/portfolio.git
   git push -u origin main
   ```
2. Go to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import your `portfolio` repository.
4. Framework Preset will auto-detect as **Vite**.
5. Build Command: `npm run build`
6. Output Directory: `dist`
7. Click **Deploy**.

### Deploying to Netlify
1. Log into [Netlify](https://www.netlify.com) and click **"Add new site"** &rarr; **"Import an existing project"**.
2. Select your GitHub repository.
3. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
4. Click **Deploy Site**.

---

## 📂 Project Structure

```
portfolio/
├── dist/                     # Optimized production bundle
├── public/
│   └── favicon.svg           # Cyber geometric glowing SVG favicon
├── src/
│   ├── components/
│   │   ├── sections/
│   │   │   ├── AboutSection.jsx      # Glass bio panel & 3D holographic artifact
│   │   │   ├── ContactSection.jsx    # Glowing form & magnetic social links
│   │   │   ├── HeroSection.jsx       # Scramble text reveal, CTAs & scroll indicator
│   │   │   ├── ProjectsSection.jsx   # 3D tilt cards with specular reflection
│   │   │   └── SkillsSection.jsx     # Matrix pills with proficiency bars
│   │   ├── three/
│   │   │   ├── AboutArtifact.jsx     # 3D Torus knot artifact with mouse response
│   │   │   ├── Effects.jsx           # Postprocessing Bloom, Aberration & Vignette
│   │   │   ├── NeuralCoreMesh.jsx    # Distorted wireframe icosahedron & pulse core
│   │   │   ├── NeuralScene.jsx       # R3F Canvas wrapper with tab visibility guard
│   │   │   └── ParticleField.jsx     # 2200 instanced particles with parallax
│   │   └── ui/
│   │       ├── Footer.jsx            # Cyber telemetry footer & ascend button
│   │       ├── GlowingCursor.jsx     # Desktop spring-physics glowing pointer
│   │       ├── Navbar.jsx            # Sticky glass navbar with scrollspy
│   │       ├── PageLoader.jsx        # Cinematic system bootstrap loader
│   │       ├── ScrambleText.jsx      # Futuristic decode text effect
│   │       └── TiltCard.jsx          # Mouse-tracked 3D card tilt & glare
│   ├── data/
│   │   └── content.js        # ⭐ Single source of truth for all content
│   ├── App.jsx               # Root layout & Lenis smooth scrolling
│   ├── index.css             # Tailwind directives, noise texture & glass tokens
│   └── main.jsx              # Application entry point
├── index.html                # SEO metadata, typography, and Open Graph tags
├── package.json              # Dependencies and build scripts
├── postcss.config.js         # PostCSS configuration
├── tailwind.config.js        # Neural Cosmos color & animation tokens
├── vite.config.js            # Vite configuration with chunk splitting
└── README.md                 # Complete documentation & instructions
```

---

## 📜 License
MIT &copy; 2026 [Satya Mohan Surya](https://github.com).
