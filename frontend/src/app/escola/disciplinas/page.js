'use client';
import { MenuEscola } from "@/components/MenuEscola";
import Link from "next/link";
import styles from "./page.module.css";
import { TabelasEscola, BarraPesquisa } from "@/components/Tabela";
import { getTodasDisciplinasEscola } from "@/services/disciplinaService";
import { useState, useEffect } from "react";

export default function Home() {
  const [idEscola, setIdEscola] = useState(null);
  const [disciplinas, setDisciplinas] = useState(null);

  useEffect(() => {
    const id = sessionStorage.getItem("idEscola");
    setIdEscola(id);

    (async () => {
          try {
            const dados = await getTodasDisciplinasEscola(id);
            setDisciplinas(dados);
          } catch (err) {
            console.error("Erro ao buscar disciplinas:", err);
            setDisciplinas([]);
          }
        })();
    }, []);

  const mostrarDisciplinas = disciplinas ?? [];

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
          <TabelasEscola dados={mostrarDisciplinas} tipo="disciplinas"/>
        </table>
      </div>
    </main>
  );
}
