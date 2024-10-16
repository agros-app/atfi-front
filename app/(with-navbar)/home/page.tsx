"use client"
import Link from "next/link";
import styles from "./home.module.scss";
import ProjectCard from "@/components/projectCard/projectCard";
import useProjects from "@/hooks/useProjects";
import News from "@/components/news/news";
import featuresBg from "@assets/images/features_background.webp"
import {useRouter} from "next/navigation";
import React from "react";
import AuthGuard from "@/guards/AuthGuard";
import {getToken} from "@/lib/api";

const news = [
    {
        imageSrc: featuresBg,
        newspaper: "Clarín",
        title: "Mercado de granos: En 2023 creció el canje",
        description: "Un informe de la Bolsa de Comercio señala menor volumen negociado debido a la seca.",
        onButtonClick: () => window.location.href = "https://www.clarin.com/rural/agricultura/mercado-granos-2023-crecio-canje_0_w33D993XUn.html?srsltid=AfmBOopkS70f7PlJ0EPP9_rSoKOuz0nf65JZlMquOlml_EMAC0h_Gl_X",
    },
    {
        imageSrc: featuresBg,
        newspaper: "La Nación",
        title: "El campo, en alerta por la suba de costos",
        description: "La suba de los precios internacionales de los insumos preocupa a los productores.",
        onButtonClick: () => window.location.href = "https://www.lanacion.com.ar/economia/campo/alerta-se-descontrolo-una-variable-que-mira-el-campo-y-el-negocio-esta-en-zona-de-riesgo-nid21032024/",
    },
    {
        imageSrc: featuresBg,
        newspaper: "Infobae",
        title: "El agro, en alerta por la sequía",
        description: "La falta de lluvias en el norte del país afecta la producción de granos.",
        onButtonClick: () => window.location.href = "https://www.lanacion.com.ar/economia/campo/alerta-se-descontrolo-una-variable-que-mira-el-campo-y-el-negocio-esta-en-zona-de-riesgo-nid21032024/",
    },
    {
        imageSrc: featuresBg,
        newspaper: "El País",
        title: "El agro, en alerta por la sequía",
        description: "La falta de lluvias en el norte del país afecta la producción de granos.",
        onButtonClick: () => window.location.href = "https://www.lanacion.com.ar/economia/campo/alerta-se-descontrolo-una-variable-que-mira-el-campo-y-el-negocio-esta-en-zona-de-riesgo-nid21032024/",
    },
]


const Home = () => {
    const { projects } = useProjects();
    const router = useRouter();

    const handleCardClick = (projectId: number) => {
        router.push(`/project/${projectId}`);
    };

    return (
        <main className={styles.main}>
            <section>
                <h3 className={styles.section_title}>Proyectos activos</h3>
                <p>
                    Estos campos están esperando nuevas inversiones. Podrás ver más sobre
                    ellos en la sección de detalles.
                </p>
                <div className={styles.projects}>
                    {projects.map((project) => (
                        <ProjectCard
                            disabled={false}
                            project={project}
                            key={project.id}
                            onClick={() => handleCardClick(project.id)}
                        />
                    ))}
                </div>
                <div className={styles.more_info}>
                    <Link href={"/projects"}>Ver todos los proyectos {">>"}</Link>
                </div>
            </section>
            <section>
                <h3 className={styles.section_title}>Proyectos anteriores</h3>
                <p>
                    Inversiones finalizadas que sirven como ejemplo para las nuevas
                    inversiones.
                </p>
                <div className={styles.projects}>
                    {projects.slice(0, 3).map((project) => (
                        <ProjectCard disabled={true} project={project} key={project.id}/>
                    ))}
                </div>
            </section>
            <section>
                <h3 className={styles.section_title}>Recursos</h3>
                <p>Las principales noticias del agro uruguayo y de AGRAS están acá.</p>
                <div className={styles.projects}>
                    {news.map((news, index) => (
                        <News {...news} key={index} />
                    ))}
                </div>
            </section>
        </main>
    );
};

export default Home;