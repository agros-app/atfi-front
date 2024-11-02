import { useState, useEffect } from 'react';
import {getUserInvestments} from "@/lib/api";
import {UserInvestment} from "@/types/api";

export const useUserInvestments = () => {
    const [investments, setInvestments] = useState<UserInvestment[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchInvestments = async () => {
            setLoading(true);
            setError(null);

            try {
                const data = await getUserInvestments();
                setInvestments(data);
            } catch (err) {
                setError('Failed to fetch investments');
            } finally {
                setLoading(false);
            }
        };

        fetchInvestments();
    }, []);

    return { investments, loading, error };
};