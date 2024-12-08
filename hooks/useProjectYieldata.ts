"use client"
import {getProjectById, getProjectYieldataByName} from "@/lib/api";
import {Project, ProjectData, ProjectDetailInfo, ProjectYieldata} from "@/types/api";
import { useEffect, useState } from "react";

const useProjectYieldata = (name: string) => {
    const [yieldata, setYieldata] = useState<ProjectYieldata>({
        seed: "",
        field: "",
        series: "",
        soilType: "",
        yearType: "",
        genotype: "",
        initialCondition: "",
        planting: "10/09/2024",
        averageYield: 0,
        coefVar: 0,
        median: 0,
        perc10: 0,
        perc25: 0,
        perc75: 0,
        perc90: 0,
    });

    useEffect(()=>{
        getProjectYieldataByName(name).then((data) => setYieldata(data))
    },[])
    return { yieldata };
}

export default useProjectYieldata;