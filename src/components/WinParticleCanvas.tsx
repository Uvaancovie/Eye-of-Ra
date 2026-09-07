import React, { useEffect, useRef } from 'react';

export type ParticleWinType = 'jackpot' | 'legendary' | 'mega' | 'big' | null;

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  decay: number;
  rotation: number;
  vRot: number;
  type: 'coin' | 'gem' | 'spark' | 'scarab' | 'ring' | 'star';
  shapeType?: number; // for gems (ruby, emerald, sapphire, etc.)
  gravity: number;
  drag: number;
  scaleX: number;
  scaleSpeed: number;
  maxLife: number;
  currentLife: number;
}

interface WinParticleCanvasProps {
  winType: ParticleWinType;
  winAmount?: number;
  jackpotName?: string;
  onAnimationComplete?: () => void;
}

const GEM_COLORS = [
  '#f59e0b', // Topaz Gold
  '#ef4444', // Ruby Red
  '#10b981', // Emerald Green
  '#06b6d4', // Turquoise Blue
  '#a855f7', // Amethyst Purple
  '#ec4899', // Rose Quartz
];

export const WinParticleCanvas: React.FC<WinParticleCanvasProps> = ({
  winType,
  winAmount = 0,
  jackpotName,
  onAnimationComplete,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const waveTimerRef = useRef<NodeJS.Timeout[]>([]);

  useEffect(() => {
    if (!winType) {
      particlesRef.current = [];
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle high DPI
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;
    const centerX = width / 2;
    const centerY = height / 2;

    // Helper to spawn a burst of particles
    const spawnBurst = (
      originX: number,
      originY: number,
      count: number,
      typeIntensity: 'jackpot' | 'legendary' | 'mega' | 'big'
    ) => {
      const newParticles: Particle[] = [];

      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
        let speed = Math.random() * 8 + 3;
        if (typeIntensity === 'jackpot') speed = Math.random() * 14 + 5;
        else if (typeIntensity === 'legendary') speed = Math.random() * 11 + 4;
        else if (typeIntensity === 'mega') speed = Math.random() * 9 + 3;

        // Determine particle kind
        const rand = Math.random();
        let pType: Particle['type'] = 'spark';
        let size = Math.random() * 6 + 3;
        let color = '#fef08a';

        if (rand < 0.45) {
          pType = 'coin';
          size = Math.random() * 9 + 7;
          color = '#fbbf24';
        } else if (rand < 0.75) {
          pType = 'gem';
          size = Math.random() * 8 + 5;
          color = GEM_COLORS[Math.floor(Math.random() * GEM_COLORS.length)];
        } else if (rand < 0.9) {
          pType = 'star';
          size = Math.random() * 7 + 4;
          color = '#fde047';
        } else {
          pType = 'scarab';
          size = Math.random() * 8 + 6;
          color = '#38bdf8';
        }

        const maxLife = Math.floor(Math.random() * 60 + (typeIntensity === 'jackpot' ? 90 : 60));

        newParticles.push({
          x: originX + (Math.random() - 0.5) * 40,
          y: originY + (Math.random() - 0.5) * 40,
          vx: Math.cos(angle) * speed + (Math.random() - 0.5) * 2,
          vy: Math.sin(angle) * speed - Math.random() * 4 - 2,
          size,
          color,
          alpha: 1,
          decay: 1 / maxLife,
          rotation: Math.random() * Math.PI * 2,
          vRot: (Math.random() - 0.5) * 0.25,
          type: pType,
          shapeType: Math.floor(Math.random() * 4),
          gravity: 0.18 + Math.random() * 0.08,
          drag: 0.985,
          scaleX: 1,
          scaleSpeed: Math.random() * 0.15 + 0.05,
          maxLife,
          currentLife: maxLife,
        });
      }

      // Add shockwave ring particle
      newParticles.push({
        x: originX,
        y: originY,
        vx: 0,
        vy: 0,
        size: 10,
        color: typeIntensity === 'jackpot' ? '#f59e0b' : '#38bdf8',
        alpha: 0.9,
        decay: 0.02,
        rotation: 0,
        vRot: 0,
        type: 'ring',
        gravity: 0,
        drag: 1,
        scaleX: 1,
        scaleSpeed: 0,
        maxLife: 50,
        currentLife: 50,
      });

      particlesRef.current.push(...newParticles);
    };

    // Clear previous timers
    waveTimerRef.current.forEach((t) => clearTimeout(t));
    waveTimerRef.current = [];

    // Schedule wave explosions based on win type
    if (winType === 'jackpot') {
      spawnBurst(centerX, centerY, 120, 'jackpot');
      waveTimerRef.current.push(
        setTimeout(() => spawnBurst(centerX - width * 0.25, centerY + 20, 80, 'jackpot'), 350)
      );
      waveTimerRef.current.push(
        setTimeout(() => spawnBurst(centerX + width * 0.25, centerY + 20, 80, 'jackpot'), 700)
      );
      waveTimerRef.current.push(
        setTimeout(() => spawnBurst(centerX, centerY - 40, 100, 'jackpot'), 1100)
      );
      waveTimerRef.current.push(
        setTimeout(() => spawnBurst(centerX - width * 0.15, centerY, 70, 'jackpot'), 1600)
      );
      waveTimerRef.current.push(
        setTimeout(() => spawnBurst(centerX + width * 0.15, centerY, 70, 'jackpot'), 2100)
      );
    } else if (winType === 'legendary') {
      spawnBurst(centerX, centerY, 90, 'legendary');
      waveTimerRef.current.push(
        setTimeout(() => spawnBurst(centerX - width * 0.2, centerY + 20, 60, 'legendary'), 400)
      );
      waveTimerRef.current.push(
        setTimeout(() => spawnBurst(centerX + width * 0.2, centerY + 20, 60, 'legendary'), 800)
      );
      waveTimerRef.current.push(
        setTimeout(() => spawnBurst(centerX, centerY - 30, 70, 'legendary'), 1300)
      );
    } else if (winType === 'mega') {
      spawnBurst(centerX, centerY, 70, 'mega');
      waveTimerRef.current.push(
        setTimeout(() => spawnBurst(centerX - width * 0.18, centerY, 45, 'mega'), 350)
      );
      waveTimerRef.current.push(
        setTimeout(() => spawnBurst(centerX + width * 0.18, centerY, 45, 'mega'), 700)
      );
    } else {
      // Big Win
      spawnBurst(centerX, centerY, 55, 'big');
      waveTimerRef.current.push(
        setTimeout(() => spawnBurst(centerX, centerY - 20, 35, 'big'), 300)
      );
    }

    // Animation Loop
    let isRunning = true;

    const render = () => {
      if (!isRunning) return;

      ctx.clearRect(0, 0, width, height);

      const particles = particlesRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        // Physics update
        p.vx *= p.drag;
        p.vy = p.vy * p.drag + p.gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.vRot;
        p.currentLife--;
        p.alpha = Math.max(0, p.currentLife / p.maxLife);

        // 3D Coin Flip Rotation
        if (p.type === 'coin') {
          p.scaleX = Math.cos(p.currentLife * p.scaleSpeed);
        }

        // Draw particle
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        if (p.type === 'coin') {
          // 3D Golden Egyptian Coin
          ctx.scale(p.scaleX, 1);
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.fillStyle = '#f59e0b';
          ctx.fill();

          // Coin Rim
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 0.82, 0, Math.PI * 2);
          ctx.fillStyle = '#fde047';
          ctx.fill();

          // Coin Inner Symbol
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 0.4, 0, Math.PI * 2);
          ctx.fillStyle = '#b45309';
          ctx.fill();
        } else if (p.type === 'gem') {
          // Faceted Gem Shard
          ctx.beginPath();
          const s = p.size;
          if (p.shapeType === 0) {
            // Diamond
            ctx.moveTo(0, -s);
            ctx.lineTo(s, 0);
            ctx.lineTo(0, s);
            ctx.lineTo(-s, 0);
          } else if (p.shapeType === 1) {
            // Hexagon
            for (let a = 0; a < 6; a++) {
              const angle = (Math.PI / 3) * a;
              const gx = Math.cos(angle) * s;
              const gy = Math.sin(angle) * s;
              if (a === 0) ctx.moveTo(gx, gy);
              else ctx.lineTo(gx, gy);
            }
          } else {
            // Octagon
            for (let a = 0; a < 8; a++) {
              const angle = (Math.PI / 4) * a;
              const gx = Math.cos(angle) * s;
              const gy = Math.sin(angle) * s;
              if (a === 0) ctx.moveTo(gx, gy);
              else ctx.lineTo(gx, gy);
            }
          }
          ctx.closePath();
          ctx.fillStyle = p.color;
          ctx.fill();
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 1;
          ctx.stroke();
        } else if (p.type === 'star') {
          // 4-pointed radiant sun star
          const s = p.size;
          ctx.beginPath();
          ctx.moveTo(0, -s * 1.5);
          ctx.quadraticCurveTo(0, 0, s * 1.5, 0);
          ctx.quadraticCurveTo(0, 0, 0, s * 1.5);
          ctx.quadraticCurveTo(0, 0, -s * 1.5, 0);
          ctx.quadraticCurveTo(0, 0, 0, -s * 1.5);
          ctx.fillStyle = p.color;
          ctx.fill();
        } else if (p.type === 'scarab') {
          // Egyptian Scarab Glyph
          const s = p.size;
          ctx.beginPath();
          ctx.ellipse(0, 0, s * 0.8, s, 0, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.fill();
          ctx.strokeStyle = '#fde047';
          ctx.lineWidth = 1;
          ctx.stroke();
        } else if (p.type === 'ring') {
          // Expanding Shockwave Ring
          p.size += 6;
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.strokeStyle = p.color;
          ctx.lineWidth = Math.max(1, 4 * p.alpha);
          ctx.stroke();
        } else {
          // Sparkle Orb with Glow
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 8;
          ctx.fill();
        }

        ctx.restore();

        // Remove dead particle
        if (p.currentLife <= 0) {
          particles.splice(i, 1);
        }
      }

      if (particles.length > 0) {
        animationFrameRef.current = requestAnimationFrame(render);
      } else {
        isRunning = false;
        if (onAnimationComplete) onAnimationComplete();
      }
    };

    animationFrameRef.current = requestAnimationFrame(render);

    return () => {
      isRunning = false;
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      waveTimerRef.current.forEach((t) => clearTimeout(t));
    };
  }, [winType, winAmount, jackpotName, onAnimationComplete]);

  if (!winType) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden rounded-2xl sm:rounded-3xl">
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};
