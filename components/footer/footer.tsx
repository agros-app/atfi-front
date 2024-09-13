import Link from "next/link";
import styles from "./footer.module.scss";
import FacebookIcon from "@/assets/icons/facebook";
import InstagramIcon from "@/assets/icons/instagram";
import LinkedinIcon from "@/assets/icons/linkedin";
import TwitterLogo from "@/assets/icons/twitter";

const sections = [
  {
    title: "Enlaces Rápidos",
    links: [
      { label: "Inicio", href: "#" },
      { label: "Servicios", href: "#" },
      { label: "Contacto", href: "#" },
      { label: "FAQs", href: "#" },
    ],
  },
  {
    title: "Productores",
    links: [
      { label: "Registro de Productores", href: "#" },
      { label: "Beneficios", href: "#" },
      { label: "Historias de Éxito", href: "#" },
    ],
  },
  {
    title: "Soluciones",
    links: [
      { label: "Inversiones Personalizadas", href: "#" },
      { label: "Consultoría", href: "#" },
      { label: "Soporte Técnico", href: "#" },
    ],
  },
];

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        {sections.map((section, index) => (
          <div
            className={styles.footerSection}
            key={`${section.title}-${index}`}
          >
            <h3>{section.title}</h3>
            <ul>
              {section.links.map((link, index) => (
                <li key={`${link}-${index}`}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className={styles.footerSection}>
          <h3>Contacto</h3>
          <ul>
            <li>Email: atfisoporte@atfi.com</li>
            <li>Teléfono: +123 456 7890</li>
          </ul>

          <div className={styles.iconsContainer}>
            <FacebookIcon className={styles.icon} />
            <InstagramIcon className={styles.icon} />
            <LinkedinIcon className={styles.icon} />
            <TwitterLogo className={styles.icon} />
          </div>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <p>&copy; 2024 Agro Inversiones. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
