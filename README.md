# SARTHAK | Portfolio & Speculative Universe

This is a production-grade, immersive React + TypeScript + Vite portfolio platform built for **Sarthak** — Computer Science Engineer & Data Scientist (IBM Specialization) at K.R. Mangalam University.

The design implements Sarthak's signature **Cosmic Slate Theme** (deep purples, neon magentas, bright cyans, and warm amber highlights) across **11 dedicated, interactive page configurations**.

---

## 🚀 Setup & Execution

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Boot Development Environment**:
   ```bash
   npm run dev
   ```
   *The server runs at port `3000` under `http://localhost:3000`.*

3. **Production Compilation**:
   ```bash
   npm run build
   ```

---

## 🎥 Scroll-Driven Frame Animation (Hero Section)

The Home hero section features a scroll scrubbing Canvas core. If images are stored in the frame folder, they are drawn on-canvas relative to scroll progress. If empty, the canvas renders an interactive generative orbital particle network.

To feed your custom framed video clip:
1. Extract your video sequence to `.webp` or `.jpg` frames (e.g. using ffmpeg: `ffmpeg -i video.mp4 -vf scale=1280:-1 -q:v 80 public/frames/frame_%03d.webp`).
2. Drop all frames in `public/frames/` named exactly `frame_001.webp` through `frame_120.webp`.
3. In `/src/components/home/HeroSection.tsx` modify:
   ```typescript
   const TOTAL_FRAMES = 120 // Change this number to match your actual frames count.
   ```

---

## 🎨 Modifying Assets & Media Directory

All physical graphics practice slots, project galleries, stage voice tracks, and book covers represent graceful visual placeholders showing exactly where files belong:

```text
public/
├── frames/
│   ├── frame_001.webp => frame scroll animation sequence
│   └── ...
├── images/
│   ├── sarthak-main.jpg => Main hero avatar portrait
│   ├── about/
│   │   ├── photo-1.jpg through photo-6.jpg => About masonry snapshots
│   ├── projects/
│   │   ├── orbit-thumb.jpg => Project card thumbnails
│   │   ├── [id]/
│   │   │   ├── img-1.jpg through img-6.jpg => Behind the scenes images
│   ├── art/
│   │   ├── artwork-1.jpg through artwork-12.jpg => Gallery sculptures/paintings
│   ├── book/
│   │   ├── cover.jpg => Cover overlay graphics
│   │   └── author-photo.jpg => Round book author bio
│   └── music/
│       ├── perf-1.jpg through perf-6.jpg => Live performance stages
├── videos/
│   ├── [project-id]-demo.mp4 => Dedicated demo files
│   ├── art-process.mp4 => Physical sculpture timelapse
│   └── performance.mp4 => Live stage voice performance
└── audio/
    ├── track-1.mp3 => Indian raag alaap recording
    └── track-2.mp3 => Narrative copywriting audio clip
```

When you drop real assets corresponding to these directories, they **automatically fade into view**, replacing the dark visual placeholder cards instantly!

---

## ⚙️ Modifying Core Databases

- **Projects Data**: Modify files directly inside `/src/data/projects.ts` to add features, repositories, and adjust deployment statuses.
- **Chronological Milestones**: Adjust timelines or edit milestones inside `/src/data/journey.ts`.
- **Artworks Catalog**: Define mediums, accolades, and custom descriptions in `/src/data/artworks.ts`.

*All types are declared and guarded in `/src/types.ts`.*
