import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.logo}>
          <span className={styles.logoCity}>CIDADE DOS</span>
          <span className={styles.logoEnigmas}>ENIGMAS</span>
        </div>
        <p className={styles.tagline}>Matemática, inclusão e diversão para toda a família.</p>
        <div className={styles.symbols} aria-hidden="true">
          <span>+</span><span>−</span><span>×</span><span>÷</span><span>△</span><span>□</span>
        </div>
      </div>
    </footer>
  );
}
