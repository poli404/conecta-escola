import { MenuEscola } from "@/components/MenuEscola";
import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  //const alunos = getAllAlunos();
  const alunos = [{ id: 1, nome: "João Silva", anoEscolar: 3 }, { id: 2, nome: "Maria Oliveira", anoEscolar: 2 }]; // Dados simulados

  return (
    <main>
      <MenuEscola/>
      <div className={styles.container}>
        <Link className={styles.fakeButton} href="/escola/alunos/cadastro">Cadastrar Novo Aluno</Link>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Matrícula</th>
              <th>Nome do Aluno</th>
              <th>Ano Escolar</th>
            </tr>
          </thead>
          <tbody>
              {alunos.map((aluno) => (
                <tr key={aluno.id}>
                  <td>{aluno.id}</td>
                  <td>{aluno.nome}</td>
                  <td>{aluno.anoEscolar}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
