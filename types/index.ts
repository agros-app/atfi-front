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