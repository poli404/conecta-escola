'use client';
import Image from 'next/image';
import home from "../../../public/home_icon.png";
import styles from './menuResponsavel.module.css';
import { useSearchParams } from 'next/navigation';

export const MenuResponsavel = ({ alunos }) => {
  const searchParams = useSearchParams();

  return (
    <nav className={styles.menu}>
      <div className={styles.itens}>
        <a className={styles.menuItem} href="/responsavel">
          <Image src={home} width="20" alt="Tela Inicial"></Image>
        </a>
        {alunos.map(e => (<a key={e.cpf} href={`/responsavel/aluno?idAluno=${e.cpf}`} className={styles.menuItem}>{e.nome}</a>))}
      </div>
    </nav>
    );
}