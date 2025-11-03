'use client';
import { useState } from 'react';
import { MenuEscola } from "@/components/MenuEscola";
import styles from "./page.module.css";

export default function Home() {
  const [formData, setFormData] = useState({
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
      <MenuEscola/>
        <div className={styles.container}>
        <h1>Cadastro de Novo Responsável</h1>
        <form className={styles.forms} onSubmit={handleSubmit}>
          <div>
            <h3 className={styles.title}>Informações Pessoais</h3>
            <label htmlFor="nome">Nome:</label>
            <input className={styles.field} type="text" id="nome" name="nome" value={formData.nome} onChange={handleChange} required/>
            <div className={styles.linha}>
              <label htmlFor="cpf">CPF:</label>
              <input className={`${styles.field} ${styles.mini}`} type="text" id="cpf" name="cpf" placeholder="123.456.789-10" required/>
              <label htmlFor="rg">RG:</label>
              <input className={`${styles.field} ${styles.mini}`} type="text" id="rg" name="rg" placeholder="12.345.678-9" required/>
            </div>
            <div className={styles.linha}>
              <label htmlFor="genero">Gênero:</label>
              <select id="genero" className={`${styles.field} ${styles.mini}`} name="genero" value={formData.genero} onChange={handleChange} required>
                <option value="feminino">Feminino</option>
                <option value="masculino">Masculino</option>
                <option value="outro">Outro</option>
              </select>
              <label htmlFor="cor">Cor/Raça:</label>
              <select id="cor" className={`${styles.field} ${styles.mini}`} name="cor" value={formData.cor} onChange={handleChange} required>
                <option value="amarela">Amarela</option>
                <option value="indigena">Indígena</option>
                <option value="branca">Branca</option>
                <option value="parda">Parda</option>
                <option value="preta">Preta</option>
              </select>
            </div>
            <label htmlFor="endereco">Endereço:</label>
            <input className={styles.field} type="text" id="endereco" name="endereco" required/>
            <div className={styles.linha}>
              <label htmlFor="cep">CEP:</label>
              <input className={`${styles.field} ${styles.mini}`} type="text" id="cep" name="cep" placeholder="12345-678" required/>
              <label htmlFor="uf">UF:</label>
              <select id="uf" className={`${styles.field} ${styles.mini}`} value={formData.uf} onChange={handleChange} name="uf" required>
                <option value="acre">AC</option>
                <option value="alagoas">AL</option>
                <option value="amapa">AP</option>
                <option value="amazonas">AM</option>
                <option value="bahia">BA</option>
                <option value="ceara">CE</option>
                <option value="df">DF</option>
                <option value="espirito">ES</option>
                <option value="goias">GO</option>
                <option value="maranhao">MA</option>
                <option value="matoGrosso">MT</option>
                <option value="matoGrossoSul">MS</option>
                <option value="minas">MG</option>
                <option value="para">PA</option>
                <option value="paraiba">PB</option>
                <option value="parana">PR</option>
                <option value="pernambuco">PE</option>
                <option value="piaui">PI</option>
                <option value="rioJaneiro">RJ</option>
                <option value="rioGrandeNorte">RN</option>
                <option value="rioGrandeSul">RS</option>
                <option value="rondonia">RO</option>
                <option value="roraima">RR</option>
                <option value="santa">SC</option>
                <option value="sao">SP</option>
                <option value="sergipe">SE</option>
                <option value="tocantins">TO</option>
              </select>
            </div>
            <label htmlFor="estadoCivil">Estado Civil:</label>
            <select className={styles.field} name="estadoCivil">
              <option>Casada(o)</option>
              <option>Divorciada(o)</option>
              <option>Solteira(o)</option>
              <option>Viúva(o)</option>
            </select>
            <label htmlFor="nascimento">Data de Nascimento:</label>
            <input className={styles.field} type="date" id="nascimento" name="nascimento" required/>
            <div className={styles.linha}>
              <label htmlFor="email">Email:</label>
              <input className={`${styles.field} ${styles.mini}`} type="email" id="email" name="email" placeholder="nome@gmail.com" required/>
              <label htmlFor="telefone">Telefone:</label>
              <input className={`${styles.field} ${styles.mini}`} type="tel" id="telefone" name="telefone" placeholder="(99) 99999-9999" required/>
            </div>
          </div>
          <button type="submit">Cadastrar Resposável</button>
        </form>
      </div>
    </main>
  );
}
