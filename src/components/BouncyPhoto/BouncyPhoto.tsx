'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import styles from './BouncyPhoto.module.css';

interface BouncyPhotoProps {
  src: string;
  alt: string;
  size: number;
  className?: string;
}

export default function BouncyPhoto({ src, alt, size, className }: BouncyPhotoProps) {
  const [active, setActive] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const velRef = useRef({ x: 0, y: 0 });
  const posRef = useRef({ x: 0, y: 0 });
  const rotRef = useRef(0);
  const dragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const lastMouse = useRef({ x: 0, y: 0, t: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const originRef = useRef({ x: 0, y: 0 });

  const GRAVITY = 0.6;
  const BOUNCE = 0.7;
  const FRICTION = 0.99;

  const activate = () => {
    if (active) return;
    setActive(true);
    const el = containerRef.current;
    if (el) {
      const rect = el.getBoundingClientRect();
      originRef.current = { x: rect.left, y: rect.top };
      posRef.current = { x: rect.left, y: rect.top };
      setPos({ x: rect.left, y: rect.top });
    }
  };

  const physicsLoop = useCallback(() => {
    if (!active) return;
    const vel = velRef.current;
    const p = posRef.current;

    if (!dragging.current) {
      vel.y += GRAVITY;
      vel.x *= FRICTION;
      vel.y *= FRICTION;

      p.x += vel.x;
      p.y += vel.y;

      // Rotation based on horizontal velocity
      rotRef.current += vel.x * 0.8;

      const maxX = window.innerWidth - size;
      const maxY = window.innerHeight - size;

      if (p.y > maxY) {
        p.y = maxY;
        vel.y = -vel.y * BOUNCE;
        if (Math.abs(vel.y) < 1) vel.y = 0;
      }
      if (p.y < 0) {
        p.y = 0;
        vel.y = -vel.y * BOUNCE;
      }
      if (p.x > maxX) {
        p.x = maxX;
        vel.x = -vel.x * BOUNCE;
      }
      if (p.x < 0) {
        p.x = 0;
        vel.x = -vel.x * BOUNCE;
      }
    }

    setPos({ x: p.x, y: p.y });
    setRotation(rotRef.current);
    rafRef.current = requestAnimationFrame(physicsLoop);
  }, [active, size]);

  useEffect(() => {
    if (active) {
      rafRef.current = requestAnimationFrame(physicsLoop);
    }
    return () => cancelAnimationFrame(rafRef.current);
  }, [active, physicsLoop]);

  useEffect(() => {
    if (!active) return;

    const onMouseMove = (e: MouseEvent) => {
      if (!dragging.current) return;
      const now = performance.now();
      const dt = now - lastMouse.current.t || 1;
      velRef.current = {
        x: (e.clientX - lastMouse.current.x) / dt * 16,
        y: (e.clientY - lastMouse.current.y) / dt * 16,
      };
      lastMouse.current = { x: e.clientX, y: e.clientY, t: now };
      posRef.current = {
        x: e.clientX - dragStart.current.x,
        y: e.clientY - dragStart.current.y,
      };
    };

    const onMouseUp = () => {
      dragging.current = false;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!dragging.current) return;
      const t = e.touches[0];
      const now = performance.now();
      const dt = now - lastMouse.current.t || 1;
      velRef.current = {
        x: (t.clientX - lastMouse.current.x) / dt * 16,
        y: (t.clientY - lastMouse.current.y) / dt * 16,
      };
      lastMouse.current = { x: t.clientX, y: t.clientY, t: now };
      posRef.current = {
        x: t.clientX - dragStart.current.x,
        y: t.clientY - dragStart.current.y,
      };
    };

    const onTouchEnd = () => {
      dragging.current = false;
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('touchmove', onTouchMove);
    window.addEventListener('touchend', onTouchEnd);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [active]);

  const onGrab = (e: React.MouseEvent) => {
    if (!active) return;
    e.preventDefault();
    dragging.current = true;
    dragStart.current = { x: e.clientX - posRef.current.x, y: e.clientY - posRef.current.y };
    lastMouse.current = { x: e.clientX, y: e.clientY, t: performance.now() };
    velRef.current = { x: 0, y: 0 };
  };

  const onTouchGrab = (e: React.TouchEvent) => {
    if (!active) return;
    const t = e.touches[0];
    dragging.current = true;
    dragStart.current = { x: t.clientX - posRef.current.x, y: t.clientY - posRef.current.y };
    lastMouse.current = { x: t.clientX, y: t.clientY, t: performance.now() };
    velRef.current = { x: 0, y: 0 };
  };

  if (!active) {
    return (
      <div ref={containerRef} className={styles.static} onClick={activate} title="Click me!">
        <Image
          src={src}
          alt={alt}
          width={size}
          height={size}
          className={className}
          priority
          unoptimized
        />
      </div>
    );
  }

  return (
    <>
      {/* Placeholder to keep layout */}
      <div style={{ width: size, height: size }} />
      {/* Floating bouncy photo */}
      <div
        className={styles.bouncy}
        style={{ left: pos.x, top: pos.y, width: size, height: size, transform: `rotate(${rotation}deg)` }}
        onMouseDown={onGrab}
        onTouchStart={onTouchGrab}
      >
        <Image
          src={src}
          alt={alt}
          width={size}
          height={size}
          className={className}
          priority
          unoptimized
        />
      </div>
    </>
  );
}
