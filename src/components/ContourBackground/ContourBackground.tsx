'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './ContourBackground.module.css';

interface Point {
  x: number;
  y: number;
}

// Original line data (control points for the curves)
const lines = [
  { y: 200, points: [{ x: 150, y: 180 }, { x: 300, y: 250 }, { x: 500, y: 220 }, { x: 750, y: 160 }] },
  { y: 260, points: [{ x: 100, y: 240 }, { x: 280, y: 310 }, { x: 480, y: 280 }, { x: 720, y: 220 }] },
  { y: 320, points: [{ x: 200, y: 300 }, { x: 350, y: 370 }, { x: 520, y: 340 }, { x: 780, y: 280 }] },
  { y: 390, points: [{ x: 120, y: 370 }, { x: 320, y: 440 }, { x: 500, y: 400 }, { x: 740, y: 350 }] },
  { y: 460, points: [{ x: 180, y: 440 }, { x: 360, y: 510 }, { x: 540, y: 470 }, { x: 760, y: 420 }] },
  { y: 530, points: [{ x: 140, y: 510 }, { x: 290, y: 580 }, { x: 490, y: 540 }, { x: 730, y: 490 }] },
  { y: 600, points: [{ x: 200, y: 580 }, { x: 340, y: 650 }, { x: 520, y: 610 }, { x: 780, y: 560 }] },
  { y: 670, points: [{ x: 160, y: 650 }, { x: 310, y: 720 }, { x: 500, y: 680 }, { x: 750, y: 630 }] },
];

const nodes = [
  { x: 250, y: 280, r: 3, opacity: 0.12 },
  { x: 600, y: 400, r: 4, opacity: 0.10 },
  { x: 150, y: 500, r: 2.5, opacity: 0.08 },
  { x: 800, y: 300, r: 3.5, opacity: 0.09 },
  { x: 450, y: 550, r: 2, opacity: 0.11 },
  { x: 700, y: 600, r: 3, opacity: 0.07 },
  { x: 350, y: 380, r: 2, opacity: 0.10 },
  { x: 900, y: 500, r: 2.5, opacity: 0.08 },
];

function getDisplacement(elementPos: Point, mousePos: Point, svgRect: DOMRect): Point {
  // Convert mouse position to SVG coordinate space (0-1000 x, 0-800 y)
  const mouseX = (mousePos.x / svgRect.width) * 1000;
  const mouseY = (mousePos.y / svgRect.height) * 800;

  const dx = elementPos.x - mouseX;
  const dy = elementPos.y - mouseY;
  const distance = Math.sqrt(dx * dx + dy * dy);

  const radius = 180; // Influence radius in SVG units
  const strength = 25; // Max displacement in SVG units

  if (distance > radius || distance === 0) return { x: 0, y: 0 };

  const force = (1 - distance / radius) * strength;
  const angle = Math.atan2(dy, dx);

  return {
    x: Math.cos(angle) * force,
    y: Math.sin(angle) * force,
  };
}

function buildPath(lineData: typeof lines[0], mousePos: Point | null, svgRect: DOMRect | null): string {
  const pts = lineData.points;
  const startY = lineData.y;

  const displace = (p: Point) => {
    if (!mousePos || !svgRect) return p;
    const d = getDisplacement(p, mousePos, svgRect);
    return { x: p.x + d.x, y: p.y + d.y };
  };

  const startD = displace({ x: -50, y: startY });
  const p0 = displace(pts[0]);
  const p1 = displace(pts[1]);
  const p2 = displace(pts[2]);
  const p3 = displace(pts[3]);
  const endD = displace({ x: 1050, y: startY });

  return `M${startD.x} ${startD.y} C${p0.x} ${p0.y}, ${p1.x} ${p1.y}, ${p2.x} ${p2.y} S${p3.x} ${p3.y}, ${endD.x} ${endD.y}`;
}

export default function ContourBackground() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [mousePos, setMousePos] = useState<Point | null>(null);
  const [svgRect, setSvgRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    const updateRect = () => {
      if (svgRef.current) {
        setSvgRect(svgRef.current.getBoundingClientRect());
      }
    };

    updateRect();
    window.addEventListener('resize', updateRect);
    return () => window.removeEventListener('resize', updateRect);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseLeave = () => {
      setMousePos(null);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      className={styles.bgGraphic}
      viewBox="0 0 1000 800"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4361ee" stopOpacity="0.07" />
          <stop offset="100%" stopColor="#4895ef" stopOpacity="0.04" />
        </linearGradient>
      </defs>

      {/* Contour lines */}
      {lines.map((line, i) => (
        <path
          key={i}
          d={buildPath(line, mousePos, svgRect)}
          fill="none"
          stroke="url(#lineGrad)"
          strokeWidth="1.5"
          className={styles.line}
        />
      ))}

      {/* Node accents */}
      {nodes.map((node, i) => {
        const d = mousePos && svgRect ? getDisplacement(node, mousePos, svgRect) : { x: 0, y: 0 };
        return (
          <circle
            key={i}
            cx={node.x + d.x}
            cy={node.y + d.y}
            r={node.r}
            fill={i % 2 === 0 ? '#4361ee' : '#4895ef'}
            opacity={node.opacity}
            className={styles.node}
          />
        );
      })}
    </svg>
  );
}
