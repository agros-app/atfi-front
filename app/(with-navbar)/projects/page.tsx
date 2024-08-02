import ProjectCard from "@/components/projectCard/projectCard";
import styles from "./projects.module.scss";
import Filters from "./components/filters/filters";
import Select from "@/components/select/Select";
import Projects from "@/components/projects/projects";

export default function ProjectsPage() {
  // TODO: Integrate backend
  const options = [
    { value: "asc", title: "Mas recientes" },
    { value: "desc", title: "Mas antiguos" },
  ];
  return (
    <main className={styles.main}>
      <section className={styles.sort_section}>
        <div className={styles.sort_filter}>
          <span>Ordenar por: </span>
          <Select placeholder="Mas recientes" name="filter" options={options} />
        </div>
      </section>
      <section className={styles.main_section}>
        <Filters />
        <div className={styles.projects_container}>
          <Projects />
        </div>
      </section>
    </main>
  );
}
