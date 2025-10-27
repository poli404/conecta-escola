import { MenuEscola } from "@/components/MenuEscola";
import Link from "next/link";
import styles from "./page.module.css";
import { CorpoTabela, BarraPesquisa } from "@/components/Tabela";

export default function Home() {
  //const alunos = getAllTurmas();
  const disciplinas = [{id : 1, nome: 'Matemática', descricao : "algo"}];

  return (
    <main>
      <MenuEscola/>
      <div className={styles.container}>
        <Link className={styles.fakeButton} href="/escola/disciplinas/cadastro">Cadastrar Nova Disciplina</Link>
        <table className={styles.table}>
          <thead>
            <BarraPesquisa col="2"/>
            <tr>
              <th className={styles.title}>Código</th>
              <th className={styles.title}>Nome</th>
              <th></th>
            </tr>
          </thead>
          <CorpoTabela dados={disciplinas} tipo="disciplinas"/>
        </table>
      </div>
    </main>
  );
}
