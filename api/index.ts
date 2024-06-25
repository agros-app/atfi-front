import { Project } from "@/types"
import toast from "react-hot-toast"

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoSWQiOjEsImlhdCI6MTcxOTM1MTg3OSwiZXhwIjoxNzE5NDM4Mjc5fQ.n42kjQtoKwYK04mFAZdNkZfmsy13Lq7t_xDp7LKYK88"

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