"use client";
import { MenuResponsavel } from '@/components/MenuResponsavel';
import { getAlunosResponsavel } from '@/services/alunoService';
import { useSearchParams } from 'next/navigation';

export default function ResponsavelPage() {
  const searchParams = useSearchParams();
  const responsavel = searchParams.get("id");
  //const alunos = getAlunosResponsavel(responsavel);
  const alunos = [{id: 1, nome: "Elisa"}, {id: 2, nome : "Constantino"}];

  return (
    <MenuResponsavel alunos={alunos}/>
  );
}