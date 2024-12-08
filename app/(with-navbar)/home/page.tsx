"use client"
import Link from "next/link";
import styles from "./home.module.scss";
import ProjectCard from "@/components/projectCard/projectCard";
import useProjects from "@/hooks/useProjects";
import News from "@/components/news/news";
import {useRouter} from "next/navigation";
import React from "react";
import { useEffect, useState } from 'react';
import {getNews, getProjectsByUserId, getToken} from "@/lib/api";
import useSession from "@/hooks/useSession";



const Home = () => {
    const [news, setNews] = useState<any[]>([]);
    const { userData: user } = useSession()
    const [userProjects, setUserProjects] = useState<any[]>([]);

    useEffect(() => {
        let isMounted = true; // Bandera para limpiar el efecto

        const fetchNews = async () => {
            try {
                const response = await getNews();
                const newsData = response.map((newsItem: any) => ({
                    id: newsItem.id,
                    title: newsItem.title,
                    description: newsItem.description,
                    imageSrc: newsItem.photoURL,
                    newspaper: newsItem.resource,
                    onButtonClick: () => window.location.href = newsItem.reference,
                }));
                setNews(newsData);
            } catch (error) {
                console.error("Failed to fetch news data:", error);
            }
        };

        const fetchProjects = async () => {
            if ((user?.role === "PRODUCER" || user?.role === "PROVIDER") && user?.id) {
                try {
                    const projects = await getProjectsByUserId(user.id);
                    if (isMounted) {
                        setUserProjects(projects);
                    }
                } catch (error) {
                    console.error("Failed to fetch projects:", error);
                }
            }
        };

        fetchNews().then(r => r);
        fetchProjects().then(r =>  r);

        return () => {
            isMounted = false; // Limpia el efecto al desmontar
        };
    }, [user]); // Dependencia de `user`


    const { projects } = useProjects();
    const router = useRouter();

    const handleCardClick = (projectId: number) => {
        router.push(`/project/${projectId}`);
    };

    return (
        <main className={styles.main}>
            {(user?.role === "PRODUCER" || user?.role === "PROVIDER") && (
                <section>
                    <h3 className={styles.section_title}>
                        Tus Proyectos
                    </h3>
                    {userProjects.length > 0 ? (
                        <div>
                            <p>Aquí están tus proyectos actuales. Gestiona o revisa su progreso.</p>
                            <div className={styles.projects}>
                                {userProjects.map((project) => (
                                    <ProjectCard
                                        disabled={false}
                                        project={project}
                                        key={project.id}
                                        onClick={() => handleCardClick(project.id)}
                                    />
                                ))}
                            </div>
                        </div>
                    ) : (
                        <p>No tienes proyectos registrados actualmente.</p>
                    )}

                </section>
            )}

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
                        <News {...news} key={index}/>
                    ))}
                </div>
            </section>
        </main>
    );
};

export default Home;