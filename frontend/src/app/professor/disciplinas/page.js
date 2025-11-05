import { MenuProfessor } from "@/components/MenuProfessor";
import Link from "next/link";
import styles from "./page.module.css";
import { CorpoTabela, BarraPesquisa } from "@/components/Tabela";

export default function Home() {
  //const alunos = getAllTurmas();
  const disciplinas = [{id : 1, nome: 'Matemática', descricao : "algo"}];

  return (
    <main>
      <MenuProfessor/>
      <div className={styles.container}>
        <table className={styles.table}>
          <thead>
            <BarraPesquisa col="2"/>
            <tr>
              <th className={styles.title}>Código</th>
              <th className={styles.title}>Nome</th>
              <th></th>
            </tr>
          </thead>
          <CorpoTabela dados={disciplinas} tipo="disciplinas" usuario="professor"/>
        </table>
      </div>
    </main>
  );
}
