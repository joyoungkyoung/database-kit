import { StateCreator, create } from "zustand";
import { PersistOptions, createJSONStorage, devtools, persist } from "zustand/middleware";

type AuthStoreType = {
    username: string | null;
    accessToken: string | null;
    actions: {
        setAuth: (username: string, accessToken: string) => void;
    };
};

type PersistAuthStoreType = (
    config: StateCreator<AuthStoreType>,
    options: PersistOptions<AuthStoreType>
) => StateCreator<AuthStoreType>;

const useAuthStore = create<AuthStoreType>()(
    devtools(
        (persist as PersistAuthStoreType)(
            (set) => {
                return {
                    username: null,
                    accessToken: null,
                    actions: {
                        setAuth: (username: string, accessToken: string) => set({ username, accessToken }),
                    },
                };
            },
            {
                name: "auth",
                storage: createJSONStorage(() => localStorage),
            }
        )
    )
);

export const useUsername = () => useAuthStore((state) => state.username);
export const useAccessToken = () => useAuthStore((state) => state.accessToken);
export const useAuthActions = () => useAuthStore((state) => state.actions);
