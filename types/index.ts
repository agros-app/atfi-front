export type Project = {
    id: number,
    name: string,
    amountNeed: number,
    amountCollected: number,
    minAmount: number,
    startDate: string,
    endDate: string,
    status: string, //TODO: TYPE STATUS
    addressId: number,
    description: string,
    seeds: string[]
}

export type Address = {
    id: number,
    country: string,
    state: string,
    city: string,
    street: string,
    streetNumber: number,
    zipCode: string,
    area: number
}