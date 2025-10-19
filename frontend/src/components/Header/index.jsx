import styles from './header.module.css';
import logo from '../../../public/logo_branca.png';
import Image from 'next/image';

export const Header = () => {
  return (
    <div className={styles.header}>
        <Image className={styles.logo} src={logo} alt="Logo do Conecta Escola" />
        <h2>Conecta Escola</h2>
    </div>
    );
}