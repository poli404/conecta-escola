import { MenuEscola } from "@/components/MenuEscola";
import styles from "./page.module.css";

// Disciplinas -> listar todas as disciplinas cadastradas no sistema

export default function Home() {
  return (
    <main>
      <MenuEscola/>
            <div className={styles.container}>
        <h1>Cadastro de Novo Professor</h1>
        <form className={styles.forms}>
          <div>
            <h3 className={styles.title}>Informações Pessoais</h3>
            <label htmlFor="nome">Nome:</label>
            <input className={styles.field} type="text" id="nome" name="nome" required/>
            <div className={styles.linha}>
              <label htmlFor="cpf">CPF:</label>
              <input className={`${styles.field} ${styles.mini}`} type="text" id="cpf" name="cpf" placeholder="123.456.789-10" required/>
              <label htmlFor="rg">RG:</label>
              <input className={`${styles.field} ${styles.mini}`} type="text" id="rg" name="rg" placeholder="12.345.678-9" required/>
            </div>
            <div className={styles.linha}>
              <label htmlFor="sexo">Sexo:</label>
              <select id="sexo" className={`${styles.field} ${styles.mini}`} name="sexo" defaultValue="feminino" required>
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
            <h3 className={styles.title}>Informações de Contato</h3>
            <label htmlFor="telefone">Telefone:</label>
            <input className={styles.field} type="tel" id="telefone" name="telefone" placeholder="(99) 99999-9999" required/>
            <label htmlFor="email">E-Mail:</label>
            <input className={styles.field} type="email" id="email" name="email" placeholder="" required/>
            <h3 className={styles.title}>Informações Profissionais</h3>
            <label htmlFor="formacao">Formação Acadêmica:</label>
            <input className={styles.field} type="text" id="formacao" name="formacao" placeholder="Licenciatura em Matemática" required/>
            <label htmlFor="disciplinas">Disciplinas Lecionadas:</label>
            <select id="disciplinas" className={styles.field} name="disciplinas" multiple>
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
