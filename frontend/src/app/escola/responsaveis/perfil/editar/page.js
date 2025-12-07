'use client';
import { useState } from 'react';
import { MenuEscola } from "@/components/MenuEscola";
import styles from "./page.module.css";
import { useSearchParams } from 'next/navigation';
import { atualizarResponsavel, getResponsavel } from '@/services/responsavelService';

export default function Home() {
  const searchParams = useSearchParams();
  const idResponsavel = searchParams.get("id");
  //const responsavel = getResponsavel(idResponsavel);
  const responsavel = {id: 1, nome: "Sulema de Mello Amaro Policante" , cpf: "143.742.909-23", rg: "19.225.260-4", telefone: "(44)999355633", endereco: "Rua Horário Hacanello, 5350 - 1403", cep: "87020-016", estadoCivil: "Casado(a)"};

  const [formData, setFormData] = useState({
    nome: responsavel.nome,
    cpf: responsavel.cpf,
    rg: responsavel.rg,
    genero: responsavel.genero,
    telefone: responsavel.telefone,
    endereco: responsavel.endereco,
    cep: responsavel.cep,
    nascimento: responsavel.nascimento,
    estadoCivil: responsavel.estadoCivil,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resposta = await atualizarResponsavel(idResponsavel, formData);
    if (resposta) {
      alert('Responsável alterado com sucesso!');
    } else {
      alert('Erro ao alterar responsável');
  }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <main>
      <MenuEscola/>
        <div className={styles.container}>
        <h3>Editar Responsável - {responsavel.nome}</h3>
        <form className={styles.forms} onSubmit={handleSubmit}>
          <div>
            <h3 className={styles.title}>Informações Pessoais</h3>
            <label htmlFor="nome">Nome:</label>
            <input className={styles.field} type="text" id="nome" name="nome" value={formData.nome} onChange={handleChange} required/>
            <div className={styles.linha}>
              <label htmlFor="cpf">CPF:</label>
              <input className={`${styles.field} ${styles.mini}`} type="text" id="cpf" name="cpf" placeholder="123.456.789-10" value={formData.cpf} onChange={handleChange} required/>
              <label htmlFor="rg">RG:</label>
              <input className={`${styles.field} ${styles.mini}`} type="text" id="rg" name="rg" placeholder="12.345.678-9" value={formData.rg} onChange={handleChange} required/>
            </div>
            <label htmlFor="genero">Gênero:</label>
            <select id="genero" className={`${styles.field} ${styles.mini}`} name="genero" value={formData.genero} onChange={handleChange} required>
              <option value="feminino">Feminino</option>
              <option value="masculino">Masculino</option>
              <option value="outro">Outro</option>
            </select>
            <label htmlFor="endereco">Endereço:</label>
            <input className={styles.field} type="text" id="endereco" name="endereco" value={formData.endereco} onChange={handleChange} required/>
            <label htmlFor="cep">CEP:</label>
            <input className={`${styles.field} ${styles.mini}`} type="text" id="cep" name="cep" placeholder="12345-678" value={formData.cep} onChange={handleChange} required/>
            <label htmlFor="estadoCivil">Estado Civil:</label>
            <select className={styles.field} name="estadoCivil">
              <option>Casada(o)</option>
              <option>Divorciada(o)</option>
              <option>Solteira(o)</option>
              <option>Viúva(o)</option>
            </select>
            <label htmlFor="telefone">Telefone:</label>
            <input className={`${styles.field} ${styles.mini}`} type="tel" id="telefone" name="telefone" placeholder="(99) 99999-9999" value={formData.telefone} onChange={handleChange} required/>
          </div>
          <button type="submit">Editar Resposável</button>
        </form>
      </div>
    </main>
  );
}
