// components/Footer.tsx

import React from 'react';
import styles from './footer.module.css';

const Footer: React.FC = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContent}>
                <div className={styles.footerSection}>
                    <h3>Enlaces Rápidos</h3>
                    <ul>
                        <li><a href="#">Inicio</a></li>
                        <li><a href="#">Servicios</a></li>
                        <li><a href="#">Contacto</a></li>
                        <li><a href="#">FAQs</a></li>
                    </ul>
                </div>
                <div className={styles.footerSection}>
                    <h3>Productores</h3>
                    <ul>
                        <li><a href="#">Registro de Productores</a></li>
                        <li><a href="#">Beneficios</a></li>
                        <li><a href="#">Historias de Éxito</a></li>
                    </ul>
                </div>
                <div className={styles.footerSection}>
                    <h3>Soluciones</h3>
                    <ul>
                        <li><a href="#">Inversiones Personalizadas</a></li>
                        <li><a href="#">Consultoría</a></li>
                        <li><a href="#">Soporte Técnico</a></li>
                    </ul>
                </div>
                <div className={styles.footerSection}>
                    <h3>Contacto</h3>
                    <p>Email: atfisoporte@atfi.com</p>
                    <p>Teléfono: +123 456 7890</p>
                </div>
            </div>
            <div className={styles.footerBottom}>
                <p>&copy; 2024 Agro Inversiones. Todos los derechos reservados.</p>
            </div>
        </footer>
    );
};

export default Footer;
