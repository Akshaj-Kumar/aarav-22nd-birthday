# 🎂 The Birthday Legend — Aarav's 22nd Birthday Experience

A cinematic, futuristic, interactive birthday website built for **Aarav Sharma (Aaru)** on his 22nd milestone. Designed with dark glassmorphism, neon lighting, 3D flip cards, realistic interactive birthday cake candles, an offline Web Audio synthesizer, and cinematic fireworks.

---

## ⚡ Quick Start

### 1. Install Dependencies
Open your terminal inside the `birthday1` directory and run:
```bash
npm install
```

### 2. Run Locally in Development Mode
```bash
npm run dev
```
Open your browser at the local URL printed in the terminal (usually `http://localhost:5173/`).

### 3. Build for Production
To create an optimized production build:
```bash
npm run build
```
Preview the production build locally:
```bash
npm run preview
```

---

## 🛠️ How to Customize Personal Details (Single File Config)

All personal details, messages, compliments, and gallery photos are organized in **one configuration file**:
👉 `src/data/birthdayConfig.js`

### How to Change the Birthday Person's Name
Open `src/data/birthdayConfig.js` and edit the `person` object:
```javascript
person: {
  fullName: "Aarav Sharma", // Change to any name
  nickname: "Aaru",         // Change nickname
  // ...
}
```

### How to Change the Age
In `src/data/birthdayConfig.js`:
```javascript
person: {
  age: 22,               // Change to 23, 25, etc.
  milestone: "Level 22", // Change to Level 23, etc.
  birthDate: "15 November",
  // ...
}
```

### How to Edit Birthday Messages
In `src/data/birthdayConfig.js`, locate `mainMessage`:
```javascript
mainMessage: {
  heading: "A MESSAGE FOR THE LEGEND.",
  greeting: "Bro,",
  body: [
    "Another year older, another year wiser... well, let's not get ahead of ourselves! 😂",
    "Keep chasing your dreams, making crazy memories...",
    // Add or modify paragraphs here
  ],
  signoff: "Your Best Friend Forever ⚡"
}
```

### How to Replace Photographs
1. Save your personal JPEG, PNG, or WebP photos into the `public/images/` directory.
2. In `src/data/birthdayConfig.js`, update the `gallery` array:
```javascript
gallery: [
  {
    id: 1,
    title: "Trip to the Mountains",
    category: "Adventures",
    tag: "Epic Roadtrip",
    description: "Aaru conquering the hairpin bends.",
    src: "/images/your-photo.jpg", // path inside public/images/
    fallback: "/images/car-supercar.svg",
    aspect: "wide"
  },
  // ...
]
```

### How to Add Background Music (MP3)
1. Copy your desired audio track (MP3 format) into `public/audio/`.
2. Name it `birthday-beats.mp3`:
   ```
   public/audio/birthday-beats.mp3
   ```
3. The floating music player will automatically detect and play your file with real-time volume controls!
4. If no MP3 is provided, the website automatically falls back to its built-in futuristic Web Audio API synthesizer.

---

## 🎨 Key Features & Sections

1. **Cinematic Opening Gift Box**: Interactive 3D gift box with particle explosions and transition to homepage.
2. **Hero Section**: Glowing neon typography, floating particles, and interactive "Let's Make Some Noise!" button.
3. **Cinematic Photo Gallery**: Categorized masonry-style grid with 3D tilt effects and full-screen lightbox navigation.
4. **Heartfelt Birthday Message**: Scrolling quote reveal card with glassmorphism styling.
5. **22 Legendary Reasons**: 22 interactive 3D flip cards revealing hilarious and touching compliments.
6. **Interactive Birthday Cake**: 3-tier dark cake with 22 animated candles. Clicking "Blow the Candles" generates smoke puffs, sound effects, and confetti.
7. **Funny Friendship Quiz**: 6-question interactive quiz testing how well friends know Aarav.
8. **Epic Fireworks Experience**: Interactive canvas where visitors can tap anywhere to detonate colorful rockets.
9. **Final Secret Surprise**: High-security letter vault revealing the closing tribute and replay button.
10. **Futuristic Sound Engine**: Web Audio synthesizer playing sound effects (clicks, blow whoosh, fanfares) and upbeat background beats with zero external dependencies.

---

## 📱 Responsive & Accessible
- Fully responsive across mobile (320px, 375px, 390px), tablets, and 4K desktop screens.
- Supports `prefers-reduced-motion` for accessibility.
- Zero broken images with automatic SVG vector fallbacks.
