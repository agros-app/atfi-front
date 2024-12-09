import {
    CompleteUserInfo,
    Crop,
    MessageData,
    ProjectData,
    ProjectDetailInfo,
    ProjectMessage, ProjectStatus,
    ProjectYieldata,
    SimulationData,
    transformApiDataToProjectYieldata,
    User, UserInvestment,
    YieldRange,
} from "@/types/api";
import axios from "axios";
import Cookies from "js-cookie";
import { ProjectFormData } from "@/app/(with-navbar)/submit-project/page";
import {ProducerFormData} from "@/app/(with-navbar)/create-producer/page";
import { ProgressStep } from "@/components/stepper/stepper";

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

export const getProjectSeeds = async (): Promise<any> => {
    const response = await api.get("/project/seeds");
    return response.data;
}

export const getProjectById = async (id: number): Promise<ProjectDetailInfo> => {
    const response = await api.get(`/project/info/${id}`);
    return response.data;
}

export const getProjectProgress = async (projectId: number): Promise<ProgressStep[]> => {
    return  (await api.get(`/project/progress/${projectId}`)).data.map((step: any) => ({
        title: step.title,
        description: step.progress,
        date: new Date(step.createdAt).toLocaleDateString(),
    }));
}

export const createProjectProgress = async (title: string, description: string, projectId: number, date: Date): Promise<ProgressStep> => {
    return await api.post(`/project/progress`, {
        title,
        progress: description,
        projectId,
        createdAt: date,
    })
}

export const investByProjectId = async (id: number, amount: number): Promise<void> => {
    await api.post(`/project/invest`, {
        projectId: id,
        amount
    });
}

export const regretInvestment = async (id: number, amount: number): Promise<void> => {
    await api.patch(`/project/investment/cancel/${id}`, {
        projectId: id,
        amount
    });
}

export const updateProjectPhoto = async(projectId: number): Promise<string> => {
    const response = await api.patch(`/project/${projectId}/update-photo`);
    return response.data;
}

export const deleteProjectPhoto = async(projectId: number, photoId: string): Promise<void> => {
    await api.delete(`/project/${projectId}/update-photo/${photoId}`);
}

export const createProject = async (project: ProjectFormData): Promise<ProjectData | any> => {
    try {
        console.log(project)
        const response = await api.post('/project', project);
        return response.data;
    }
    catch (error) {
        console.error(error);
        return null;
    }
}

export const deleteProject = async (projectId: number): Promise<void> => {
    await api.delete(`/project/delete`, {
        data: { projectId },
    });
};


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
    const response = await api.post(`/project/message/answer/${messageId}`, { message });
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

export const updateUserPhoto = async (): Promise<string> => {
    const response = await api.put("/user/update-photo");
    return response.data;
}

export const eraseUserPhoto = async (): Promise<void> => {
    await api.delete("/user/update-photo");
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

export const getPendingProjects = async (): Promise<ProjectDetailInfo[]> => {
    const response = await api.get("/admin/project-pending");
    return response.data;
}

export const updateProjectStatus = async (projectStatus: ProjectStatus) => {
    return await api.put('/admin/project/status', projectStatus);
}

// ------------------- SIMULATOR -------------------

export const simulate = async (crop: Crop, zone: string, yieldData: number, investment: number, hectaresAmount: number, includeLease:boolean): Promise<SimulationData[]> => {
    const simulation = await api.post('/simulation', {
        crop,
        zone,
        yield: yieldData,
        investment,
        hectaresAmount,
        includeLease
    });

    return simulation.data;
}

export const getYielRangedByCrop = async (crop: Crop): Promise<YieldRange[]> => {
    const response = await api.get(`/simulation/${crop}`);
    return response.data;

}

export const checkPassword = async (password: string): Promise<any> => {
    return await api.post(
        "/user/checkPassword",
        { password }
    );
};


export const createProducer = async (producer: ProducerFormData): Promise<any> =>{
    return await api.post('/admin/create-user', producer);}

export const walletConnection = async (address: string): Promise<any> => {
    return await api.post(
        `/account/wallet/${address}`
    )}

export const getUsers = async (param: string, page: number, limit: number): Promise<User[]> => {
    return await api.get(`/admin/users`, {
        params: {
            searchTerm: param,
            page,
            limit,
        }
    }).then(response => response.data.users);
}

export const getUserInvestmentsAdmin = async (userId: number): Promise<UserInvestment[]> => {
    return (await api.get(`/admin/user-investment/${userId}`)).data
}

export const displayWallet = async (userId: number, walletDisplayable: boolean): Promise<any> => {
    return await api.patch(`/admin/walletDisplayable/${userId}`, {
        walletDisplayable: walletDisplayable,
    });
}

// ------------------- NEWS -------------------

export const getNews = async (): Promise<any> => {
    const response = await api.get('/news');
    return response.data;
}

export const createNews = async (news: any): Promise<any> => {
    return await api.post('/news', news);
}

export const updateNewsPhoto = async (newsId: number): Promise<string> => {
    const response = await api.put(`/news/update-photo/${newsId}`);
    return response.data;
}

export const deleteNewsPhoto = async (newsId: number): Promise<any> => {
    return await api.delete(`/news/update-photo/${newsId}`);
}

export const deleteNews = async (newsId: number): Promise<any> => {
    return await api.delete(`/news/${newsId}`);
}

export const updatePassword = async (password: string): Promise<any> => {
    return await api.post(
        "/user/ChangePassword",
        { password }
    );
}

export const requestRecoverPassword = async (email: string): Promise<any> => {
    return await api.post(
        "/user/requestPasswordReset",
        { email }
    );
}

export const validatePasswordReset = async (email: string, code: number): Promise<string> => {
    const response = await api.post("/user/validatePasswordReset",
        { email,
            code
        });
    return response.data.token; // Asumiendo que el token viene en `response.data.token`
};

export const getProjectsByUserId = async (producerId: number): Promise<ProjectDetailInfo[]> => {
    const prodResponse = await api.get(`/project/producer/${producerId}`);
    const provResponse = await api.get(`/project/provider/${producerId}`);
    return [...prodResponse.data, ...provResponse.data]; // Combina los arrays
};

export const getProjectsByProviderId = async (providerId: number): Promise<ProjectDetailInfo[]> => {
    const response = await api.get(`/project/provider/${providerId}`);
    return response.data
}

// --- RIPIO
export const getRipioProjects = async (): Promise<any> => {
    const response = await api.get('/admin/ripio-projects');
    return response.data;
}

export const getUserById = async (userId: number): Promise<User> => {
    const response = await api.get(`/admin/getUserById/${userId}`);
    return response.data;
}

export const walletDisplayable = async (userId: number, display: boolean): Promise<any> => {
    const response = await api.patch(`/admin/walletDisplayable/${userId}`, {walletDisplayable: display});
    return response.data;
}