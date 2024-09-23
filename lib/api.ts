import {
    CompleteUserInfo,
    MessageData,
    ProjectData,
    ProjectDetailInfo,
    ProjectYieldata,
    transformApiDataToProjectYieldata,
    User
} from "@/types/api";
import axios from "axios";
import Cookies from "js-cookie";
import {ProjectFormData} from "@/app/(with-navbar)/submit-project/page";

export const getToken = (): string | undefined => {
    return Cookies.get('session');
};


const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    headers: {
        "Content-Type": "application/json",
    },
});


api.interceptors.request.use(config => {
    const token = Cookies.get('session');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});


// ------------------- PROJECT -------------------

export const getProjects = async (): Promise<ProjectData[]> => {
    const response = await api.get("/project/all");
    return response.data;
}

export const getProjectById = async (id: number): Promise<ProjectDetailInfo> => {
    const response = await api.get(`/project/info/${id}`);
    return response.data;
}

export const investByProjectId = async (id: number, amount: number): Promise<void> => {
    await api.post(`/project/invest`, {
        body: JSON.stringify({
            projectId: id,
            amount
        })
    });
}

export const getUserInfo = async (): Promise<User> => {
    const response = await api.get("/user/info");
    return response.data;
}

export const createProject = async (project: ProjectFormData): Promise<ProjectData | any> => {
    const response = await api.post('/project', project);
    return response.data;
}

export const contactWithProducer = async (messageData: MessageData): Promise<any> => {
    return await api.post('/project/contactWith', messageData);
}

export const getProjectYieldataByName = async (name: string): Promise<ProjectYieldata> => {
    const response = await api.get(`/yieldata/campo/filter`, {
        params: {
            name: name
        }
    });
    return transformApiDataToProjectYieldata(response.data);
};


// ------------------- USER -------------------

export const isAuthorized = async (token: string): Promise<any> => {
    try {
        const response = await api.get('/user/complete-info', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return { status: response.status, data: response.data };
    } catch (error: any) {
        return { status: error.response?.status || 500, message: error.message };
    }
};

export const completeUserInfo = async (userInfo: CompleteUserInfo): Promise<any> => {
    return await api.post('/user/complete-info', userInfo);
};