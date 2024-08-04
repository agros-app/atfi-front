import { Project } from "@/types/api";
import axios from "axios";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoSWQiOjE4LCJpYXQiOjE3MjI3OTE5MDQsImV4cCI6MTcyMjg3ODMwNH0.YZbjUoG-0hl3RNT_fUr-GWTYizPmRCCd3Yx_lkizMuI`,
    },
})

export const getProjects = async (): Promise<Project[]> => {
    const response = await api.get("/project/all");
    return response.data;
}

export const getProjectById = async (id: number): Promise<Project> => {
    const response = await api.get(`/project/${id}`)
    return response.data;
}

export const investByProjectId = async (id: number, amount: number): Promise<void> => {
    const resp = await api.post(`/project/invest`, {
        body: JSON.stringify({
            projectId: id,
            amount
        })
    })
}