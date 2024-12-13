"use client"
import {getPastProjects, getProjects} from "@/lib/api";
import {Project, ProjectData, Status} from "@/types/api";
import { useEffect, useState } from "react";  


const useProjects = (status: Status) => {
    const [projects, setProjects] = useState<ProjectData[]>([]);

    useEffect(()=>{
        if(status !== "RETURNS_INJECTED")
            getProjects().then((projects) => setProjects(projects))
        else
            getPastProjects().then((projects) => setProjects(projects))
    },[])

    return { projects };
}

export default useProjects;