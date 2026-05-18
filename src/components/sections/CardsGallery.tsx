import { Link } from 'react-router-dom';
import { CARDS } from '../../data/cards';
import CardDisplay from '../ui/CardDisplay';
import styles from './CardsGallery.module.css';

const DIFFICULTY_LABEL = {
  'fácil': { color: '#2EC4B6', label: 'Fácil' },
  'médio': { color: '#F5A623', label: 'Médio' },
  'difícil': { color: '#E85D75', label: 'Difícil' },
};

export default function CardsGallery() {
  return (
    <section id="cartas" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <p className={styles.label}>DESAFIOS</p>
          <h2 className="section-title">
            As <span>20 Cartas</span><br />da Cidade
          </h2>
          <p className={styles.subtitle}>
            Escaneie o QR code do tabuleiro ou clique em uma carta para resolver o desafio.
          </p>
        </div>

        <div className={styles.grid}>
          {CARDS.map((card) => (
            <Link
              key={card.id}
              to={`/carta/${card.id}`}
              className={styles.cardLink}
              aria-label={`Carta ${card.id}: ${card.locationName} — Dificuldade ${card.difficulty}`}
            >
              <CardDisplay card={card} mini />
              <div className={styles.cardMeta}>
                <span className={styles.cardLocation}>{card.locationName}</span>
                <span
                  className={styles.cardDifficulty}
                  style={{ color: DIFFICULTY_LABEL[card.difficulty].color }}
                >
                  {DIFFICULTY_LABEL[card.difficulty].label}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
