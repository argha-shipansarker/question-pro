import { ReactNode } from "react";

export interface UserInfoType {
    name: string;
    email: string;
}

export interface AppContextType {
    userInfo: UserInfoType;
    setUserInfo: (userInfo: UserInfoType) => void;
};

export interface AppProviderProps {
    children: ReactNode;
};