import styles from './menuEscola.module.css';

export const MenuEscola = () => {
  return (
    <div>
        <label htmlFor="uf">UF:</label>
        <select id="uf" className={styles.field} name="uf" required>
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
    );
}