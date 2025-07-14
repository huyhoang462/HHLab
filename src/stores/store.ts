/* eslint-disable @typescript-eslint/no-explicit-any */
import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./slices/todoSlice";
import { localStorageMiddleware } from "./middleware/localStorageMiddleware";

const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("todoState");
    if (serializedState === null) {
      return undefined;
    }
    const parsed = JSON.parse(serializedState);
    parsed.categories.forEach((category: any) => {
      category.works.forEach((work: any) => {
        work.deadline = new Date(work.deadline);
      });
    });
    return parsed;
  } catch (error) {
    console.error("Could not load state from localStorage", error);
    return undefined;
  }
};

export const store = configureStore({
  reducer: {
    todo: todoReducer,
  },
  preloadedState: {
    todo: loadFromLocalStorage(),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(localStorageMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
