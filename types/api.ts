export type Project = {
    id: number,
    name: string,
    amountNeed: number,
    amountCollected: number,
    minAmount: number,
    startDate: string,
    endDate: string,
    status: Status,
    addressId: number,
    description: string,
    seeds: string[]
}

export type ProjectData = Project &{
    country: string,
    city: string,
    zipCode: string,
    state: string,
    area: number,
    latitude: string,
    longitude: string,
}

export type ProjectDetailInfo = ProjectData & {
    producerName: string,
    producerLastName: string,
    producerEmail: string,

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
}


export type CompleteUserInfo={
    name: string;
    lastName: string;
    phone: string;
    country: string;
    cuit: string;
}
export type MessageData ={
    to: string;
    subject: string;
    html: string
}
export type Status = "APPROVED" | "PENDING" | "REJECTED"