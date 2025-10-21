'use client';
import styles from "./page.module.css";
import { useState } from 'react';

async function cadastrarEscola(dadosEscola) {
  const response = await fetch('http://localhost:8000/escola/cadastro', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dadosEscola)
  });
  console.log('Response status:', response.json());
  return response.json();
}

export default function Home() {
  const [formData, setFormData] = useState({
    nome: '',
    endereco: '',
    cnpj: '',
    dominio: '',
    senha: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      e.target.confirmacao.value != formData.senha && alert('As senhas não coincidem!');
      const resultado = await cadastrarEscola(formData);
      alert('Escola cadastrada com sucesso!');
    } catch (erro) {
      alert('Erro ao cadastrar escola');
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
      <div className={styles.container}>
        <h1>Cadastro de Nova Escola</h1>
        <form className={styles.forms} onSubmit={handleSubmit}>
          <div>
            <h3 className={styles.title}>Informações da Escola</h3>
            <label htmlFor="nome">Nome da Escola:</label>
            <input className={styles.field} type="text" id="nome" name="nome" value={formData.nome} onChange={handleChange} required/>
            <label htmlFor="endereco">Endereço:</label>
            <input className={styles.field} type="text" id="endereco" name="endereco" value={formData.endereco} onChange={handleChange} required/>
            <label htmlFor="cnpj">CNPJ:</label>
            <input className={styles.field} type="text" id="cnpj" name="cnpj" placeholder="XX.XXX.XXX/XXXX-XX" value={formData.cnpj} onChange={handleChange} required/>
            <label htmlFor="dominio">Domínio de E-Mail:</label>
            <input className={styles.field} type="text" id="dominio" name="dominio" placeholder="@nomeDaEscola.com" value={formData.dominio} onChange={handleChange} required/>
            <h3 className={styles.title}>Definição de Senha</h3>
            <label htmlFor="senha">Defina uma nova senha:</label>
            <input className={styles.field} type="password" id="senha" name="senha" value={formData.senha} onChange={handleChange} required/>
            <label htmlFor="confirmacao">Confirme a senha:</label>
            <input className={styles.field} type="password" id="confirmacao" name="confirmacao" required/>
          </div>
          <button type="submit">Cadastrar Escola</button>
        </form>
      </div>
    </main>
  );
}

