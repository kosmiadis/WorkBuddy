import { create } from "zustand";
import type { IUser } from "../types/User";

interface AuthStoreI {
    user: null | IUser;
    setUser: (user: IUser) => void;
}

export const useAuth = create<AuthStoreI>((set) => ({
    user: null,
    setUser: (user: IUser) => set(() => ({ user }))
}))