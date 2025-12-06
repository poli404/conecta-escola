"use client";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MenuEscola } from "@/components/MenuEscola";
import styles from "./page.module.css";
import { getProfessor } from "@/services/professorService";

export default function Home() {
    const searchParams = useSearchParams();
    const idProfessor = searchParams.get("id");
    //const aluno = getAluno(idAluno);

    const professor = {id: 1, nome: "Dante Medeiros Filho", cpf: "836.347.920-94", rg: "13.210.609-7", endereco: "Rua Santa Edwirges, Parque Industrial", telefone: "(43) 92569-8222"};
    
    return (
        <main>
            <MenuEscola/>
            <div className={styles.container}>
                <Link className={styles.fakeButton} href="/escola/professores/perfil/editar">Editar Dados</Link>
                <div className={styles.card}>
                    <div>
                        <p><b>Nome:</b> {professor.nome}</p>
                        <p><b>CPF:</b> {professor.cpf}</p>
                        <p><b>RG:</b> {professor.rg}</p>
                        <p><b>Endereço:</b> {professor.endereco}</p>
                        <p><b>Telefone:</b> {professor.telefone}</p>
                        <p><b>Formação:</b> {professor.formacao}</p>
                    </div>
                </div>
            </div>
        </main>
    );
}