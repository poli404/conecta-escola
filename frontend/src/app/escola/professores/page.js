"use client";

import React, { useEffect, useState } from "react";
import { MenuEscola } from "@/components/MenuEscola";
import { TabelasEscola, BarraPesquisa } from "@/components/Tabela";
import Link from "next/link";
import styles from "./page.module.css";
import { getTodosProfessoresEscola } from "@/services/professorService";

export default function Home() {
  const [idEscola, setIdEscola] = useState(null);
  const [professores, setProfessores] = useState(null);

  useEffect(() => {
    const id = sessionStorage.getItem("idEscola");
    setIdEscola(id);

    (async () => {
      try {
        const dados = await getTodosProfessoresEscola(id);
        setProfessores(dados);
      } catch (err) {
        console.error("Erro ao buscar professores:", err);
        setProfessores([]);
      }
    })();
  }, []);

  // enquanto carrega, professores === null
  const mostrarProfessores = professores ?? [];

  return (
    <main>
      <MenuEscola />
      <div className={styles.container}>
        <Link className={styles.fakeButton} href="/escola/professores/cadastro">Cadastrar Novo Professor</Link>

        <table className={styles.table}>
          <thead>
            <BarraPesquisa col="2"/>
            <tr>
              <th className={styles.title}>Nome</th>
              <th className={styles.title}>CPF</th>
              <th className={styles.title}/>
            </tr>
          </thead>
          <TabelasEscola dados={mostrarProfessores} tipo={"professores"} />
        </table>
      </div>
    </main>
  );
}
