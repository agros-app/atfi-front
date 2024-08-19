export type Project = {
  id: number
  name: string
  amountNeed: number
  amountCollected: number
  minAmount: number
  startDate: string
  endDate: string
  status: Status
  addressId: number
  description: string
  seeds: string[]
}

export type Status = 'APPROVED' | 'PENDING' | 'REJECTED'
