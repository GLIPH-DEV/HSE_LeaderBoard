import { createContext, useContext } from 'react';
import LeaderBoardStore from './LeaderBoardStore';

class RootStore {
    constructor() {
        this.leaderBoardStore = LeaderBoardStore;
    }
}

const rootStore = new RootStore();
const RootStoreContext = createContext(rootStore);

export const useStore = () => {
    const context = useContext(RootStoreContext);
    if (!context) {
        throw new Error('useStore must be used within RootStoreProvider');
    }
    return context;
};

export const RootStoreProvider = ({ children }) => {
    return (
        <RootStoreContext.Provider value={rootStore}>
            {children}
        </RootStoreContext.Provider>
    );
};

export { rootStore };
