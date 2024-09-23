"use client";
import LandingCard, { LandingCardProps } from "../landingCard/landingCard";
import styles from "./howItWorks.module.scss";
import cultivoImage from "@assets/images/cultivo.webp"
import machinesImage from "@assets/images/machines.webp"

const cards: LandingCardProps[] = [
  {
    title: "Explorá",
    description:
      "En nuestra plataforma encontrarás diversas oportunidades de inversión disponibles. Cada oportunidad de inversión es cuidadosamente seleccionada y evaluada por nuestro equipo de expertos para garantizar su viabilidad y potencial de retorno. Además, proporcionamos toda la información y herramientas necesarias para que puedas tomar decisiones informadas.",
    image: cultivoImage,
    reverse: false,
  },
  {
    title: "Invertí",
    description:
      "Seleccioná la oportunidad de inversión que mejor se adapte a tus objetivos financieros y estrategias de inversión. Con una interfaz intuitiva y fácil de usar, invertir en el sector agro nunca ha sido tan accesible.",
    image: machinesImage,
    reverse: true,
  },
  /* {
    title: "Ganá",
    description:
      "Una vez finalizado el proyecto se te reintegrará el total más los intereses obtenidos. Nos enorgullecemos de ofrecer retornos competitivos y transparentes. Desde el momento en que realizas tu inversión, puedes seguir el progreso del proyecto a través de nuestra plataforma, con actualizaciones periódicas y acceso a informes detallados. ",
    icon: "https://cdn-icons-png.flaticon.com/512/1160/1160908.png",
    image: "/landing/bg_image.png",
    reverse: false,
  }, */
];

export default function HowItWorksSection() {
  return (
    <section className={styles.container} id="how-it-works">
      <div className={styles.cards}>
        {cards.map((item, index) => (
          <LandingCard
            key={index}
            description={item.description}
            image={item.image}
            title={item.title}
            reverse={item.reverse}

          />
        ))}
      </div>
    </section>
  );
}
