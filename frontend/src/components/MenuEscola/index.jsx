import styles from './menuEscola.module.css';

export const MenuEscola = () => {
  return (
    <nav className={styles.menu}>
        <a href="/escola/alunos" className={styles.menuItem}>Alunos</a>
        <a href="/escola/professores" className={styles.menuItem}>Professores</a>
        <a href="" className={styles.menuItem}>Turmas</a>
        <a href="" className={styles.menuItem}>Disciplinas</a>
    </nav>
    );
}