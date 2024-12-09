export type Project = {
    id: number,
    name: string,
    photoURL?: string,
    amountNeed: number,
    amountCollected: number,
    minAmount: number,
    startDate: string,
    endDate: string,
    startFarming: string,
    endFarming: string,
    returnsDate: string,
    status: Status,
    addressId: number,
    description: string,
    providers: Provider[]
}

export type Provider = {
    id: number,
    name: string,
    seed: string
    userId: number
}

export type ProjectCost = {
    commercializationExpenses: number;
    plowing: number;
    seeds: number;
    agrochemicalsFertilizers: number;
    harvest: number;
    lease: number;
}

export type ProjectData = Project & {
    cost: ProjectCost
    country: string,
    city: string,
    zipCode: string,
    state: string,
    area: number,
    latitude: string,
    longitude: string,
    contractAdress?: string,
}

export type ProjectDetailInfo = ProjectData & {
    producerName: string,
    producerLastName: string,
    producerEmail: string,
    proposalId?: number,
}

export type ProjectYieldata = {
    seed: string,
    field: string,
    series: string,
    soilType: string,
    yearType: string,
    genotype: string,
    initialCondition: string,
    planting: string,
    averageYield: number,
    coefVar: number,
    median: number,
    perc10: number,
    perc25: number,
    perc75: number,
    perc90: number,
}

export const transformApiDataToProjectYieldata = (apiData: any): ProjectYieldata => {
    return {
        seed: apiData["Cultivo"],
        field: apiData["Campo"],
        series: apiData["Serie"],
        soilType: apiData["Tipo Suelo"],
        yearType: apiData["Tipo Año"],
        genotype: apiData["Genotipo"],
        initialCondition: apiData["Condición Inicial"],
        planting: apiData["Siembra"].toString(),
        averageYield: apiData["Rinde Medio (Kg/ha)"],
        coefVar: apiData["Coef Var (%) "],
        median: apiData["Mediana (Kg/ha)"],
        perc10: apiData["Perc 10% (Kg/ha)"],
        perc25: apiData["Perc 25% (Kg/ha)"],
        perc75: apiData["Perc 75% (Kg/ha)"],
        perc90: apiData["Perc 90% (Kg/ha)"]
    };
}



export type User = {
    id: number;
    name: string;
    lastName: string;
    email: string;
    withProvider: boolean;
    photoURL: string;
    role: string;
    cuit: string;
    phone: string;
    country: string;
    city: string;
    address: string;
    state: string;
    walletDisplayable: boolean,
}


export type CompleteUserInfo = {
    name: string;
    lastName: string;
    phone: string;
    country: string;
    cuit: string;
    city: string;
    address: string;
    state: string;
}

export type MessageData = {
    to: string;
    subject: string;
    html: string
}
export type Status = "APPROVED" | "PENDING" | "REJECTED"

export type ProjectMessage = {
    id: number;
    projectId: number;
    userId: number;
    message: string;
    answer?: string;
    createdAt: string;
    user: User;
}

export type UserInvestment = {
    userId: number;
    projectId: number;
    projectName: string;
    amount: number;
    area: number
    createdAt: Date;
    status: string;
}

export type ProjectStatus = {
    projectId: number
    status: Status
}

export type SimulationData = {
    year: number;

    funds: number;

    totalCostPerHectare: number;

    investedHectares: number;

    grossMarginPerHectare: number;

    totalGrossMargin: number;

    returnPercentage: number;

    investment: number;

    costs: {
        costName: string;
        value: number;
    }[]
}

export type YieldRange = {
    zone: string;
    yields: number[];
}

export type Crop = "trigo" | "soja_1ra" | "soja_2da" | "maiz"


