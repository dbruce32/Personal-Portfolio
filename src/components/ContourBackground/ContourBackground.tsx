'use client';

import { useEffect, useRef, useCallback } from 'react';
import styles from './ContourBackground.module.css';

interface Point {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

function computeVoronoi(
  points: Point[],
  width: number,
  height: number,
  ctx: CanvasRenderingContext2D
) {
  // For each pixel row, find the closest seed and draw accordingly
  // Using a more efficient approach: draw cell borders by checking neighbor distances
  const cols = Math.ceil(width / 4);
  const rows = Math.ceil(height / 4);
  const cellSize = 4;

  // Assign each grid cell to nearest point
  const grid = new Int16Array(cols * rows);
  for (let gy = 0; gy < rows; gy++) {
    for (let gx = 0; gx < cols; gx++) {
      const px = gx * cellSize + cellSize / 2;
      const py = gy * cellSize + cellSize / 2;
      let minDist = Infinity;
      let closest = 0;
      for (let i = 0; i < points.length; i++) {
        const dx = px - points[i].x;
        const dy = py - points[i].y;
        const dist = dx * dx + dy * dy;
        if (dist < minDist) {
          minDist = dist;
          closest = i;
        }
      }
      grid[gy * cols + gx] = closest;
    }
  }

  // Draw edges: where adjacent grid cells differ
  ctx.clearRect(0, 0, width, height);

  // Fill cells with subtle theme-consistent colors
  const palette = [
    'rgba(67, 97, 238, 0.06)',   // primary blue
    'rgba(72, 149, 239, 0.06)',  // primary light blue
    'rgba(58, 12, 163, 0.04)',   // primary dark indigo
    'rgba(99, 102, 241, 0.05)',  // indigo
    'rgba(129, 140, 248, 0.05)', // light indigo
    'rgba(165, 180, 252, 0.04)', // lavender
    'rgba(224, 231, 255, 0.06)', // pale blue
    'rgba(67, 97, 238, 0.03)',   // faint primary
  ];
  const colors = points.map((_, i) => palette[i % palette.length]);

  for (let gy = 0; gy < rows; gy++) {
    for (let gx = 0; gx < cols; gx++) {
      const idx = grid[gy * cols + gx];
      ctx.fillStyle = colors[idx];
      ctx.fillRect(gx * cellSize, gy * cellSize, cellSize, cellSize);
    }
  }

  // Draw borders
  ctx.strokeStyle = 'rgba(67, 97, 238, 0.12)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();

  for (let gy = 0; gy < rows - 1; gy++) {
    for (let gx = 0; gx < cols - 1; gx++) {
      const current = grid[gy * cols + gx];
      const right = grid[gy * cols + gx + 1];
      const below = grid[(gy + 1) * cols + gx];

      if (current !== right) {
        const x = (gx + 1) * cellSize;
        const y = gy * cellSize;
        ctx.moveTo(x, y);
        ctx.lineTo(x, y + cellSize);
      }
      if (current !== below) {
        const x = gx * cellSize;
        const y = (gy + 1) * cellSize;
        ctx.moveTo(x, y);
        ctx.lineTo(x + cellSize, y);
      }
    }
  }

  ctx.stroke();
}

export default function ContourBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointsRef = useRef<Point[]>([]);
  const mouseRef = useRef<Point | null>(null);
  const animFrameRef = useRef<number>(0);
  const sizeRef = useRef({ width: 0, height: 0 });

  const initPoints = useCallback((width: number, height: number) => {
    const numPoints = 30;
    const points: Point[] = [];
    for (let i = 0; i < numPoints; i++) {
      points.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
      });
    }
    pointsRef.current = points;
  }, []);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = sizeRef.current;
    const points = pointsRef.current;
    const mouse = mouseRef.current;

    // Update positions
    for (let i = 0; i < points.length; i++) {
      const p = points[i];

      // Random impulse (~2% chance per frame per point)
      if (Math.random() < 0.02) {
        const angle = Math.random() * Math.PI * 2;
        const strength = 0.2 + Math.random() * 0.3;
        p.vx += Math.cos(angle) * strength;
        p.vy += Math.sin(angle) * strength;
      }

      // Drift
      p.x += p.vx;
      p.y += p.vy;

      // Bounce off edges
      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      // Keep in bounds
      p.x = Math.max(0, Math.min(width, p.x));
      p.y = Math.max(0, Math.min(height, p.y));

      // Mouse influence: gently push points away
      if (mouse) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const radius = 150;
        if (dist < radius && dist > 0) {
          const force = (1 - dist / radius) * 0.8;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }
      }

      // Dampen velocity
      p.vx *= 0.995;
      p.vy *= 0.995;

      // Clamp speed
      const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
      const maxSpeed = 1.2;
      if (speed > maxSpeed) {
        p.vx = (p.vx / speed) * maxSpeed;
        p.vy = (p.vy / speed) * maxSpeed;
      }
    }

    // Build point list including mouse as an extra seed
    const renderPoints = mouse
      ? [...points, { x: mouse.x, y: mouse.y, vx: 0, vy: 0 }]
      : points;

    computeVoronoi(renderPoints, width, height, ctx);

    animFrameRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      const ctx = canvas.getContext('2d');
      if (ctx) ctx.scale(dpr, dpr);
      sizeRef.current = { width, height };

      if (pointsRef.current.length === 0) {
        initPoints(width, height);
      }
    };

    resize();
    window.addEventListener('resize', resize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY, vx: 0, vy: 0 };
    };

    const handleMouseLeave = () => {
      mouseRef.current = null;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [animate, initPoints]);

  return (
    <canvas
      ref={canvasRef}
      className={styles.bgGraphic}
      aria-hidden="true"
    />
  );
}
