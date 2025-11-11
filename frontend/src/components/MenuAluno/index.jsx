import Image from 'next/image';
import home from "../../../public/home_icon.png";
import styles from './menuProfessor.module.css';

export const MenuAluno = () => {
  return (
    <nav className={styles.menu}>
        <a className={styles.menuItem} href="/aluno">
          <Image src={home} width="20" alt="Tela Inicial"></Image>
        </a>
        <a href="/aluno/notas" className={styles.menuItem}>Notas</a>
        <a href="/aluno/faltas" className={styles.menuItem}>Faltas</a>
    </nav>
    );
}