import type { Middleware } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export const localStorageMiddleware: Middleware =
  (store) => (next) => (action) => {
    const result = next(action);

    const state = store.getState() as RootState;

    try {
      const serializedState = JSON.stringify(state.todo);
      localStorage.setItem("todoState", serializedState);
    } catch (error) {
      console.error("Could not save state to localStorage", error);
    }

    return result;
  };
