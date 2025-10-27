import { MenuEscola } from "@/components/MenuEscola";
import Link from "next/link";
import styles from "./page.module.css";
import { CorpoTabela, BarraPesquisa } from "@/components/Tabela";

export default function Home() {
  //const alunos = getAllAlunos();
  const alunos = [{ id: 1, nome: "Maria Eduarda de Mello Policante", anoEscolar: 3 }, { id: 2, nome: "Ana Paula Loureiro Crippa", anoEscolar: 2 }]; // Dados simulados

  return (
    <main>
      <MenuEscola/>
      <div className={styles.container}>
        <Link className={styles.fakeButton} href="/escola/alunos/cadastro">Cadastrar Novo Aluno</Link>
        <table className={styles.table}>
          <thead>
            <BarraPesquisa />
            <tr>
              <th className={styles.title}>Matrícula</th>
              <th className={styles.title}>Nome do Aluno</th>
              <th></th>
            </tr>
          </thead>
          <CorpoTabela dados={alunos} tipo={"alunos"}/>
        </table>
      </div>
    </main>
  );
}
