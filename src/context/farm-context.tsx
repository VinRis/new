'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface FarmContextType {
    farmName: string;
    setFarmName: (name: string) => void;
    managerName: string;
    setManagerName: (name: string) => void;
    farmLocation: string;
    setFarmLocation: (location: string) => void;
    currency: 'usd' | 'eur' | 'gbp' | 'kes';
    setCurrency: (currency: 'usd' | 'eur' | 'gbp' | 'kes') => void;
}

const FarmContext = createContext<FarmContextType | undefined>(undefined);

export const FarmProvider = ({ children }: { children: ReactNode }) => {
    const [farmName, setFarmNameState] = useState('Green Acres Farm');
    const [managerName, setManagerNameState] = useState('John');
    const [farmLocation, setFarmLocationState] = useState('Vermont, USA');
    const [currency, setCurrencyState] = useState<'usd' | 'eur' | 'gbp' | 'kes'>('usd');
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        const storedFarmName = localStorage.getItem('farmName');
        if (storedFarmName) setFarmNameState(storedFarmName);

        const storedManagerName = localStorage.getItem('managerName');
        if (storedManagerName) setManagerNameState(storedManagerName);
        
        const storedFarmLocation = localStorage.getItem('farmLocation');
        if (storedFarmLocation) setFarmLocationState(storedFarmLocation);

        const storedCurrency = localStorage.getItem('currency');
        if (storedCurrency) setCurrencyState(storedCurrency as 'usd' | 'eur' | 'gbp' | 'kes');

    }, []);

    const setFarmName = (name: string) => {
        setFarmNameState(name);
        if (isClient) localStorage.setItem('farmName', name);
    };

    const setManagerName = (name: string) => {
        setManagerNameState(name);
        if (isClient) localStorage.setItem('managerName', name);
    };

    const setFarmLocation = (location: string) => {
        setFarmLocationState(location);
        if (isClient) localStorage.setItem('farmLocation', location);
    };
    
    const setCurrency = (currency: 'usd' | 'eur' | 'gbp' | 'kes') => {
        setCurrencyState(currency);
        if(isClient) localStorage.setItem('currency', currency);
    };

    return (
        <FarmContext.Provider value={{ farmName, setFarmName, managerName, setManagerName, farmLocation, setFarmLocation, currency, setCurrency }}>
            {children}
        </FarmContext.Provider>
    );
};

export const useFarm = () => {
    const context = useContext(FarmContext);
    if (context === undefined) {
        throw new Error('useFarm must be used within a FarmProvider');
    }
    return context;
};
