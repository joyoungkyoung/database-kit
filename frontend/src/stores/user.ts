import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface UserStoreType {
    username: string | null;
    accessToken: string | null;
    actions: {
        setUser: (username: string, accessToken: string) => void;
    };
}
const useUserStore = create<UserStoreType>()(
    devtools((set) => {
        return {
            username: null,
            accessToken: null,
            actions: {
                setUser: (username: string, accessToken: string) => set({ username, accessToken }),
            },
        };
    })
);

export const useUsername = () => useUserStore((state) => state.username);
export const useAccessToken = () => useUserStore((state) => state.accessToken);
export const useUserActions = () => useUserStore((state) => state.actions);
