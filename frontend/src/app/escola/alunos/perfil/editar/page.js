'use client';
import { useState } from 'react';
import { MenuEscola } from "@/components/MenuEscola";
import styles from "./page.module.css";
import { getAluno } from '@/services/alunoService';

export default function Home() {
  const [aluno, setFormData] = useState({
      nome: '',
      genero: 'feminino',
      telefone: '',
      endereco: '',
      cep: '',
      deficiencia: 'N/A',
      alergia: 'N/A',
      anoEscolar: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resultado = await getAluno(formData);
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
        <h1>Editar Aluno Existente</h1>
        <form className={styles.forms} onSubmit={handleSubmit}>
          <div>
            <h3 className={styles.title}>Informações Pessoais</h3>
            <label htmlFor="nome">Nome:</label>
            <input className={styles.field} type="text" id="nome" name="nome" value={aluno.nome} onChange={handleChange} required/>
            <div className={styles.linha}>
              <label htmlFor="genero">Gênero:</label>
              <select id="genero" className={`${styles.field} ${styles.mini}`} name="genero" value={aluno.genero} onChange={handleChange} required>
                <option value="feminino">Feminino</option>
                <option value="masculino">Masculino</option>
                <option value="outro">Outro</option>
              </select>
            </div>
            <label htmlFor="telefone">Telefone do Responsável:</label>
            <input className={styles.field} type="tel" id="telefone" name="telefone" placeholder="(99) 99999-9999" value={aluno.telefone} onChange={handleChange}/>
            <label htmlFor="endereco">Endereço:</label>
            <input className={styles.field} type="text" id="endereco" name="endereco" value={aluno.endereco} onChange={handleChange} required/>
            <div className={styles.linha}>
              <label htmlFor="cep">CEP:</label>
              <input className={`${styles.field} ${styles.mini}`} type="text" id="cep" name="cep" placeholder="12345-678" value={aluno.cep} onChange={handleChange} required/>
            </div>
            <label htmlFor="vacinacao">Carteira de Vacinação:</label>
            <input className={styles.field} type="file" id="vacinacao" name="vacinacao"/>
            <label htmlFor="deficiencia">Possui alguma deficiência?</label>
            <input className={styles.field} type="text" id="deficiencia" name="deficiencia" placeholder="N/A" value={aluno.deficiencia} onChange={handleChange} required/>
            <label htmlFor="alergia">Possui alergias?</label>
            <input className={styles.field} type="text" id="alergia" name="alergia" placeholder="N/A" value={aluno.alergia} onChange={handleChange} required/>
            <h3 className={styles.title}>Informações Escolares</h3>
            <div className={styles.linha}>
              <label>Ano Escolar:</label>
              <input className={`${styles.field} ${styles.mini}`} type="number" min="1" max="3" id="anoEscolar" name="anoEscolar" value={aluno.anoEscolar} onChange={handleChange}/>
            </div><br></br>
            <label htmlFor="historicoEscolar">Histórico Escolar:</label>
            <input className={styles.field} type="file" id="historicoEscolar" name="historicoEscolar"/>
          </div>
          <button type="submit">Editar Aluno</button>
        </form>
      </div>
    </main>
  );
}
