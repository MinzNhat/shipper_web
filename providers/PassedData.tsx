'use client';
import { createContext, ReactNode, useState, useContext, useEffect } from 'react';

export interface PassDataContextInterface {
    passData: any,
    setPassData: (passData: any) => any
}

export const PassDataContext = createContext({} as PassDataContextInterface);

type Props = {
    children: ReactNode
};

export default function PassDataProvider({ children }: Props) {
    const [passData, setPassData] = useState<any>(null);

    return (
        <PassDataContext.Provider
            value={{
                passData, setPassData,
            }}
        >
            {children}
        </PassDataContext.Provider>
    );
}

export function usePassDataContext() {
    return useContext(PassDataContext)
}  