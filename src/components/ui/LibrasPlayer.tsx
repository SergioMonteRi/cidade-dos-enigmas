import { useState, useEffect, useRef } from 'react';
import styles from './LibrasPlayer.module.css';

interface LibrasPlayerProps {
  src: string;
  label?: string;
}

export default function LibrasPlayer({ src, label = 'Assistir em Libras' }: LibrasPlayerProps) {
  const [open, setOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      videoRef.current?.pause();
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      <button onClick={() => setOpen(true)} aria-label={label} className={styles.btn}>
        <span className={styles.icon}>🤟</span>
        {label}
      </button>

      {open && (
        <div
          className={styles.overlay}
          role="dialog"
          aria-modal="true"
          aria-label="Vídeo em Libras"
          onClick={() => setOpen(false)}
        >
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button className={styles.close} onClick={() => setOpen(false)} aria-label="Fechar vídeo">
              ✕
            </button>
            <p className={styles.modalTitle}>🤟 Regras em Libras</p>
            <video
              ref={videoRef}
              src={src}
              controls
              autoPlay
              playsInline
              className={styles.video}
            >
              Seu navegador não suporta vídeos HTML5.
            </video>
          </div>
        </div>
      )}
    </>
  );
}
