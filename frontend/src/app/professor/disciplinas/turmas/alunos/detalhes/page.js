import { MenuProfessor } from "@/components/MenuProfessor";
import styles from "./page.module.css";
import { CorpoTabela } from "@/components/Tabela";

export default function Home() {
  //const notas = getNotas(idAluno);
  //const faltas = getFaltas(idAluno);
  //const aluno = getNomeAluno(idAluno);
  const notas = [{ id: 1, idAluno: 1, nota: 10.0, idDisciplina: 1, data: '30/4/2025' }, { id: 2, idAluno: 1, nota: 10.0, idDisciplina: 1, data: '3/8/2025' }]; // Dados simulados
  const faltas = [{ id: 1, idAluno: 1, idDisciplina: 1, data: '30/10/2025'}, { id: 2, idAluno: 1, idDisciplina: 1, data: '13/08/2025' }]; // Dados simulados
  const aluno = "Maria Eduarda de Mello Policante";

  return (
    <main>
      <MenuProfessor/>
      <h3 className={styles.aluno}><b>Aluno:</b> {aluno}</h3>
      <div className={styles.container}>
          <table className={styles.table} id="tabelaNotas">
            <caption className={styles.title}>Notas</caption>
            <thead>
            <tr>
              <th className={styles.title}>Data da Avaliação</th>
              <th className={styles.title}>Nota</th>
              <th></th>
            </tr>
            </thead>
            <CorpoTabela dados={notas} tipo={"detalhes"} usuario="professor"/>
          </table>
          <button>Adicionar Nota</button>
          <table className={styles.table} id="tabelaFaltas">
            <caption className={styles.title}>Faltas</caption>
            <thead>
              <tr>
                <th className={styles.title}>Data</th>
                <th></th>
              </tr>
              </thead>
              <CorpoTabela dados={faltas} tipo={"faltas"} usuario="professor"/>
          </table>
          <button>Adicionar Falta</button>
      </div>
    </main>
  );
}
