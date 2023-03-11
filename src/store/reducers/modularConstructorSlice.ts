import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";

export interface ModularConstructorState {
  runtimeMode: boolean;
  availableModules: ModuleItem[];
  modules: ModuleItem[];
  constructorEmpty: boolean;
  currentlyDraggedItem: ModuleItem | null;
}

export const initialModularConstructorState: ModularConstructorState = {
  runtimeMode: false,
  availableModules: [],
  modules: [],
  constructorEmpty: true,
  currentlyDraggedItem: null,
};

function moveModules(modules: ModuleItem[], fromIndex: number, toIndex: number) {
  const element = modules[fromIndex];
  modules.splice(fromIndex, 1);
  modules.splice(toIndex, 0, element);
}

export const modularConstructorSlice = createSlice({
  name: "modularConstructor",
  initialState: initialModularConstructorState,
  reducers: {
    loadAvailableModules: (state, action: PayloadAction<ModuleItem[]>) => {
      state.availableModules = action.payload;
    },
    setDraggedItem: (state, action: PayloadAction<ModuleItem | null>) => {
      if (action.payload === null) {
        const availModIndex = state.availableModules.findIndex((item) => item.name === state.currentlyDraggedItem?.name);

        state.availableModules[availModIndex] = {
          ...state.availableModules[availModIndex],
          id: nanoid(),
        };
      }
      state.currentlyDraggedItem = action.payload;
    },
    switchRuntime: (state) => {
      state.runtimeMode = !state.runtimeMode;

      return state;
    },
    moveModule: (state, action: PayloadAction<{ oldIndex: number; newIndex: number }>) => {
      const newModules = [...state.modules];
      moveModules(newModules, action.payload.oldIndex, action.payload.newIndex);
      state.modules = newModules;
    },
    addModule: (state, action: PayloadAction<ModuleItem>) => {
      if (state.constructorEmpty) state.constructorEmpty = false;

      if (action.payload.name === "display") {
        state.modules.unshift(action.payload);
      } else {
        state.modules.push(action.payload);
      }
    },
    removeModule: (state, action: PayloadAction<string>) => {
      const filteredModules = state.modules.filter((item) => item.name !== action.payload);
      state.modules = filteredModules;

      if (state.modules.length === 0) {
        state.constructorEmpty = true;
      }
    },
  },
});

export const { loadAvailableModules, switchRuntime, addModule, removeModule, moveModule, setDraggedItem } =
  modularConstructorSlice.actions;

export default modularConstructorSlice.reducer;
