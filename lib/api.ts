import {MessageData, ProjectData, ProjectDetailInfo, User} from "@/types/api";
import axios from "axios";
import Cookies from "js-cookie";
import {ProjectFormData} from "@/app/(with-navbar)/submit-project/page";
import {res} from "pino-std-serializers";

const token= Cookies.get('session')
const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
    },
})

export const getProjects = async (): Promise<ProjectData[]> => {
    const response = await api.get("/project/all");
    return response.data;
}

export const getProjectById = async (id: number): Promise<ProjectDetailInfo> => {
    const response = await api.get(`/project/info/${id}`)
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

export const getUserInfo = async (): Promise<User> => {
    const response = await api.get("/user/info");
    return response.data;
}

export const createProject= async (project: ProjectFormData) : Promise<ProjectData | any> =>{
    const response = await api.post('/project', project)
    return response.data
}

export const contactWithProducer = async (messageData: MessageData) : Promise<any> =>{
    return await api.post('/project/contactWith', messageData)
}