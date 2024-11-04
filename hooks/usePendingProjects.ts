import { useEffect, useState } from "react";
import { ProjectDetailInfo } from "@/types/api";
import { getPendingProjects } from "@/lib/api";

const usePendingProjects = () => {
    const [projects, setProjects] = useState<ProjectDetailInfo[]>([]);

    useEffect(() => {
        getPendingProjects().then((projects) => setProjects(projects));
    }, []);

    const removeProject = (projectId: number) => {
        setProjects((prevProjects) => prevProjects.filter(project => project.id!== projectId));
    };

    return { projects, removeProject };
};

export default usePendingProjects;