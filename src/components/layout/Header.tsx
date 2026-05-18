import { Link } from 'react-router-dom';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link to="/" className={styles.logo} aria-label="Cidade dos Enigmas — Página inicial">
          <span className={styles.logoCity}>CIDADE DOS</span>
          <span className={styles.logoEnigmas}>ENIGMAS</span>
        </Link>
        <nav className={styles.nav} aria-label="Navegação principal">
          <a href="#sobre" className={styles.navLink}>Sobre</a>
          <a href="#regras" className={styles.navLink}>Regras</a>
          <a href="#cartas" className={styles.navLink}>Cartas</a>
        </nav>
      </div>
    </header>
  );
}
