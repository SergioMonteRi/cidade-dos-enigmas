import MathSymbols from '../ui/MathSymbols';
import styles from './HeroSection.module.css';

export default function HeroSection() {
  return (
    <section className={styles.hero}>
      <MathSymbols count={16} />

      <div className={styles.content}>
        <div className={styles.badge}>
          <span>🎲</span> Jogo Educativo de Tabuleiro
        </div>

        <h1 className={styles.title}>
          <span className={styles.titleCity}>CIDADE DOS</span>
          <span className={styles.titleEnigmas}>ENIGMAS</span>
        </h1>

        <p className={styles.subtitle}>
          Um jogo de tabuleiro cheio de <strong>enigmas matemáticos</strong> para toda a família,
          com acessibilidade em <span>Libras</span>.
        </p>

        <div className={styles.actions}>
          <a href="#cartas" className="btn-primary">
            🃏 Ver as Cartas
          </a>
          <a href="#regras" className="btn-secondary">
            📖 Como Jogar
          </a>
        </div>

        <div className={styles.features}>
          <div className={styles.feature}>
            <span>🧮</span>
            <span>20 desafios matemáticos</span>
          </div>
          <div className={styles.feature}>
            <span>🤟</span>
            <span>Acessível em Libras</span>
          </div>
          <div className={styles.feature}>
            <span>👨‍👩‍👧‍👦</span>
            <span>Para toda a família</span>
          </div>
        </div>
      </div>

      <div className={styles.cardPreview} aria-hidden="true">
        <div className={styles.previewCard}>
          <div className={styles.previewCardInner}>
            <div className={styles.previewHeader}>
              <span>CIDADE DOS <strong>ENIGMAS</strong></span>
            </div>
            <div className={styles.previewBadge}>🏫 ESCOLA</div>
            <div className={styles.previewBody}>🔍</div>
            <div className={styles.previewChallenge}>Desafio matemático aguarda...</div>
          </div>
        </div>
        <div className={styles.previewCardBack} />
        <div className={styles.previewCardBack2} />
      </div>
    </section>
  );
}
