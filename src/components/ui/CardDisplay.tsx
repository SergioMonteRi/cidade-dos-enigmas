import type { Card } from '../../types';
import styles from './CardDisplay.module.css';

interface CardDisplayProps {
  readonly card: Card;
  readonly mini?: boolean;
}

const DIFFICULTY_COLORS = {
  'fácil': '#2EC4B6',
  'médio': '#F5A623',
  'difícil': '#E85D75',
};

export default function CardDisplay({ card, mini = false }: CardDisplayProps) {
  return (
    <article className={`${styles.card} ${mini ? styles.mini : ''}`}>
      <div className={styles.borderFrame}>
        <div className={styles.header}>
          <span className={styles.logo}>CIDADE DOS <strong>ENIGMAS</strong></span>
          <span
            className={styles.difficulty}
            style={{ background: DIFFICULTY_COLORS[card.difficulty] }}
          >
            {card.difficulty}
          </span>
        </div>

        <div className={styles.badge} style={{ background: card.locationColor }}>
          <span className={styles.badgeIcon}>{card.locationEmoji}</span>
          {!mini && <span className={styles.badgeName}>{card.locationName.toUpperCase()}</span>}
        </div>

        <div className={styles.illustration} aria-label={card.locationIllustrationAlt}>
          <span className={styles.illustrationEmoji}>{card.locationEmoji}</span>
          <div className={styles.illustrationGlow} style={{ background: card.locationColor }} />
        </div>

        {!mini && (
          <div className={styles.challenge}>
            <div className={styles.challengeHeader}>
              <span>🔍</span> DESAFIO
            </div>
            <p className={styles.challengeText}>{card.challengeText}</p>
          </div>
        )}

        <div className={styles.footer}>
          <span aria-label="Inclusão e Libras">🤟</span>
          <span className={styles.cardNumber}>#{String(card.id).padStart(2, '0')}</span>
          <span aria-label="Inclusão">♾️</span>
        </div>
      </div>

      <div className={`${styles.corner} ${styles.cornerTL}`}>+</div>
      <div className={`${styles.corner} ${styles.cornerTR}`}>÷</div>
      <div className={`${styles.corner} ${styles.cornerBL}`}>△</div>
      <div className={`${styles.corner} ${styles.cornerBR}`}>□</div>
    </article>
  );
}
