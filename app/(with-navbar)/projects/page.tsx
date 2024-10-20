"use client";
import ProjectCard from "@/components/projectCard/projectCard";
import styles from "./projects.module.scss";
import Filters from "./components/filters/filters";
import Select from "@/components/select/Select";
import useProjects from "@/hooks/useProjects";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProjectsPage() {
    const { projects } = useProjects();
    const router = useRouter();
    const [filteredProjects, setFilteredProjects] = useState(projects);
    const [order, setOrder] = useState<'recientes' | 'antiguos'>('recientes');
    const [filters, setFilters] = useState<{ country: string | null; type: string | null }>({
        country: null,
        type: null,
    });

    const countries = Array.from(new Set(projects.map((project) => project.country)));
    const types = Array.from(new Set(projects.flatMap((project) => project.providers.map(p => p.seed.charAt(0).toUpperCase() + p.seed.slice(1)))));

    const handleSortChange = (e: any) => {
        const selectedOrder = e.target.value === "asc" ? "recientes" : "antiguos";
        setOrder(selectedOrder);
    };

    const filterProjects = (projects: any[], filters: { country: string | null; type: string | null }) => {
        return projects.filter((project) => {
            const matchesCountry = filters.country ? project.country === filters.country : true;
            const matchesType = filters.type ? project.providers[0].seed.includes(filters.type.toLowerCase()) : true;
            return matchesCountry && matchesType;
        });
    };

    function orderProjects(projects: any[], order: 'recientes' | 'antiguos') {
        return projects.sort((a, b) => {
            const fechaA = new Date(a.startDate).getTime();
            const fechaB = new Date(b.startDate).getTime();
            if (order === 'recientes') {
                return fechaB - fechaA;
            } else {
                return fechaA - fechaB;
            }
        });
    }

    useEffect(() => {
        const filtered = filterProjects([...projects], filters);
        const sorted = orderProjects(filtered, order);
        setFilteredProjects(sorted);
    }, [order, filters, projects]);

    const handleFilterChange = (newFilters: { country: string | null; type: string | null }) => {
        setFilters(newFilters);
    };

    const handleCardClick = (projectId: number) => {
        router.push(`/project/${projectId}`);
    };

    const options = [
        { value: "asc", title: "Más recientes" },
        { value: "desc", title: "Más antiguos" },
    ];

    return (
        <main className={styles.main}>
            <section className={styles.sort_section}>
                <div className={styles.sort_filter}>
                    <span>Ordenar por: </span>
                    <Select
                        placeholder="Más recientes"
                        name="filter"
                        options={options}
                        onChange={handleSortChange}
                    />
                </div>
            </section>
            <section className={styles.main_section}>
                <Filters
                    onFilterChange={handleFilterChange}
                    countries={countries}
                    types={types}
                    projects={projects}
                />
                <div className={styles.projects_container}>
                    {filteredProjects.map((project) => (
                        <ProjectCard
                            project={project}
                            key={project.id}
                            onClick={() => handleCardClick(project.id)}
                        />
                    ))}
                </div>
            </section>
        </main>
    );
}
