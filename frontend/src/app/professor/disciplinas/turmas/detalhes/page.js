import { MenuProfessor } from "@/components/MenuProfessor";
import Link from "next/link";
import styles from "./page.module.css";
import { CorpoTabela, BarraPesquisa } from "@/components/Tabela";

export default function Home() {
  //const alunos = getAlunos(turma);
  const alunos = [{ id: 1, nome: "Maria Eduarda de Mello Policante", anoEscolar: 3 }, { id: 2, nome: "Ana Paula Loureiro Crippa", anoEscolar: 2 }]; // Dados simulados

  return (
    <main>
      <MenuProfessor/>
      <div className={styles.container}>
        <table className={styles.table}>
          <thead>
            <BarraPesquisa col="2"/>
            <tr>
              <th className={styles.title}>Matrícula</th>
              <th className={styles.title}>Nome do Aluno</th>
              <th></th>
            </tr>
          </thead>
          <CorpoTabela dados={alunos} tipo={"detalhes"} usuario="professor"/>
        </table>
      </div>
    </main>
  );
}
