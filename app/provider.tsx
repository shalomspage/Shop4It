"use client";

import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { useEffect } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { rehydrateAuth } from "./features/auth/rehydrateAuth";

function AuthInitializer() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(rehydrateAuth());
  }, [dispatch]);

  return null;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <AuthInitializer />
      {children}
    </Provider>
  );
}
