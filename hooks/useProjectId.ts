"use client"
import { getProjectById } from "@/lib/api";
import {Project, ProjectData, ProjectDetailInfo} from "@/types/api";
import { useEffect, useState } from "react";  

const useProjectId = (id: number) => {
    const [isLoading, setIsLoading] = useState(true);
    const [project, setProject] = useState<ProjectDetailInfo>({
        id: 0,
        name: "",
        amountNeed: 0,
        amountCollected: 0,
        minAmount: 0,
        returnsDate: "",
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
        startFarming: new Date().toISOString(),
        endFarming: new Date().toISOString(),
        status: "APPROVED",
        addressId: 0,
        description: "",
        providers: [],
        latitude: "",
        longitude: "",
        zipCode: "",
        state: "",
        area: 0,
        contractAdress: "",
        city: "",
        country: "",
        producerName: "",
        producerLastName: "",
        producerEmail: "",
    });

    useEffect(() => {
        getProjectById(id)
            .then((project) => setProject(project))
            .finally(() => setIsLoading(false));
    }, [id]);

    return { project, isLoading };
}

export default useProjectId;