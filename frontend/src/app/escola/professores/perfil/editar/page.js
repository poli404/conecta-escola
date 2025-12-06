'use client';
import { useState } from 'react';
import { MenuEscola } from "@/components/MenuEscola";
import styles from "./page.module.css";
import { useSearchParams } from 'next/navigation';
import { atualizarProfessor, getProfessor } from '@/services/professorService';
import { getDisciplinasProfessor } from '@/services/disciplinaService';

export default function Home() {
  const searchParams = useSearchParams();
  const idProfessor = searchParams.get('id');
  //const professor = getProfessor(idProfessor);
  const professor = {id: 1, nome: "Dante Medeiros Filho", cpf: "836.347.920-94", rg: "13.210.609-7", endereco: "Rua Santa Edwirges, Parque Industrial", telefone: "(43) 92569-8222"};

  const disciplinas = getDisciplinasProfessor(idProfessor);

  const [formData, setFormData] = useState({
      nome: professor.nome,
      cpf: professor.cpf,
      rg: professor.rg,
      genero: professor.genero,
      endereco: professor.endereco,
      cep: professor.cep,
      nascimento: professor.nascimento,
      telefone: professor.telefone,
      formacao: professor.formacao,
      disciplinas: ['matematica'],
    });
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      
      const resultado = await atualizarProfessor(idProfessor, formData);
      if (resultado.status === 203) {
        alert('Professor cadastrado com sucesso!');
      } else {
        alert('Erro ao cadastrar professor');
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
        <h1>Editar Informações de Professor</h1>
        <form className={styles.forms} onSubmit={handleSubmit}>
          <div>
            <h3 className={styles.title}>Informações Pessoais</h3>
            <label htmlFor="nome">Nome:</label>
            <input className={styles.field} type="text" id="nome" name="nome" value={formData.nome} onChange={handleChange} required/>
            <div className={styles.linha}>
              <label htmlFor="genero">Gênero:</label>
              <select id="genero" className={`${styles.field} ${styles.mini}`} name="genero" value={formData.genero} onChange={handleChange} required>
                <option value="feminino">Feminino</option>
                <option value="masculino">Masculino</option>
                <option value="outro">Outro</option>
              </select>
            </div>
            <label htmlFor="endereco">Endereço:</label>
            <input className={styles.field} type="text" id="endereco" name="endereco" value={formData.endereco} onChange={handleChange} required/>
            <div className={styles.linha}>
              <label htmlFor="cep">CEP:</label>
              <input className={`${styles.field} ${styles.mini}`} type="text" id="cep" name="cep" placeholder="12345-678" value={formData.cep} onChange={handleChange} required/>
            </div>
            <h3 className={styles.title}>Informações de Contato</h3>
            <label htmlFor="telefone">Telefone:</label>
            <input className={styles.field} type="tel" id="telefone" name="telefone" placeholder="(99) 99999-9999" value={formData.telefone} onChange={handleChange} required/>
            <label htmlFor="email">E-Mail:</label>
            <input className={styles.field} type="email" id="email" name="email" placeholder="" value={formData.email} onChange={handleChange} required/>
            <h3 className={styles.title}>Informações Profissionais</h3>
            <label htmlFor="disciplinas">Disciplinas Lecionadas:</label>
            <select id="disciplinas" className={styles.field} name="disciplinas" value={formData.disciplinas} onChange={handleChange} multiple>
              <option value="matematica">Matemática</option>
              <option value="portugues">Português</option>
              <option value="ciencias">Ciências</option>
              <option value="historia">História</option>
              <option value="geografia">Geografia</option>
              <option value="ingles">Inglês</option>
              <option value="educacaoFisica">Educação Física</option>
            </select>
          </div>
          <button type="submit">Editar Professor</button>
        </form>
      </div>
    </main>
  );
}
