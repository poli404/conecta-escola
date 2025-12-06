import styles from "./page.module.css";
import { CorpoTabela, BarraPesquisa } from "@/components/TabelaExternos";
import { MenuAluno } from "@/components/MenuAluno";

export default function Home() {
  //const faltas = getFaltas(idAluno);
  const faltas = [{id: 1, data: "10/02/2025", idAluno : 1, idDisciplina: 3}];

  return (
    <main>
      <MenuAluno/>
      <div className={styles.container}>
        <table className={styles.table}>
          <thead>
            <BarraPesquisa/>
            <tr>
              <th className={styles.title}>Disciplina</th>
              <th className={styles.title}>Data Falta</th>
            </tr>
          </thead>
          <CorpoTabela dados={faltas} tipo="faltas"/>
        </table>
      </div>
    </main>
  );
}
