import React, { ReactNode, createContext, useContext } from 'react';
import { UserStore } from '../../stores';

export interface StoreContextType {
    UserStore: typeof UserStore;
}

const StoreContext = createContext<StoreContextType | null>(null);

const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const stores: StoreContextType = {
        UserStore: UserStore,
    };

    return <StoreContext.Provider value={stores}>{children}</StoreContext.Provider>;
};

const useStores = (): StoreContextType => {

    const context = useContext(StoreContext);

    if (!context) {
        throw new Error('Store must be used within a StoreProvider');
    }

    return context;

};

export { StoreProvider, useStores };
