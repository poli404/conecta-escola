'use client';
import { useState } from 'react';
import { MenuEscola } from "@/components/MenuEscola";
import styles from "./page.module.css";

async function cadastrarProfessor(dadosProfessor) {
  const response = await fetch('http://127.0.0.1:8000/professor/cadastro', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dadosProfessor)
  });
  console.log(response.status);

  return response;
}

async function getDisciplinas(escola) {
  const response = await fetch('http://localhost:8000/disciplinas', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  });

  const disciplinas = response.body;
}

export default function Home() {
  const [professor, setFormData] = useState({
      nome: '',
      cpf: '',
      rg: '',
      genero: 'feminino',
      cor: 'parda',
      endereco: '',
      cep: '',
      uf: 'acre',
      nascimento: '',
      telefone: '',
      email: '',
      escola: '',
      formacao: '',
      disciplinas: [],
      senha: Math.random().toString(36).slice(-20)
    });
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      //formData.escola = //sessionStorage.getItem('id');
      const resultado = await cadastrarProfessor(formData);
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
        <h1>Editar Informações de Professor</h1>
        <form className={styles.forms} onSubmit={handleSubmit}>
          <div>
            <h3 className={styles.title}>Informações Pessoais</h3>
            <label htmlFor="nome">Nome:</label>
            <input className={styles.field} type="text" id="nome" name="nome" value={professor.nome} onChange={handleChange} required/>
            <div className={styles.linha}>
              <label htmlFor="genero">Gênero:</label>
              <select id="genero" className={`${styles.field} ${styles.mini}`} name="genero" value={professor.genero} onChange={handleChange} required>
                <option value="feminino">Feminino</option>
                <option value="masculino">Masculino</option>
                <option value="outro">Outro</option>
              </select>
            </div>
            <label htmlFor="endereco">Endereço:</label>
            <input className={styles.field} type="text" id="endereco" name="endereco" value={professor.endereco} onChange={handleChange} required/>
            <div className={styles.linha}>
              <label htmlFor="cep">CEP:</label>
              <input className={`${styles.field} ${styles.mini}`} type="text" id="cep" name="cep" placeholder="12345-678" value={professor.cep} onChange={handleChange} required/>
            </div>
            <h3 className={styles.title}>Informações de Contato</h3>
            <label htmlFor="telefone">Telefone:</label>
            <input className={styles.field} type="tel" id="telefone" name="telefone" placeholder="(99) 99999-9999" value={professor.telefone} onChange={handleChange} required/>
            <label htmlFor="email">E-Mail:</label>
            <input className={styles.field} type="email" id="email" name="email" placeholder="" value={professor.email} onChange={handleChange} required/>
            <h3 className={styles.title}>Informações Profissionais</h3>
            <label htmlFor="disciplinas">Disciplinas Lecionadas:</label>
            <select id="disciplinas" className={styles.field} name="disciplinas" value={professor.disciplinas} onChange={handleChange} multiple>
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
