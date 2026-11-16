const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'public', 'images');

const svgs = {
  'gaming-setup.svg': `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
  <rect width="800" height="600" fill="#050811"/>
  <circle cx="400" cy="300" r="250" fill="#8B5CF6" opacity="0.15" filter="blur(60px)"/>
  <!-- Curved Ultrawide Monitor -->
  <path d="M 180 180 Q 400 160 620 180 L 600 370 Q 400 350 200 370 Z" fill="#0b0f19" stroke="#8B5CF6" stroke-width="4" filter="drop-shadow(0 0 15px #8B5CF6)"/>
  <!-- Screen Glow Content -->
  <path d="M 200 200 Q 400 185 600 200 L 585 350 Q 400 335 215 350 Z" fill="#111827"/>
  <text x="400" y="270" font-family="'Orbitron', sans-serif" font-size="28" font-weight="bold" fill="#00d2ff" text-anchor="middle" filter="drop-shadow(0 0 8px #00d2ff)">VICTORY ROYALE</text>
  <text x="400" y="305" font-family="'Orbitron', sans-serif" font-size="16" fill="#8B5CF6" text-anchor="middle">AARU CLUTCH MASTER 22</text>
  <!-- Stand & Desk -->
  <polygon points="380,370 420,370 435,460 365,460" fill="#1f2937" stroke="#374151"/>
  <rect x="100" y="460" width="600" height="25" rx="5" fill="#0a0e17" stroke="#007BFF" stroke-width="2"/>
  <!-- RGB Keyboard -->
  <rect x="260" y="445" width="280" height="20" rx="3" fill="#1e293b" stroke="#00d2ff" stroke-width="1.5" filter="drop-shadow(0 0 6px #00d2ff)"/>
  <text x="400" y="540" font-family="'Orbitron', sans-serif" font-size="20" fill="#9ca3af" text-anchor="middle" letter-spacing="3">CYBER GAMING BATTLESTATION</text>
</svg>`,

  'city-neon.svg': `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
  <rect width="800" height="600" fill="#04060c"/>
  <circle cx="200" cy="200" r="180" fill="#007BFF" opacity="0.2" filter="blur(70px)"/>
  <circle cx="600" cy="250" r="180" fill="#ec4899" opacity="0.2" filter="blur(70px)"/>
  <!-- City Skyline Silhouettes -->
  <rect x="60" y="220" width="90" height="380" fill="#090d16" stroke="#007BFF" stroke-width="1.5"/>
  <rect x="180" y="160" width="110" height="440" fill="#0d1322" stroke="#8B5CF6" stroke-width="1.5"/>
  <rect x="320" y="120" width="140" height="480" fill="#090e1a" stroke="#00d2ff" stroke-width="2"/>
  <rect x="490" y="200" width="100" height="400" fill="#0d1424" stroke="#ec4899" stroke-width="1.5"/>
  <rect x="620" y="240" width="120" height="360" fill="#080c14" stroke="#8B5CF6" stroke-width="1.5"/>
  <!-- Tower Spire -->
  <line x1="390" y1="40" x2="390" y2="120" stroke="#00d2ff" stroke-width="3" filter="drop-shadow(0 0 8px #00d2ff)"/>
  <circle cx="390" cy="40" r="6" fill="#fff" filter="drop-shadow(0 0 10px #00d2ff)"/>
  <!-- Windows -->
  <g fill="#00d2ff" opacity="0.6">
    <rect x="340" y="160" width="15" height="15"/>
    <rect x="380" y="160" width="15" height="15"/>
    <rect x="420" y="160" width="15" height="15"/>
    <rect x="340" y="200" width="15" height="15"/>
    <rect x="420" y="200" width="15" height="15"/>
  </g>
  <text x="400" y="550" font-family="'Orbitron', sans-serif" font-size="22" font-weight="bold" fill="#00d2ff" text-anchor="middle" letter-spacing="4">NEON METROPOLIS 3:00 AM</text>
</svg>`,

  'night-sky.svg': `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
  <rect width="800" height="600" fill="#02040a"/>
  <!-- Nebula glow -->
  <ellipse cx="400" cy="280" rx="320" ry="180" fill="#8B5CF6" opacity="0.25" filter="blur(80px)"/>
  <ellipse cx="480" cy="320" rx="200" ry="120" fill="#007BFF" opacity="0.3" filter="blur(60px)"/>
  <!-- Moon / Planet -->
  <circle cx="620" cy="140" r="65" fill="#f8fafc" opacity="0.9" filter="drop-shadow(0 0 25px rgba(0, 210, 255, 0.7))"/>
  <circle cx="600" cy="130" r="62" fill="#02040a"/>
  <!-- Stars -->
  <g fill="#fff">
    <circle cx="120" cy="80" r="2" filter="drop-shadow(0 0 4px #00d2ff)"/>
    <circle cx="240" cy="140" r="3" filter="drop-shadow(0 0 5px #fff)"/>
    <circle cx="360" cy="90" r="1.5"/>
    <circle cx="480" cy="160" r="2.5" filter="drop-shadow(0 0 4px #8B5CF6)"/>
    <circle cx="180" cy="290" r="2"/>
    <circle cx="300" cy="240" r="3" filter="drop-shadow(0 0 6px #fff)"/>
    <circle cx="530" cy="220" r="1.5"/>
    <circle cx="690" cy="280" r="2"/>
    <circle cx="100" cy="420" r="2.5"/>
  </g>
  <!-- Mountain Silhouette -->
  <polygon points="0,600 180,420 340,510 520,380 720,540 800,480 800,600" fill="#050a14"/>
  <text x="400" y="550" font-family="'Orbitron', sans-serif" font-size="22" font-weight="bold" fill="#c084fc" text-anchor="middle" letter-spacing="4">INFINITE COSMIC HORIZON</text>
</svg>`,

  'fireworks-sky.svg': `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
  <rect width="800" height="600" fill="#03060f"/>
  <!-- Central Firework 1 -->
  <circle cx="380" cy="240" r="8" fill="#fff" filter="drop-shadow(0 0 20px #00d2ff)"/>
  <g stroke="#00d2ff" stroke-width="2.5" opacity="0.85">
    <line x1="380" y1="240" x2="380" y2="120"/>
    <line x1="380" y1="240" x2="380" y2="360"/>
    <line x1="380" y1="240" x2="260" y2="240"/>
    <line x1="380" y1="240" x2="500" y2="240"/>
    <line x1="380" y1="240" x2="295" y2="155"/>
    <line x1="380" y1="240" x2="465" y2="325"/>
    <line x1="380" y1="240" x2="465" y2="155"/>
    <line x1="380" y1="240" x2="295" y2="325"/>
  </g>
  <!-- Firework 2 (Purple) -->
  <circle cx="600" cy="180" r="6" fill="#fff" filter="drop-shadow(0 0 15px #8B5CF6)"/>
  <g stroke="#8B5CF6" stroke-width="2" opacity="0.8">
    <line x1="600" y1="180" x2="600" y2="90"/>
    <line x1="600" y1="180" x2="600" y2="270"/>
    <line x1="600" y1="180" x2="510" y2="180"/>
    <line x1="600" y1="180" x2="690" y2="180"/>
    <line x1="600" y1="180" x2="536" y2="116"/>
    <line x1="600" y1="180" x2="664" y2="244"/>
  </g>
  <!-- Firework 3 (Gold) -->
  <circle cx="180" cy="200" r="6" fill="#fff" filter="drop-shadow(0 0 15px #fbbf24)"/>
  <g stroke="#fbbf24" stroke-width="2" opacity="0.8">
    <line x1="180" y1="200" x2="180" y2="120"/>
    <line x1="180" y1="200" x2="180" y2="280"/>
    <line x1="180" y1="200" x2="100" y2="200"/>
    <line x1="180" y1="200" x2="260" y2="200"/>
  </g>
  <text x="400" y="530" font-family="'Orbitron', sans-serif" font-size="24" font-weight="bold" fill="#fff" text-anchor="middle" filter="drop-shadow(0 0 10px #00d2ff)">SKY BURST CELEBRATION</text>
</svg>`,

  'friendship-squad.svg': `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
  <rect width="800" height="600" fill="#040914"/>
  <circle cx="400" cy="260" r="220" fill="#007BFF" opacity="0.2" filter="blur(80px)"/>
  <!-- Silhouette of Friends -->
  <g fill="#0c1524" stroke="#00d2ff" stroke-width="2">
    <!-- Friend 1 -->
    <circle cx="280" cy="280" r="30"/>
    <path d="M 230 420 L 250 330 L 310 330 L 330 420 Z"/>
    <!-- Friend 2 (Aarav Center with Crown Glow) -->
    <circle cx="400" cy="260" r="35" stroke="#fbbf24" stroke-width="3"/>
    <polygon points="380,220 390,235 400,215 410,235 420,220 415,245 385,245" fill="#fbbf24" filter="drop-shadow(0 0 8px #fbbf24)"/>
    <path d="M 345 420 L 365 315 L 435 315 L 455 420 Z" stroke="#fbbf24" stroke-width="2"/>
    <!-- Friend 3 -->
    <circle cx="520" cy="280" r="30"/>
    <path d="M 470 420 L 490 330 L 550 330 L 570 420 Z"/>
  </g>
  <text x="400" y="490" font-family="'Orbitron', sans-serif" font-size="26" font-weight="bold" fill="#00d2ff" text-anchor="middle">THE LEGENDARY BROTHERHOOD</text>
  <text x="400" y="530" font-family="'Montserrat', sans-serif" font-size="16" fill="#9ca3af" text-anchor="middle" letter-spacing="3">RIDE OR DIE SINCE DAY ONE</text>
</svg>`,

  'neon-lights.svg': `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
  <rect width="800" height="600" fill="#020308"/>
  <g filter="blur(2px)">
    <path d="M 100 100 C 300 200, 200 400, 500 500" stroke="#00d2ff" stroke-width="6" fill="none" filter="drop-shadow(0 0 15px #00d2ff)"/>
    <path d="M 700 100 C 500 250, 600 350, 300 520" stroke="#8B5CF6" stroke-width="6" fill="none" filter="drop-shadow(0 0 15px #8B5CF6)"/>
  </g>
  <circle cx="400" cy="300" r="140" fill="none" stroke="#007BFF" stroke-width="3" stroke-dasharray="12 8" filter="drop-shadow(0 0 10px #007BFF)"/>
  <text x="400" y="310" font-family="'Orbitron', sans-serif" font-size="32" font-weight="bold" fill="#fff" text-anchor="middle" filter="drop-shadow(0 0 10px #00d2ff)">LEVEL 22 AESTHETIC</text>
</svg>`,

  'party-cheers.svg': `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
  <rect width="800" height="600" fill="#04060e"/>
  <circle cx="400" cy="280" r="190" fill="#fbbf24" opacity="0.15" filter="blur(60px)"/>
  <!-- Champagne Flutes Clinking -->
  <polygon points="340,320 370,390 350,390 370,440 330,440" fill="#1e293b" stroke="#00d2ff" stroke-width="2"/>
  <polygon points="460,320 430,390 450,390 430,440 470,440" fill="#1e293b" stroke="#8B5CF6" stroke-width="2"/>
  <!-- Clink Sparkle -->
  <polygon points="400,290 405,310 425,315 405,320 400,340 395,320 375,315 395,310" fill="#fbbf24" filter="drop-shadow(0 0 12px #fbbf24)"/>
  <text x="400" y="520" font-family="'Orbitron', sans-serif" font-size="26" font-weight="bold" fill="#fff" text-anchor="middle" filter="drop-shadow(0 0 10px #fbbf24)">CHEERS TO AARAV SHARMA</text>
  <text x="400" y="555" font-family="'Montserrat', sans-serif" font-size="16" fill="#9ca3af" text-anchor="middle" letter-spacing="3">RAISING A GLASS TO 22 YEARS OF GREATNESS</text>
</svg>`
};

for (const [filename, content] of Object.entries(svgs)) {
  fs.writeFileSync(path.join(dir, filename), content.trim());
}

console.log('All gallery SVG fallbacks generated successfully!');
