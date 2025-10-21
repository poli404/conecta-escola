'use client';
import { useState } from 'react';
import { MenuEscola } from "@/components/MenuEscola";
import styles from "./page.module.css";

export default function Home() {
  const [formData, setFormData] = useState({
      nome: '',
      cpf: '',
      rg: '',
      genero: '',
      cor: '',
      telefone: '',
      endereco: '',
      cep: '',
      uf: '',
      nascimento: '',
      nacionalidade: '',
      naturalidade: '',
      tipoSangue: '',
      deficiencia: '',
      alergia: '',
      anoEscolar: '',
      situacaoAnterior: '',
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
        <h1>Cadastro de Novo Aluno</h1>
        <form className={styles.forms}>
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
              <select id="genero" className={`${styles.field} ${styles.mini}`} name="genero" defaultValue="feminino" required>
                <option value="feminino">Feminino</option>
                <option value="masculino">Masculino</option>
                <option value="outro">Outro</option>
              </select>
              <label htmlFor="cor">Cor/Raça:</label>
              <select id="cor" className={`${styles.field} ${styles.mini}`} name="cor" required>
                <option value="parda">Parda</option>
                <option value="branca">Branca</option>
                <option value="preta">Preta</option>
                <option value="indigena">Indígena</option>
                <option value="amarela">Amarela</option>
              </select>
            </div>
            <label htmlFor="telefone">Telefone:</label>
            <input className={styles.field} type="tel" id="telefone" name="telefone" placeholder="(99) 99999-9999" required/>
            <label htmlFor="endereco">Endereço:</label>
            <input className={styles.field} type="text" id="endereco" name="endereco" required/>
            <div className={styles.linha}>
              <label htmlFor="cep">CEP:</label>
              <input className={`${styles.field} ${styles.mini}`} type="text" id="cep" name="cep" placeholder="12345-678" required/>
              <label htmlFor="uf">UF:</label>
              <select id="uf" className={`${styles.field} ${styles.mini}`} name="uf" required>
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
            <label htmlFor="nascimento">Data de Nascimento:</label>
            <input className={styles.field} type="date" id="nascimento" name="nascimento" required/>
            <label htmlFor="certidaoNascimento">Certidão de Nascimento:</label>
            <input className={styles.field} type="file" id="certidaoNascimento" name="certidaoNascimento" required/>
            <label htmlFor="nacionalidade">Nacionalidade:</label>
            <input className={styles.field} type="text" id="nacionalidade" name="nacionalidade" placeholder="Brasileira(o)" required/>
            <label htmlFor="naturalidade">Naturalidade:</label>
            <input className={styles.field} type="text" id="naturalidade" name="naturalidade" placeholder="Brasil" required/>
            <h3 className={styles.title}>Informações de Saúde</h3>
            <label htmlFor="tipoSangue">Tipo Sanguíneo:</label>
            <select id="tipoSangue" className={styles.field} name="tipoSangue" required>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
            <label htmlFor="vacinacao">Carteira de Vacinação:</label>
            <input className={styles.field} type="file" id="vacinacao" name="vacinacao" required/>
            <label htmlFor="deficiencia">Possui alguma deficiência?</label>
            <input className={styles.field} type="text" id="deficiencia" name="deficiencia" placeholder="N/A" required/>
            <label htmlFor="alergia">Possui alergias?</label>
            <input className={styles.field} type="text" id="alergia" name="alergia" placeholder="N/A" required/>
            <h3 className={styles.title}>Informações Escolares</h3>
            <div className={styles.linha}>
              <label>Ano Escolar:</label>
              <input className={`${styles.field} ${styles.mini}`} type="number" id="anoEscolar" name="anoEscolar"/>
              <label>Situação no ano anterior:</label>
              <select id="situacaoAnterior" className={`${styles.field} ${styles.mini}`} name="situacaoAnterior" required>
                <option value="aprovado">Aprovado</option>
                <option value="reprovado">Reprovado</option>
              </select>
            </div><br></br>
            <label htmlFor="historicoEscolar">Histórico Escolar:</label>
            <input className={styles.field} type="file" id="historicoEscolar" name="historicoEscolar" min="1" max="3" required/>
          </div>
          <button type="submit">Cadastrar Aluno</button>
        </form>
      </div>
    </main>
  );
}
