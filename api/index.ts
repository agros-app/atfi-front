import {Address, Project} from "@/types"
import toast from "react-hot-toast"

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoSWQiOjE4LCJpYXQiOjE3MjI4MDQxNzUsImV4cCI6MTcyMjg5MDU3NX0.sBF6XX8w3gB3vw4IQYxE88-sLTL-hiZYzpiu6RXgePM"

export const getProjects = async (): Promise<Project[]> => {
    const resp = await fetch(`${API_URL}/project/all`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    const data: Promise<Project[]> = await resp.json()
    return data
}

export const getProjectById = async (id: number): Promise<Project> => {
    const resp = await fetch(`${API_URL}/project/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    const data: Promise<Project> = await resp.json()
    return data
}

export const investByProjectId = async (id: number, amount: number): Promise<void> => {
    const resp = await fetch(`${API_URL}/project/invest`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            projectId: id,
            amount
        })
    })

    const data = await resp.json()
    if (!resp.ok) {
        toast.error(data.message)
    }
    console.log(data)
}

export const getLocationById = async (id: number): Promise<Address> => {
    const resp = await fetch(`${API_URL}/address/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    const data: Promise<Address> = await resp.json()
    console.log("data " + JSON.stringify(data))
    return data;
}