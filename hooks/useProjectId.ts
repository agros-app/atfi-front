"use client"
import { getProjectById } from "@/lib/api";
import {Project, ProjectData, ProjectDetailInfo} from "@/types/api";
import { useEffect, useState } from "react";  

const useProjectId = (id: number) => {
    const [project, setProject] = useState<ProjectDetailInfo>({
        id: 0,
        name: "string",
        amountNeed: 0,
        amountCollected: 0,
        minAmount: 0,
        startDate: new Date().toISOString(),
        endDate: new Date().toISOString(),
        status: "APPROVED",
        addressId: 0,
        description: "string",
        seeds: [],
        latitude: "string",
        longitude: "string",
        zipCode: "string",
        state: "string",
        area: 0,
        city: "string",
        country: "string",
        producerName: "string",
        producerLastName: "string",
        producerEmail: "string",
    });

    useEffect(()=>{
        getProjectById(id).then((project) => setProject(project))
    },[])
    return { project };
}

export default useProjectId;