'use client';
import { useState } from 'react';
import { MenuEscola } from "@/components/MenuEscola";
import styles from "./page.module.css";
import { cadastrarProfessor } from '@/services/professorService';
import { getTodasDisciplinasEscola } from '@/services/disciplinaService';

export default function Home() {
  const idEscola = 1;//sessionStorage.getItem('idEscola');
  //const disciplinas = getTodasDisciplinasEscola(idEscola);
  
  const [formData, setFormData] = useState({
      nome: '',
      cpf: '',
      rg: '',
      genero: 'FEMININO',
      corRaca: 'PARDA',
      endereco: '',
      cep: '',
      uf: 'PR',
      dataNasc: '',
      telefone: '',
      emailPessoal: '',
      id_escola: idEscola,
      graduacao: '',
      cargaHoraria: 40,
      disciplinas: [],
      senha: Math.random().toString(36).slice(-20)
    });
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const token = sessionStorage.getItem('access_token');
      const resultado = await cadastrarProfessor(formData, token);
      if (resultado.status === 201) {
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
        <h1>Cadastro de Novo Professor</h1>
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
            <div className={styles.linha}>
              <label htmlFor="genero">Gênero:</label>
              <select id="genero" className={`${styles.field} ${styles.mini}`} name="genero" value={formData.genero} onChange={handleChange} required>
                <option value="FEMININO">Feminino</option>
                <option value="MASCULINO">Masculino</option>
                <option value="OUTRO">Outro</option>
              </select>
              <label htmlFor="corRaca">Cor/Raça:</label>
              <select id="corRaca" className={`${styles.field} ${styles.mini}`} name="corRaca" value={formData.corRaca} onChange={handleChange} required>
                <option value="PARDA">Parda</option>
                <option value="BRANCA">Branca</option>
                <option value="PRETA">Preta</option>
                <option value="INDIGENA">Indígena</option>
                <option value="AMARELA">Amarela</option>
              </select>
            </div>
            <label htmlFor="endereco">Endereço:</label>
            <input className={styles.field} type="text" id="endereco" name="endereco" value={formData.endereco} onChange={handleChange} required/>
            <div className={styles.linha}>
              <label htmlFor="cep">CEP:</label>
              <input className={`${styles.field} ${styles.mini}`} type="text" id="cep" name="cep" placeholder="12345-678" value={formData.cep} onChange={handleChange} required/>
              <label htmlFor="uf">UF:</label>
              <select id="uf" className={`${styles.field} ${styles.mini}`} name="uf" value={formData.uf} onChange={handleChange} required>
                <option value="AC">AC</option>
                <option value="AL">AL</option>
                <option value="AP">AP</option>
                <option value="AM">AM</option>
                <option value="BA">BA</option>
                <option value="CE">CE</option>
                <option value="DF">DF</option>
                <option value="ES">ES</option>
                <option value="GO">GO</option>
                <option value="MA">MA</option>
                <option value="MT">MT</option>
                <option value="MS">MS</option>
                <option value="MG">MG</option>
                <option value="PA">PA</option>
                <option value="PB">PB</option>
                <option value="PR">PR</option>
                <option value="PE">PE</option>
                <option value="PI">PI</option>
                <option value="RJ">RJ</option>
                <option value="RN">RN</option>
                <option value="RS">RS</option>
                <option value="RO">RO</option>
                <option value="RR">RR</option>
                <option value="SC">SC</option>
                <option value="SP">SP</option>
                <option value="SE">SE</option>
                <option value="TO">TO</option>
              </select>
            </div>
            <label htmlFor="dataNasc">Data de Nascimento:</label>
            <input className={styles.field} type="date" id="dataNasc" name="dataNasc" value={formData.dataNasc} onChange={handleChange} required/>
            <h3 className={styles.title}>Informações de Contato</h3>
            <label htmlFor="telefone">Telefone:</label>
            <input className={styles.field} type="tel" id="telefone" name="telefone" placeholder="(99) 99999-9999" value={formData.telefone} onChange={handleChange} required/>
            <label htmlFor="emailPessoal">E-Mail:</label>
            <input className={styles.field} type="email" id="emailPessoal" name="emailPessoal" placeholder="" value={formData.emailPessoal} onChange={handleChange} required/>
            <h3 className={styles.title}>Informações Profissionais</h3>
            <label htmlFor="graduacao">Formação Acadêmica:</label>
            <input className={styles.field} type="text" id="graduacao" name="graduacao" placeholder="Licenciatura em Matemática" value={formData.graduacao} onChange={handleChange} required/>
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
          <button type="submit">Cadastrar Professor</button>
        </form>
      </div>
    </main>
  );
}
