"use client";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { MenuEscola } from "@/components/MenuEscola";
import styles from "./page.module.css";
import { getTurmasDisciplina } from "@/services/turmaService";
import { getDisciplina } from "@/services/disciplinaService";
import { useEffect, useState } from "react";

export default function Home() {
    const searchParams = useSearchParams();
    const idDisciplina = searchParams.get("id");
    
    const [disciplina, setDisciplina] = useState(null);
    const [turmas, setTurmas] = useState(null);

    useEffect(() => {
    (async () => {
        try {
        const dados = await getDisciplina(idDisciplina);
        setDisciplina(dados);
        } catch (err) {
        console.error("Erro ao buscar disciplina:", err);
        setDisciplina([]);
        }
    })();
    (async () => {
        try {
            const dados = await getTurmasDisciplina(idDisciplina);
            setTurmas(dados);
        } catch (err) {
            setTurmas([]);
        }
    })();
    }, []);

    const mostrarTurmas = turmas ?? [];
    const mostrarDisciplina = disciplina ?? {};
    const mostrarProfessor = mostrarDisciplina.professor ?? {};

    return (
        <main>
            <MenuEscola/>
            <div className={styles.container}>
                <Link className={styles.fakeButton} href={`/escola/disciplinas/detalhes/editar?id=${mostrarDisciplina.id}`}>Editar Dados</Link>
                <div className={styles.card}>
                    <p><b>Nome:</b> {mostrarDisciplina.descricao}</p>
                    <p><b>Professor:</b> {mostrarProfessor.nome}</p>
                    <p><b>Turmas:</b> {
                        (
                        mostrarTurmas.map((e) => 
                            <li key={e.id} className={styles.item}>{e.ano_escolar}º Ano ({e.identificador})</li>)
                        )}</p>
                </div>
            </div>
        </main>
    );
}