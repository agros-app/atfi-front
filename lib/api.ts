import {
    CompleteUserInfo,
    MessageData,
    ProjectData,
    ProjectDetailInfo,
    ProjectMessage, ProjectStatus,
    ProjectYieldata,
    transformApiDataToProjectYieldata,
    User, UserInvestment
} from "@/types/api";
import axios from "axios";
import Cookies from "js-cookie";
import { ProjectFormData } from "@/app/(with-navbar)/submit-project/page";

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


export const createProject = async (project: ProjectFormData): Promise<ProjectData | any> => {
    const response = await api.post('/project', project);
    return response.data;
}

export const getProjectYieldataByName = async (name: string): Promise<ProjectYieldata> => {
    const response = await api.get(`/yieldata/campo/filter`, {
        params: {
            name: name
        }
    });
    return transformApiDataToProjectYieldata(response.data);
};

export const messageProducerByProjectId = async (projectId: number, message: string): Promise<ProjectMessage> => {
    const response = await api.post(`/project/contact/${projectId}`, { message });
    return response.data;
}

export const answerMessage = async (messageId: number, message: string): Promise<ProjectMessage> => {
    const response = await api.post(`/project/answer/${messageId}`, { message });
    return response.data;
}

export const getProjectMessages = async (projectId: number): Promise<ProjectMessage[]> => {
    const response = await api.get(`/project/message/all/${projectId}`);
    return response.data;
}

export const editMessage = async (messageId: number, answer: string): Promise<ProjectMessage> => {
    const response = await api.patch(`/project/message/edit/${messageId}`, { answer });
    return response.data;
}

export const removeMessage = async (messageId: number): Promise<void> => {
    return await api.delete(`/project/message/delete/${messageId}`);
}


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

export const getUserInfo = async (): Promise<User> => {
    const response = await api.get("/user/info");
    return response.data;
}


export const completeUserInfo = async (userInfo: CompleteUserInfo): Promise<any> => {
    return await api.post('/user/complete-info', userInfo);
};

export const updateUserInfo = async (userInfo: Partial<CompleteUserInfo>): Promise<any> => {
    return await api.put('/user/update-info', userInfo);
}

export const getUserInvestments = async (): Promise<UserInvestment[]> => {
    const response = await api.get("/user/investments");
    return response.data;
}

export const getPendingProjects= async (): Promise<ProjectDetailInfo[]> => {
    const response = await api.get("/admin/project-pending");
    return response.data;
}

export const updateProjectStatus =async (projectStatus: ProjectStatus) =>{
    return await api.put('/admin/project/status', projectStatus);
}

export const checkPassword = async (password: string): Promise<any> => {
    return await api.post(
        "/user/checkPassword",
        { password }
    );
};

export const updatePassword = async (password: string): Promise<any> => {
    return await api.post(
        "/user/ChangePassword",
        { password }
    );
}