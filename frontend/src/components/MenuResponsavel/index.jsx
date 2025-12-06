import Image from 'next/image';
import home from "../../../public/home_icon.png";
import styles from './menuResponsavel.module.css';

export const MenuResponsavel = ({ alunos }) => {
  return (
    <nav className={styles.menu}>
      <div className={styles.alunos}>
        {alunos.map(e => (<a key={e.id} href="" className={styles.menuItem}>{e.nome}</a>))}
      </div>
      <div className={styles.itens}>
        <a className={styles.menuItem} href="/responsavel">
          <Image src={home} width="20" alt="Tela Inicial"></Image>
        </a>
        <a href="/responsavel/notas" className={styles.menuItem}>Notas</a>
        <a href="/responsavel/faltas" className={styles.menuItem}>Faltas</a>
      </div>
    </nav>
    );
}