'use client';

import { useEffect, useRef } from 'react';

export default function WarpBackground() {
  const starsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = starsRef.current;
    if (!container) return;
    for (let i = 0; i < 80; i++) {
      const s = document.createElement('div');
      const sz = Math.random() * 2 + 0.5;
      s.className = 'absolute rounded-full bg-white';
      s.style.cssText = `width:${sz}px;height:${sz}px;top:${Math.random() * 100}%;left:${Math.random() * 100}%;animation:twinkle ${Math.random() * 3 + 2}s ease-in-out infinite alternate;animation-delay:${Math.random() * 4}s;`;
      container.appendChild(s);
    }
    return () => { container.innerHTML = ''; };
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden" style={{ background: 'radial-gradient(ellipse at 50% 40%, #1a0040 0%, #0d0021 50%, #050010 100%)' }}>
      {/* Streaks layer 1 */}
      <div
        className="absolute"
        style={{
          inset: '-50%',
          background: 'conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(0,229,255,0.04) 2deg, transparent 4deg, transparent 18deg, rgba(224,64,251,0.04) 20deg, transparent 22deg, transparent 42deg, rgba(180,80,255,0.04) 44deg, transparent 46deg, transparent 68deg, rgba(0,229,255,0.03) 70deg, transparent 72deg, transparent 95deg, rgba(224,64,251,0.04) 97deg, transparent 99deg, transparent 125deg, rgba(0,229,255,0.03) 127deg, transparent 129deg, transparent 156deg, rgba(180,80,255,0.04) 158deg, transparent 160deg, transparent 190deg, rgba(0,229,255,0.04) 192deg, transparent 194deg, transparent 226deg, rgba(224,64,251,0.03) 228deg, transparent 230deg, transparent 264deg, rgba(180,80,255,0.04) 266deg, transparent 268deg, transparent 300deg, rgba(0,229,255,0.04) 302deg, transparent 304deg, transparent 338deg, rgba(224,64,251,0.04) 340deg, transparent 342deg, transparent 360deg)',
          animation: 'rotateStreaks 120s linear infinite',
        }}
      />
      {/* Streaks layer 2 */}
      <div
        className="absolute"
        style={{
          inset: '-30%',
          background: 'conic-gradient(from 45deg at 50% 50%, transparent 0deg, rgba(0,229,255,0.07) 1deg, transparent 3deg, transparent 35deg, rgba(120,60,255,0.05) 36deg, transparent 38deg, transparent 78deg, rgba(224,64,251,0.07) 79deg, transparent 81deg, transparent 125deg, rgba(0,229,255,0.06) 126deg, transparent 128deg, transparent 175deg, rgba(120,60,255,0.07) 176deg, transparent 178deg, transparent 225deg, rgba(224,64,251,0.05) 226deg, transparent 228deg, transparent 278deg, rgba(0,229,255,0.07) 279deg, transparent 281deg, transparent 335deg, rgba(120,60,255,0.05) 336deg, transparent 338deg, transparent 360deg)',
          animation: 'rotateStreaks 90s linear infinite reverse',
        }}
      />
      {/* Center glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[650px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(100,40,200,0.28) 0%, rgba(60,20,160,0.12) 40%, transparent 70%)' }}
      />
      {/* Stars */}
      <div ref={starsRef} className="absolute inset-0" />
    </div>
  );
}
