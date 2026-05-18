import { GAME_INFO } from '../../data/cards';
import LibrasPlayer from '../ui/LibrasPlayer';
import styles from './RulesSection.module.css';

export default function RulesSection() {
  return (
    <section id="regras" className={styles.section}>
      <div className={styles.inner}>

        {/* Header */}
        <div className={styles.header}>
          <p className={styles.label}>COMO JOGAR</p>
          <h2 className="section-title">
            Regras do <strong>Jogo</strong>
          </h2>
          <p className={styles.subtitle}>Aprenda em minutos e divirta-se por horas!</p>
          <LibrasPlayer src={GAME_INFO.rules.librasVideoSrc} label="Assistir regras em Libras" />
        </div>

        <div className={styles.content}>

          {/* Objetivo + Participantes */}
          <div className={styles.highlightRow}>
            <div className={styles.highlight}>
              <span className={styles.highlightIcon}>💎</span>
              <div>
                <h3 className={styles.highlightTitle}>Objetivo</h3>
                <p className={styles.highlightText}>
                  Conquiste o maior número de <strong>diamantes</strong> resolvendo desafios matemáticos. O jogo termina quando todos os diamantes forem resgatados — vence quem tiver mais!
                </p>
              </div>
            </div>
            <div className={`${styles.highlight} ${styles.highlightAccent}`}>
              <span className={styles.highlightIcon}>👥</span>
              <div>
                <h3 className={styles.highlightTitle}>Participantes</h3>
                <p className={styles.highlightText}>
                  O jogo comporta <strong>até 4 jogadores</strong>. A ordem de jogo é definida pelo próprio grupo.
                </p>
              </div>
            </div>
          </div>

          {/* Passo a passo */}
          <div className={styles.stepsBlock}>
            <p className={styles.blockLabel}>PASSO A PASSO</p>
            <ol className={styles.steps}>
              {GAME_INFO.rules.steps.map((step, i) => (
                <li key={step} className={styles.step}>
                  <div className={styles.stepNumber}>{i + 1}</div>
                  <p className={styles.stepText}>{step}</p>
                </li>
              ))}
            </ol>
          </div>

          {/* Resultado do desafio */}
          <div className={styles.outcomeRow}>
            <p className={styles.blockLabel}>RESULTADO DO DESAFIO</p>
            <div className={styles.outcomes}>
              <div className={`${styles.outcome} ${styles.outcomeCorrect}`}>
                <span className={styles.outcomeIcon}>✅</span>
                <div>
                  <strong>Resposta correta</strong>
                  <p>O jogador conquista um 💎 diamante!</p>
                </div>
              </div>
              <div className={`${styles.outcome} ${styles.outcomeWrong}`}>
                <span className={styles.outcomeIcon}>❌</span>
                <div>
                  <strong>Resposta errada</strong>
                  <p>Sem diamante. O jogo continua normalmente — mas você não pode tentar novamente no mesmo ambiente imediatamente.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Desafios rápidos */}
          <div className={styles.quickBlock}>
            <span className={styles.quickIcon}>⚡</span>
            <div>
              <h3 className={styles.quickTitle}>Desafios Rápidos</h3>
              <p className={styles.quickText}>
                Durante o caminho existem desafios de <strong>cálculo mental</strong> com <strong>10 segundos</strong> para responder.
              </p>
              <div className={styles.quickResults}>
                <span className={styles.quickResult}>✅ Acertou → avança uma casa</span>
                <span className={styles.quickResult}>❌ Errou → fica uma rodada sem jogar</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
