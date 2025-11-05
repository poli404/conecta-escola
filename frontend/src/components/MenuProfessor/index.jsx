import Image from 'next/image';
import home from "../../../public/home_icon.png";
import styles from './menuProfessor.module.css';

export const MenuProfessor = () => {
  return (
    <nav className={styles.menu}>
        <a className={styles.menuItem} href="/professor">
          <Image src={home} width="20" alt="Tela Inicial"></Image>
        </a>
        <a href="/professor/turmas" className={styles.menuItem}>Turmas</a>
        <a href="/professor/disciplinas" className={styles.menuItem}>Disciplinas</a>
    </nav>
    );
}