import { TProductDb } from "@/db/types";
import React from "react";

type TAppContext = {
  productDetails?: Partial<TProductDb>;
  clearProductDetails: () => void;
  setProductDetails: (details: Partial<TAppContext["productDetails"]>) => void;
};

type TState = TAppContext["productDetails"];

export const AppContext = React.createContext<TAppContext>({
  clearProductDetails: () => {},
  setProductDetails: () => {},
});

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [_, setTick] = React.useState(0);
  const state = React.useRef<TState | undefined>(undefined);

  const setState = (newState: Partial<TState>, refresh = true) => {
    if (newState === undefined) {
      state.current = undefined;
    } else {
      state.current = { ...state.current, ...newState };
    }

    console.log("AppProvider > setState", { newState, state: state.current });

    refresh && setTick((current) => current + 1);
  };

  console.log("AppProvider", { state: state.current });

  return (
    <AppContext.Provider
      value={{
        productDetails: state.current,
        clearProductDetails: () => setState(undefined),
        setProductDetails: (details) => setState(details),
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
