'use client'
import { SessionContext, sessionContext } from '@/context/sessionContext';
import { useContext } from 'react';

const useSession = (): SessionContext | null => {
    const session = useContext(sessionContext);
    return session;
}

export default useSession;