import type { ICategory, IWork } from "../../types/ITodoItem";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface TodoState {
  categories: ICategory[];
}

const initialState: TodoState = {
  categories: [],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState: initialState,
  reducers: {
    addCategory: (state, actions: PayloadAction<string>) => {
      const newCategory: ICategory = {
        id: `cat-${Date.now()}`,
        title: actions.payload,
        works: [],
      };
      state.categories.push(newCategory);
    },
    addWorkToCategory: (
      state,
      actions: PayloadAction<{
        categoryId: string;
        workData: Omit<IWork, "id">;
      }>
    ) => {
      const { categoryId, workData } = actions.payload;
      const category = state.categories.find((cat) => cat.id === categoryId);
      if (category) {
        const newWork: IWork = {
          ...workData,
          id: `work-${Date.now()}`,
        };
        category.works.push(newWork);
      }
    },
    toggleWorkDone: (
      state,
      action: PayloadAction<{ categoryId: string; workId: string }>
    ) => {
      const { categoryId, workId } = action.payload;
      const category = state.categories.find((cat) => cat.id === categoryId);
      if (category) {
        const work = category.works.find((w) => w.id === workId);
        if (work) {
          work.isDone = !work.isDone;
        }
      }
    },
    deleteCategory: (state, action: PayloadAction<string>) => {
      state.categories = state.categories.filter(
        (cat) => cat.id !== action.payload
      );
    },
    deleteWorkFromCategory: (
      state,
      action: PayloadAction<{ categoryId: string; workId: string }>
    ) => {
      const { categoryId, workId } = action.payload;
      const category = state.categories.find((cat) => cat.id === categoryId);
      if (category) {
        const work = category.works.find((w) => w.id === workId);
        if (work) {
          category.works = category.works.filter((work) => work.id !== workId);
        }
      }
    },
    setTodoState: (state, actions: PayloadAction<TodoState>) => {
      state.categories = actions.payload.categories;
    },
  },
});

export const {
  addCategory,
  addWorkToCategory,
  toggleWorkDone,
  deleteCategory,
  deleteWorkFromCategory,
  setTodoState,
} = todoSlice.actions;
export default todoSlice.reducer;
