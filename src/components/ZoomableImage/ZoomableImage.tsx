'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './ZoomableImage.module.css';

interface ZoomableImageProps {
  src: string;
  alt: string;
  className?: string;
}

interface Rect {
  top: number;
  left: number;
  width: number;
  height: number;
}

type Phase = 'closed' | 'opening' | 'open' | 'closing';

const DURATION = 380; // ms, keep in sync with the CSS transition

function prefersReducedMotion() {
  return typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Largest rect with the image's aspect ratio that fits in the viewport, centered.
function targetRect(aspect: number): Rect {
  const maxW = window.innerWidth * 0.92;
  const maxH = window.innerHeight * 0.86;
  let width = maxW;
  let height = width / aspect;
  if (height > maxH) {
    height = maxH;
    width = height * aspect;
  }
  return {
    width,
    height,
    left: (window.innerWidth - width) / 2,
    top: (window.innerHeight - height) / 2,
  };
}

// Transform that makes an element laid out at `to` appear exactly at `from`.
function invert(from: Rect, to: Rect) {
  const sx = to.width ? from.width / to.width : 1;
  const sy = to.height ? from.height / to.height : 1;
  return `translate(${from.left - to.left}px, ${from.top - to.top}px) scale(${sx}, ${sy})`;
}

/**
 * An image that enlarges in place when clicked. The enlarged copy grows out of
 * the thumbnail's position, and clicking anywhere outside it (or pressing
 * Escape) eases it back down into the thumbnail.
 */
export default function ZoomableImage({ src, alt, className }: ZoomableImageProps) {
  const thumbRef = useRef<HTMLButtonElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<Phase>('closed');
  const [from, setFrom] = useState<Rect | null>(null);
  const [to, setTo] = useState<Rect | null>(null);
  const closeTimer = useRef<number>();

  const measureThumb = (): Rect | null => {
    const el = imgRef.current;
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return { top: r.top, left: r.left, width: r.width, height: r.height };
  };

  const open = () => {
    const start = measureThumb();
    const img = imgRef.current;
    if (!start || !img) return;
    const measured = img.naturalWidth && img.naturalHeight ? img.naturalWidth / img.naturalHeight : start.width / start.height;
    const aspect = Number.isFinite(measured) && measured > 0 ? measured : 4 / 3;
    setFrom(start);
    setTo(targetRect(aspect));
    setPhase(prefersReducedMotion() ? 'open' : 'opening');
  };

  const close = useCallback(() => {
    if (phase === 'closed' || phase === 'closing') return;
    // Re-measure in case the layout shifted while open.
    const end = measureThumb();
    if (end) setFrom(end);
    if (prefersReducedMotion()) {
      setPhase('closed');
      return;
    }
    setPhase('closing');
    closeTimer.current = window.setTimeout(() => setPhase('closed'), DURATION);
  }, [phase]);

  // Opening: commit the copy at the thumbnail's position, force a layout so the
  // browser registers that starting point, then release the transform so it
  // animates out. A timer (not rAF) so it still runs in throttled/background tabs.
  useLayoutEffect(() => {
    if (phase !== 'opening') return;
    void overlayRef.current?.getBoundingClientRect();
    const id = window.setTimeout(() => setPhase('open'), 20);
    return () => window.clearTimeout(id);
  }, [phase]);

  // While open: lock page scroll, close on Escape, keep the target centered on resize.
  useEffect(() => {
    if (phase === 'closed') return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    const onResize = () => {
      const img = imgRef.current;
      if (img?.naturalWidth) setTo(targetRect(img.naturalWidth / img.naturalHeight));
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [phase, close]);

  // Focus: move into the dialog on open, back to the thumbnail on close.
  useEffect(() => {
    if (phase === 'open') overlayRef.current?.focus({ preventScroll: true });
    if (phase === 'closed' && from) thumbRef.current?.focus({ preventScroll: true });
  }, [phase, from]);

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  const showOverlay = phase !== 'closed' && from && to;
  const atThumb = phase === 'opening' || phase === 'closing';

  return (
    <>
      <button
        ref={thumbRef}
        type="button"
        className={styles.thumbButton}
        onClick={open}
        aria-label={`Enlarge photo: ${alt}`}
        aria-haspopup="dialog"
      >
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          className={className}
          loading="lazy"
          style={{ visibility: phase === 'closed' ? 'visible' : 'hidden' }}
        />
      </button>

      {showOverlay &&
        createPortal(
          <div
            ref={overlayRef}
            className={`${styles.overlay} ${phase === 'open' ? styles.overlayVisible : ''}`}
            role="dialog"
            aria-modal="true"
            aria-label={alt}
            tabIndex={-1}
            onClick={close}
          >
            <img
              src={src}
              alt={alt}
              className={styles.zoomed}
              style={{
                top: to.top,
                left: to.left,
                width: to.width,
                height: to.height,
                transform: atThumb ? invert(from, to) : 'none',
                transition: phase === 'opening' ? 'none' : undefined,
              }}
              onClick={(e) => e.stopPropagation()}
            />
            <span className={styles.hint} aria-hidden="true">
              Click outside or press Esc to close
            </span>
          </div>,
          document.body
        )}
    </>
  );
}
