import { MenuEscola } from "@/components/MenuEscola";
import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main>
      <MenuEscola/>
      <div className={styles.container}>
        <Link className={styles.fakeButton} href="/escola/professores/cadastro">Cadastrar Novo Professor</Link>
      </div>
    </main>
  );
}
