'use client'
import { SessionContext, sessionContext } from '@/context/sessionContext';
import { useContext } from 'react';

const useSession = (): SessionContext => {
    const session = useContext(sessionContext);
    // @ts-ignore
    return session;
}

export default useSession;