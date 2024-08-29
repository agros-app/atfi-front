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

export type ProjectCreateResponse = Project &{
    country: string,
    city: string,
    zipCode: string,
    state: string,
    area: number,
    latitude: string,
    longitude: string,
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

export type Status = "APPROVED" | "PENDING" | "REJECTED"