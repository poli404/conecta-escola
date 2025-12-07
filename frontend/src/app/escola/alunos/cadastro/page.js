'use client';
import { useEffect, useState } from 'react';
import { MenuEscola } from "@/components/MenuEscola";
import styles from "./page.module.css";
import { cadastrarAluno } from '@/services/alunoService';
import { getResponsaveisEscola } from '@/services/responsavelService';

export default function Home() {
  const [idEscola, setIdEscola] = useState(null);
  const [responsaveis, setResponsaveis] = useState(null);
    
  useEffect(() => {
      const id = sessionStorage.getItem("idEscola");
      setIdEscola(id);
  
      (async () => {
        try {
          const dados = await getResponsaveisEscola(id);
          setResponsaveis(dados);
        } catch (err) {
          console.error("Erro ao buscar professores:", err);
          setResponsaveis([]);
        }
      })();
    }, []);
  
    const mostrarResponsaveis = responsaveis ?? [];

  const [formData, setFormData] = useState({
      nome: '',
      cpf: '',
      rg: '',
      genero: 'FEMININO',
      corRaca: 'PARDA',
      telefone: '',
      endereco: '',
      cep: '',
      uf: 'PR',
      dataNasc: '',
      nacionalidade: 'Brasileira',
      naturalidade: '',
      tipoSanguineo: 'O+',
      deficiencia: 'N/A',
      alergia: 'N/A',
      carteiraVacinacao: '',
      certidaoNascimento: '',
      situacaoAnoAnterior: 'true',
      historicoEscolar: '',
      id_escola: '',
      id_responsavel: '',
      senha: Math.random().toString(36).slice(-10)
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem('access_token');
    formData.id_escola = idEscola;
    const resultado = await cadastrarAluno(formData, token);
    if (resultado != null) {
      alert(`Aluno cadastrado com sucesso! Senha: ${formData.senha}`);
    } else {
      alert('Erro ao cadastrar aluno!');
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
            <label htmlFor="telefone">Telefone do Responsável:</label>
            <input className={styles.field} type="tel" id="telefone" name="telefone" placeholder="(99) 99999-9999" value={formData.telefone} onChange={handleChange}/>
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
            <label htmlFor="certidaoNascimento">Certidão de Nascimento:</label>
            <input className={styles.field} type="file" id="certidaoNascimento" name="certidaoNascimento"/>
            <label htmlFor="nacionalidade">Nacionalidade:</label>
            <input className={styles.field} type="text" id="nacionalidade" name="nacionalidade" placeholder="Brasileira(o)" value={formData.nacionalidade} onChange={handleChange} required/>
            <label htmlFor="naturalidade">Naturalidade:</label>
            <input className={styles.field} type="text" id="naturalidade" name="naturalidade" placeholder="Maringá" value={formData.naturalidade} onChange={handleChange} required/>
            <label>Responsável:</label>
            <select className={styles.field} id="id_responsavel" name="id_responsavel" onChange={handleChange}>
              {
                mostrarResponsaveis.map((r) => <option key={r.cpf} value={r.cpf}>{r.nome}</option>)
              }
            </select>
            <h3 className={styles.title}>Informações de Saúde</h3>
            <label htmlFor="tipoSanguineo">Tipo Sanguíneo:</label>
            <select id="tipoSanguineo" className={styles.field} name="tipoSanguineo" value={formData.tipoSanguineo} onChange={handleChange} required>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
            <label htmlFor="carteiraVacinacao">Carteira de Vacinação:</label>
            <input className={styles.field} type="file" id="carteiraVacinacao" name="carteiraVacinacao"/>
            <label htmlFor="deficiencia">Possui alguma deficiência?</label>
            <input className={styles.field} type="text" id="deficiencia" name="deficiencia" placeholder="N/A" value={formData.deficiencia} onChange={handleChange} required/>
            <label htmlFor="alergia">Possui alergias?</label>
            <input className={styles.field} type="text" id="alergia" name="alergia" placeholder="N/A" value={formData.alergia} onChange={handleChange} required/>
            <h3 className={styles.title}>Informações Escolares</h3>
            <label>Situação no ano anterior:</label>
            <select id="situacaoAnoAnterior" className={`${styles.field} ${styles.mini}`} name="situacaoAnoAnterior" value={formData.situacaoAnoAnterior} onChange={handleChange} required>
              <option value="true">Aprovado</option>
              <option value="false">Reprovado</option>
            </select>
            <label htmlFor="historicoEscolar">Histórico Escolar:</label>
            <input className={styles.field} type="file" id="historicoEscolar" name="historicoEscolar"/>
          </div>
          <button type="submit">Cadastrar Aluno</button>
        </form>
      </div>
    </main>
  );
}
