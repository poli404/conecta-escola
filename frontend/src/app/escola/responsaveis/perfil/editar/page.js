'use client';
import { useState } from 'react';
import { MenuEscola } from "@/components/MenuEscola";
import styles from "./page.module.css";

export default function Home() {
  const [responsavel, setFormData] = useState({
      nome: '',
      cpf: '',
      rg: '',
      genero: 'feminino',
      cor: 'parda',
      telefone: '',
      endereco: '',
      cep: '',
      uf: 'parana',
      nascimento: '',
      aluno: '',
      email: '',
      estadoCivil: '',
      senha: Math.random().toString(36).slice(-10)
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //const resultado = await cadastrarEscola(formData);
      alert('Responsável alterado com sucesso!');
    } catch (erro) {
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
        <h1>Editar Informações de Responsável</h1>
        <form className={styles.forms} onSubmit={handleSubmit}>
          <div>
            <h3 className={styles.title}>Informações Pessoais</h3>
            <label htmlFor="nome">Nome:</label>
            <input className={styles.field} type="text" id="nome" name="nome" value={responsavel.nome} onChange={handleChange} required/>
            <div className={styles.linha}>
              <label htmlFor="genero">Gênero:</label>
              <select id="genero" className={`${styles.field} ${styles.mini}`} name="genero" value={responsavel.genero} onChange={handleChange} required>
                <option value="feminino">Feminino</option>
                <option value="masculino">Masculino</option>
                <option value="outro">Outro</option>
              </select>
            </div>
            <label htmlFor="endereco">Endereço:</label>
            <input className={styles.field} type="text" id="endereco" name="endereco" required/>
            <div className={styles.linha}>
              <label htmlFor="cep">CEP:</label>
              <input className={`${styles.field} ${styles.mini}`} type="text" id="cep" name="cep" placeholder="12345-678" required/>
            </div>
            <label htmlFor="estadoCivil">Estado Civil:</label>
            <select className={styles.field} name="estadoCivil">
              <option>Casada(o)</option>
              <option>Divorciada(o)</option>
              <option>Solteira(o)</option>
              <option>Viúva(o)</option>
            </select>
            <div className={styles.linha}>
              <label htmlFor="telefone">Telefone:</label>
              <input className={`${styles.field} ${styles.mini}`} type="tel" id="telefone" name="telefone" placeholder="(99) 99999-9999" required/>
            </div>
          </div>
          <button type="submit">Editar Resposável</button>
        </form>
      </div>
    </main>
  );
}
