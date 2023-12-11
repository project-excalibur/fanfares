import { create } from "zustand";
import { NostrSlice, createNostrSlice } from "./nostr-slice";
import { createJSONStorage, persist } from "zustand/middleware";
import { useEffect } from "react";
import { AccountSlice, createAccountSlice } from "./account-slice";
import { TestSlice, createTestSlice } from "./test-slice";
import { PrimalSlice, createPrimalSlice } from "./primal-slice";

export type CombinedState = TestSlice & NostrSlice & AccountSlice & PrimalSlice;

export const useAppState = create<CombinedState>()(
  persist(
    (set, get, slice) => {
      return {
        ...createTestSlice(set, get, slice),
        ...createNostrSlice(set, get, slice),
        ...createAccountSlice(set, get, slice),
        ...createPrimalSlice(set, get, slice),
      };
    },
    {
      name: "nostr-app-state", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used

      // WHAT TO PERSIST
      partialize: (state) => ({
        testState: state.testState,
        accountPublicKey: state.accountPublicKey,
        accountProfile: state.accountProfile,
      }),

      // REHYDRATE
      skipHydration: true,
      onRehydrateStorage: (state) => {
        console.log("hydration starts");
        // optional
        return (state, error) => {
          if (error) {
            console.log("an error happened during hydration", error);
          } else {
            console.log("hydration finished");
          }
        };
      },
    }
  )
);

export function setupAppState() {
  useEffect(() => {
    useAppState.persist.rehydrate();
  }, []);
}
