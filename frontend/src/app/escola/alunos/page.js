'use client';
import { MenuEscola } from "@/components/MenuEscola";
import Link from "next/link";
import styles from "./page.module.css";
import { TabelasEscola, BarraPesquisa } from "@/components/Tabela";
import { useEffect, useState } from "react";
import { getTodosAlunosEscola } from "@/services/alunoService";

export default function Home() {
  const [idEscola, setIdEscola] = useState(null);
  const [alunos, setAlunos] = useState(null);

  useEffect(() => {
    const id = sessionStorage.getItem("idEscola");
    setIdEscola(id);

    (async () => {
          try {
            const dados = await getTodosAlunosEscola(id);
            setAlunos(dados);
          } catch (err) {
            console.error("Erro ao buscar alunos:", err);
            setAlunos([]);
          }
        })();
    }, []);

  const mostrarAlunos = alunos ?? [];
  //const alunos = [{ id: 1, nome: "Maria Eduarda de Mello Policante", anoEscolar: 3 }, { id: 2, nome: "Ana Paula Loureiro Crippa", anoEscolar: 2 }]; // Dados simulados

  return (
    <main>
      <MenuEscola/>
      <div className={styles.container}>
        <Link className={styles.fakeButton} href="/escola/alunos/cadastro">Cadastrar Novo Aluno</Link>
        <table className={styles.table}>
          <thead>
            <BarraPesquisa col="2"/>
            <tr>
              <th className={styles.title}>Nome do Aluno</th>
              <th className={styles.title}>Matrícula</th>
              <th></th>
            </tr>
          </thead>
          <TabelasEscola dados={mostrarAlunos} tipo={"alunos"}/>
        </table>
      </div>
    </main>
  );
}
