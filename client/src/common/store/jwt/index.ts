import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type JWTState = {
  jwt: string | null;
};

type JWTStore = JWTState & {
  setJWT: (jwt: string) => void;
};

export const useJWTStore = create<JWTStore>()(
  devtools(
    persist(
      (set) => ({
        jwt: null,
        setJWT: (jwt) => {
          set({ jwt });
        },
      }),
      {
        name: "jwt-storage",
      }
    )
  )
);
