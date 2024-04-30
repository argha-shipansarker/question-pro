import React, { createContext, useState } from 'react';
import { AppContextType, AppProviderProps, UserInfoType } from './interface';


const initialContextValue: AppContextType = {
    userInfo: {
        name: "Argha Shipan Sarker",
        email: "arghasarker55@gmail.com"
    },
    setUserInfo: () => { },
};

const AppContext = createContext<AppContextType>(initialContextValue);

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
    const [userInfo, setUserInfo] = useState<UserInfoType>(initialContextValue.userInfo);

    return (
        <AppContext.Provider value={{ userInfo, setUserInfo }}>
            {children}
        </AppContext.Provider>
    );
};

export const useContextApi = () => {
    return React.useContext(AppContext);
};

export default AppProvider