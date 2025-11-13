"use client";
import Image from 'next/image';
import home from "../../../public/home_icon.png";
import styles from './menuEscola.module.css';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export const MenuEscola = () => {
  const path = usePathname();

  const itensMenu = [
    {name : "Alunos", href : "/escola/alunos"},
    {name : "Responsáveis", href : "/escola/responsaveis"},
    {name : "Professores", href : "/escola/professores"},
    {name : "Turmas", href : "/escola/turmas"},
    {name : "Disciplinas", href : "/escola/disciplinas"},
  ];

  return (
    <nav className={styles.menu}>
        <a className={styles.menuItem} href="/escola">
          <Image src={home} width="20" alt="Tela Inicial"></Image>
        </a>
        {itensMenu.map((e) => 
        <Link href={e.href} key={e.name} className={`${styles.menuItem} ${path === e.href ? styles.selected : ''}`}>
        {e.name}
        </Link>
        )}
    </nav>
    );
}