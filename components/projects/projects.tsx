import { getProjects } from "@/api";
import ProjectCard from "@/components/projectCard/projectCard";

export default async function Projects() {
  const projects = await getProjects();
  return (
    <>
      {projects.map((project) => (
        <ProjectCard project={project} key={project.id} />
      ))}
    </>
  );
}
