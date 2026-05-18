import { GAME_INFO } from '../../data/cards';
import LibrasPlayer from '../ui/LibrasPlayer';
import styles from './AboutSection.module.css';

const FEATURES = [
  { icon: '🤟', title: 'Acessível em Libras', desc: 'Todos os desafios com vídeo em Língua Brasileira de Sinais.' },
  { icon: '🧮', title: 'Matemática Divertida', desc: 'Problemas contextualizados do dia a dia da cidade.' },
  { icon: '🎲', title: 'Diversão Garantida', desc: 'Estratégia, sorte e raciocínio em cada rodada.' },
  { icon: '👨‍👩‍👧‍👦', title: 'Para Toda a Família', desc: 'Ideal para crianças, jovens e adultos jogarem juntos.' },
];

export default function AboutSection() {
  return (
    <section id="sobre" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.text}>
          <p className={styles.label}>SOBRE O JOGO</p>
          <h2 className="section-title">
            O que é<br /><span>Cidade dos Enigmas?</span>
          </h2>
          <p className={styles.description}>{GAME_INFO.about.text}</p>
          <LibrasPlayer src={GAME_INFO.about.librasVideoSrc} label="Assistir apresentação em Libras" />
        </div>

        <div className={styles.features}>
          {FEATURES.map((f) => (
            <div key={f.title} className={styles.featureCard}>
              <span className={styles.featureIcon}>{f.icon}</span>
              <div>
                <h3 className={styles.featureTitle}>{f.title}</h3>
                <p className={styles.featureDesc}>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
