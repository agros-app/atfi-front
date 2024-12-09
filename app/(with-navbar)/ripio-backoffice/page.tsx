"use client";
import { useEffect, useState } from "react";
import { getProjectsByUserId, getRipioUsers, walletDisplayable } from "@/lib/api";
import Button from "@/components/button/button";
import styles from "./page.module.scss";

interface ProjectDetailInfo {
    id: number;
    name: string;
    description: string;
}

interface UserProjects {
    userId: number;
    role: string;
    projects: ProjectDetailInfo[];
    name: string;
    lastName: string;
}

export default function RipioBackoffice() {
    const [producers, setProducers] = useState<UserProjects[]>([]);
    const [providers, setProviders] = useState<UserProjects[]>([]);

    const fetchUsersAndProjects = async () => {
        try {
            const users = await getRipioUsers();
            const producerPromises = users
                .filter((user) => user.role === "PRODUCER")
                .map(async (user) => {
                    const projects = await getProjectsByUserId(user.id);
                    return {
                        userId: user.id,
                        role: user.role,
                        projects,
                        name: user.name,
                        lastName: user.lastName,
                    };
                });

            const providerPromises = users
                .filter((user) => user.role === "PROVIDER")
                .map(async (user) => {
                    const projects = await getProjectsByUserId(user.id);
                    return {
                        userId: user.id,
                        role: user.role,
                        projects,
                        name: user.name,
                        lastName: user.lastName,
                    };
                });

            const producerData = await Promise.all(producerPromises);
            const providerData = await Promise.all(providerPromises);

            setProducers(producerData);
            setProviders(providerData);
        } catch (error) {
            console.error("Error fetching users and projects:", error);
        }
    };

    const handleAllowAccess = (userId: number) => {
        const confirmed = window.confirm(
            "¿Estás seguro? Esta acción es irreversible."
        );
        if (confirmed) {
            walletDisplayable(userId, true);
            fetchUsersAndProjects();
        }
    };

    useEffect(() => {
        fetchUsersAndProjects();
    }, []);

    return (
        <div style={{ padding: "16px" }}>
            <h1 style={{ marginBottom: "20px" }}>Productores</h1>
            {producers.map((user) => (
                <div key={user.userId} className={styles.projects}>
                    <div className={styles.left}>
                        <h2>{`${user.name} ${user.lastName}`}</h2>
                        <p>
                            <strong>Proyectos:</strong> {user.projects.map((project) => project.name).join(", ")}
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

            <h1 style={{ marginBottom: "20px" }}>Proveedores</h1>
            {providers.map((user) => (
                <div key={user.userId} className={styles.projects}>
                    <div className={styles.left}>
                        <h2>{`${user.name} ${user.lastName}`}</h2>
                        <p>
                            <strong>Proyectos:</strong> {user.projects.map((project) => project.name).join(", ")}
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