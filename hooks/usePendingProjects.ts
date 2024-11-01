import {useEffect, useState} from "react";
import {ProjectData, ProjectDetailInfo} from "@/types/api";
import {getPendingProjects} from "@/lib/api";

const useProjects = () => {
    const [projects, setProjects] = useState<ProjectDetailInfo[]>([]);

    useEffect(()=>{
        getPendingProjects().then((projects) => setProjects(projects))
    },[])

    return { projects };
}

export default useProjects;