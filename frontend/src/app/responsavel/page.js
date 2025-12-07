"use client";
import { MenuResponsavel } from '@/components/MenuResponsavel';
import { getAlunosResponsavel } from '@/services/alunoService';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ResponsavelPage() {
  const searchParams = useSearchParams();
  
  const [idResponsavel, setIdResponsavel] = useState(null);
  const [alunos, setAlunos] = useState(null);

  useEffect(() => {
    const id = sessionStorage.getItem("idUsuario");
    setIdResponsavel(id);

    (async () => {
          try {
            const dados = await getAlunosResponsavel(id);
            setAlunos(dados);
          } catch (err) {
            console.error("Erro ao buscar disciplinas:", err);
            setAlunos([]);
          }
        })();
    }, []);
  
  const mostrarAlunos = alunos ?? [];

  return (
    <MenuResponsavel alunos={mostrarAlunos}/>
  );
}