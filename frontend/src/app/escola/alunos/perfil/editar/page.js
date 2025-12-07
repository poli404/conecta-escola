'use client';
import { useState } from 'react';
import { MenuEscola } from "@/components/MenuEscola";
import styles from "./page.module.css";
import { atualizarAluno, getAluno } from '@/services/alunoService';
import { useSearchParams } from 'next/navigation';

export default function Home() {
  const searchParams = new useSearchParams();
  const idAluno = searchParams.get('idAluno');
  //const aluno = getAluno(idAluno);
  const aluno = {id: 1, nome: "Maria Eduarda de Mello Policante", cpf: "143.742.909-23", cep:"87020-016", endereco: "Rua Horário Hacanello, 5350 - 1403", telefone: "(44) 99935-5633", tipoSangue: "O+", anoEscolar: "9", turma: "A", deficiencia: "Altas Habilidades", alergia: null};
  
  const [formData, setFormData] = useState({
      nome: aluno.nome,
      genero: aluno.genero,
      telefone: aluno.telefone,
      endereco: aluno.endereco,
      cep: aluno.cep,
      deficiencia: aluno.deficiencia || 'N/A',
      alergia: aluno.alergia || 'N/A',
      anoEscolar: aluno.anoEscolar
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resultado = await atualizarAluno(idAluno, formData);
    if (resultado != null) {
      alert('Informações do aluno alteradas com sucesso!');
    } else {
      alert('Erro ao alterar informações do aluno!');
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
        <h3>Editar Aluno - {aluno.nome}</h3>
        <form className={styles.forms} onSubmit={handleSubmit}>
          <div className={styles.coluna}>
            <h3 className={styles.title}>Informações Pessoais</h3>
            <label htmlFor="nome">Nome:</label>
            <input className={styles.field} type="text" id="nome" name="nome" value={formData.nome} onChange={handleChange} required/>
            <label htmlFor="genero">Gênero:</label>
            <select id="genero" className={`${styles.field} ${styles.mini}`} name="genero" value={formData.genero} onChange={handleChange} required>
              <option value="feminino">Feminino</option>
              <option value="masculino">Masculino</option>
              <option value="outro">Outro</option>
            </select>
            <label htmlFor="telefone">Telefone do Responsável:</label>
            <input className={styles.field} type="tel" id="telefone" name="telefone" placeholder="(99) 99999-9999" value={formData.telefone} onChange={handleChange}/>
            <label htmlFor="endereco">Endereço:</label>
            <input className={styles.field} type="text" id="endereco" name="endereco" value={formData.endereco} onChange={handleChange} required/>
            <label htmlFor="cep">CEP:</label>
            <input className={`${styles.field} ${styles.mini}`} type="text" id="cep" name="cep" placeholder="12345-678" value={formData.cep} onChange={handleChange} required/>
            <label htmlFor="vacinacao">Carteira de Vacinação:</label>
            <input className={styles.field} type="file" id="vacinacao" name="vacinacao"/>
          </div>
          <div className={styles.coluna}>
            <h3 className={styles.title}>Outras Informações</h3>
            <label htmlFor="deficiencia">Possui alguma deficiência?</label>
            <input className={styles.field} type="text" id="deficiencia" name="deficiencia" placeholder="N/A" value={formData.deficiencia} onChange={handleChange} required/>
            <label htmlFor="alergia">Possui alergias?</label>
            <input className={styles.field} type="text" id="alergia" name="alergia" placeholder="N/A" value={formData.alergia} onChange={handleChange} required/>
            <label>Ano Escolar:</label>
            <input className={`${styles.field} ${styles.mini}`} type="number" min="1" max="3" id="anoEscolar" name="anoEscolar" value={formData.anoEscolar} onChange={handleChange}/>
            <label htmlFor="historicoEscolar">Histórico Escolar:</label>
            <input className={styles.field} type="file" id="historicoEscolar" name="historicoEscolar"/>
            <button type="submit">Editar Aluno</button>
          </div>
        </form>
      </div>
    </main>
  );
}
