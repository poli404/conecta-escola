"use client";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MenuEscola } from "@/components/MenuEscola";
import styles from "./page.module.css";
import { getAlunosResponsavel } from "@/services/responsavelService";

export default function Home() {
    const searchParams = useSearchParams();
    const idResponsavel = searchParams.get("id");
    //const aluno = getResponsavel(idResponsavel);

    const responsavel = {id: 1, nome: "Sulema de Mello Amaro Policante" , cpf: "143.742.909-23", rg: "19.225.260-4", telefone: "(44)999355633", endereco: "Rua Horário Hacanello, 5350 - 1403", estadoCivil: "Casado(a)"};
    const aluno = {id: 1, nome: "Maria Eduarda de Mello Policante", cpf: "143.742.909-23"};

    return (
        <main>
            <MenuEscola/>
            <div className={styles.container}>
                <Link className={styles.fakeButton} href={`/escola/responsaveis/perfil/editar?id=${idResponsavel}`}>Editar Dados</Link>
                <div className={styles.card}>
                    <div>
                        <p><b>Nome:</b> {responsavel.nome}</p>
                        <p><b>CPF:</b> {responsavel.cpf}</p>
                        <p><b>RG:</b> {responsavel.rg}</p>
                        <p><b>Telefone:</b> {responsavel.telefone}</p>
                        <p><b>Endereço:</b> {responsavel.endereco}</p>
                        <p><b>Estado Civil:</b> {responsavel.estadoCivil}</p>
                    </div>
                </div>
                <div className={styles.card}>
                    <a className={styles.title} href={`/escola/alunos/perfil?id=${responsavel.aluno}`}>Aluno</a>
                    <div>
                        <p><b>Nome:</b> {aluno.nome}</p>
                        <p><b>CPF:</b> {aluno.cpf}</p>
                    </div>
                </div>
            </div>
        </main>
    );
}