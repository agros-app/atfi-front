"use client";
import { useEffect, useState } from "react";
import { getRipioProjects, getUserById, walletDisplayable } from "@/lib/api";
import Button from "@/components/button/button";
import styles from "./page.module.scss";

interface RipioProject {
    id: number;
    name: string;
    userId: number;
}

interface UserProjects {
    userId: number;
    projects: RipioProject[];
}

interface UserNames {
    [userId: number]: string;
}

// Le pido de to do corazón disculpas a quien tenga que usar este código, pero el tiempo se nos refalaba de las manos.
export default function RipioBackoffice() {
    const [userProjects, setUserProjects] = useState<UserProjects[]>([]);
    const [userNames, setUserNames] = useState<UserNames>({});

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

    const fetchUserNames = async (userIds: number[]) => {
        try {
            const names: UserNames = {};
            await Promise.all(
                userIds.map(async (userId) => {
                    const user = await getUserById(userId);
                    names[userId] = user.name + " " + user.lastName;
                })
            );
            setUserNames(names);
        } catch (error) {
            console.error("Error fetching user names:", error);
        }
    };

    const refreshData = async () => {
        await fetchProjects();
        const userIds = userProjects.map((user) => user.userId);
        await fetchUserNames(userIds);
    };

    const handleAllowAccess = (userId: number) => {
        const confirmed = window.confirm(
            "¿Estás seguro? Esta acción es irreversible."
        );
        if (confirmed) {
            walletDisplayable(userId, true);
            refreshData();
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    useEffect(() => {
        const userIds = userProjects.map((user) => user.userId);
        fetchUserNames(userIds);
    }, [userProjects]);

    return (
        <div style={{ padding: "16px" }}>
            <h1 style={{ marginBottom: "20px" }}>Productores</h1>
            {userProjects.map((user) => (
                <div key={user.userId} className={styles.projects}>
                    <div className={styles.left}>
                        <h2>{userNames[user.userId] || "Cargando..."}</h2>
                        <p>
                            <strong>Proyectos:</strong>{" "}
                            {user.projects.map((project) => project.name).join(", ")}
                        </p>
                    </div>
                    <Button
                        className={styles.button}
                        variant={"secondary"}
                        onClick={() => handleAllowAccess(user.userId)}
                    >
                        Permitir al usuario acceder a todos los recursos de la inversión
                    </Button>
                </div>
            ))}
        </div>
    );
}
