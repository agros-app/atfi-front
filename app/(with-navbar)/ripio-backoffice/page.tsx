"use client";
import { useEffect, useState } from "react";
import { getRipioProjects } from "@/lib/api";

interface RipioProject {
    id: number;
    pictures: string[];
    name: string;
    amountNeed: number;
    startDate: string;
    endDate: string;
    startFarming: string;
    endFarming: string;
    returnsDate: string;
    addressId: number;
    minAmount: number;
    description: string;
    status: string;
    userId: number;
    amountCollected: number;
    contractAdress: string;
    proposalId: number;
}

interface UserProjects {
    userId: number;
    projects: RipioProject[];
}

export default function RipioBackoffice() {
    const [userProjects, setUserProjects] = useState<UserProjects[]>([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const projects: RipioProject[] = await getRipioProjects();
                const groupedProjects: UserProjects[] = projects.reduce((acc, project) => {
                    const existingUser = acc.find((u) => u.userId === project.userId);
                    if (existingUser) {
                        existingUser.projects.push(project);
                    } else {
                        acc.push({ userId: project.userId, projects: [project] });
                    }
                    return acc;
                }, [] as UserProjects[]);
                setUserProjects(groupedProjects);
            } catch (error) {
                console.error("Error fetching projects:", error);
            }
        };

        fetchProjects();
    }, []);

    return (
        <div>
            {userProjects.map((user) => (
                <div key={user.userId}>
                    <h2>Usuario ID: {user.userId}</h2>
                    <ul>
                        {user.projects.map((project) => (
                            <li key={project.id}>
                                <strong>Proyecto:</strong> {project.name} <br />
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}
