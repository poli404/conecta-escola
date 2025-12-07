'use client';
import { MenuEscola } from "@/components/MenuEscola";
import Link from "next/link";
import styles from "./page.module.css";
import { TabelasEscola, BarraPesquisa } from "@/components/Tabela";
import { getTodasTurmasEscola } from "@/services/turmaService";
import { useEffect, useState } from "react";

export default function Home() {
  const [idEscola, setIdEscola] = useState(null);
  const [turmas, setTurmas] = useState(null);
  
  useEffect(() => {
    const id = sessionStorage.getItem("idEscola");
    setIdEscola(id);

    (async () => {
          try {
            const dados = await getTodasTurmasEscola(id);
            setTurmas(dados);
          } catch (err) {
            console.error("Erro ao buscar turmas:", err);
            setTurmas([]);
          }
        })();
  }, []);
  
  const mostrarTurmas = turmas ?? [];
  //const turmas = [{id : 1, anoEscolar: '1º ano', turma: 'A'}];

  return (
    <main>
      <MenuEscola/>
      <div className={styles.container}>
        <Link className={styles.fakeButton} href="/escola/turmas/cadastro">Cadastrar Nova Turma</Link>
        <table className={styles.table}>
          <thead>
            <BarraPesquisa col={"3"}/>
            <tr>
              <th className={styles.title}>Código</th>
              <th className={styles.title}>Ano Escolar</th>
              <th className={styles.title}>Turma</th>
              <th></th>
            </tr>
          </thead>
          <TabelasEscola dados={mostrarTurmas} tipo={"turmas"}/>
        </table>
      </div>
    </main>
  );
}
