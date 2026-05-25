import { useParams, Link } from 'react-router-dom';
import { CARDS } from '../data/cards';
import CardDisplay from '../components/ui/CardDisplay';
import AnswerInput from '../components/ui/AnswerInput';
import LibrasPlayer from '../components/ui/LibrasPlayer';
import MathSymbols from '../components/ui/MathSymbols';
import styles from './CardPage.module.css';

export default function CardPage() {
  const { id } = useParams<{ id: string }>();
  const card = CARDS.find((c) => c.id === Number(id));

  if (!card) {
    return (
      <div className={styles.notFound}>
        <span className={styles.notFoundIcon}>🃏</span>
        <h1>Carta não encontrada</h1>
        <p>O QR code pode estar desatualizado ou a carta não existe.</p>
        <Link to="/" className="btn-primary">← Voltar ao início</Link>
      </div>
    );
  }

  return (
    <main className={styles.page}>
      <MathSymbols count={10} />

      <div className={styles.container}>
        <Link to="/" className={styles.back} aria-label="Voltar para a página inicial">
          ← Voltar
        </Link>

        <div className={styles.layout}>
          <div className={styles.cardCol}>
            <CardDisplay card={card} />
            <div className={styles.librasWrapper}>
              <LibrasPlayer
                src={card.librasVideoSrc}
                label="Ver desafio em Libras"
                title={`🤟 Carta #${String(card.id).padStart(2, '0')} — ${card.locationName}`}
              />
            </div>
          </div>

          <div className={styles.answerCol}>
            <div className={styles.cardTag}>
              Carta #{String(card.id).padStart(2, '0')}
            </div>

            <h1 className={styles.locationTitle}>
              {card.locationEmoji} {card.locationName}
            </h1>

            <div className={styles.challengeBlock}>
              <h2 className={styles.challengeLabel}>🔍 Desafio</h2>
              <p className={styles.challengeText}>{card.challengeText}</p>
            </div>

            <AnswerInput card={card} />

            <div className={styles.difficultyTag}>
              Dificuldade:&nbsp;
              <span style={{
                color: card.difficulty === 'fácil' ? '#2EC4B6'
                  : card.difficulty === 'médio' ? '#F5A623'
                  : '#E85D75'
              }}>
                {card.difficulty}
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
