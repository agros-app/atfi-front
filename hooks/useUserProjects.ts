import { useEffect, useState } from "react";
import { getProjectsByUserId } from "@/lib/api";
import useSession from "@/hooks/useSession";

const useUserProjects = () => {
    const { userData: user } = useSession();
    const [userProjects, setUserProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true; // Bandera para evitar actualizaciones después del desmontaje

        const fetchProjects = async () => {
            if ((user?.role === "PRODUCER" || user?.role === "PROVIDER") && user?.id) {
                try {
                    const projects = await getProjectsByUserId(user.id);
                    if (isMounted) {
                        setUserProjects(projects);
                        setLoading(false);
                    }
                } catch (err) {
                    if (isMounted) {
                        setError("Failed to fetch projects");
                        setLoading(false);
                    }
                    console.error("Failed to fetch projects:", err);
                }
            } else {
                setLoading(false);
            }
        };

        fetchProjects();

        return () => {
            isMounted = false; // Limpieza del efecto
        };
    }, [user]);

    return { userProjects, loading, error };
};

export default useUserProjects;
