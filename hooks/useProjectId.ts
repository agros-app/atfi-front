"use client"
import { getProjectById } from "@/lib/api";
import {Project, ProjectData, ProjectDetailInfo} from "@/types/api";
import { useEffect, useState } from "react";  

const useProjectId = (id: number) => {
    const [isLoading, setIsLoading] = useState(true);
    const [project, setProject] = useState<ProjectDetailInfo>({
        id: 0,
        name: "string",
        amountNeed: 0,
        amountCollected: 0,
        minAmount: 0,
        cost:{
            commercializationExpenses: 0,
            plowing: 0,
            seeds: 0,
            agrochemicalsFertilizers: 0,
            harvest: 0,
            lease: 0
        },
        startDate: new Date().toISOString(),
        endDate: new Date().toISOString(),
        status: "APPROVED",
        addressId: 0,
        description: "string",
        providers: [],
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

    useEffect(() => {
        getProjectById(id)
            .then((project) => setProject(project))
            .finally(() => setIsLoading(false));
    }, [id]);

    return { project, isLoading };
}

export default useProjectId;