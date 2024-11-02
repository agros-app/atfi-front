import {useEffect, useState} from "react";
import {ProjectData, ProjectDetailInfo} from "@/types/api";
import {getPendingProjects} from "@/lib/api";

const usePendingProjects = () => {
    const [projects, setProjects] = useState<ProjectDetailInfo[]>([]);

    useEffect(()=>{
        getPendingProjects().then((projects) => setProjects(projects))
    },[])

    return { projects };
}

export default usePendingProjects;