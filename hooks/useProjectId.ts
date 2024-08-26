"use client"
import { getProjectById } from "@/lib/api";
import { Project } from "@/types/api";
import { useEffect, useState } from "react";  

const useProjectId = (id: number) => {
    const [project, setProject] = useState<Project>({
        id: 0,
        name: "string",
        amountNeed: 0,
        amountCollected: 0,
        minAmount: 0,
        startDate: "string",
        endDate: "string",
        status: "APPROVED",
        addressId: 0,
        description: "string",
        seeds: [],
    });

    useEffect(()=>{
        getProjectById(id).then((project) => setProject(project))
    },[])

    return { project };
}

export default useProjectId;