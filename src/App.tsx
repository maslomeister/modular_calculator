import { useEffect } from "react";
import { useAppDispatch } from "./store/hooks";
import { loadAvailableModules } from "./store/reducers/modularConstructorSlice";
import { DnDContext } from "./components/dnd/dnd-context";
import { nanoid } from "@reduxjs/toolkit";
import { ConstructorFrame } from "./components/frames/constructor-frame";
import { ComponentsFrame } from "./components/frames/components-frame";

const availableElements = [
  { id: nanoid(), name: "display", draggable: false },
  { id: nanoid(), name: "operands", draggable: true },
  { id: nanoid(), name: "numberPad", draggable: true },
  { id: nanoid(), name: "equals", draggable: true },
];

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadAvailableModules(availableElements));
  }, []);

  return (
    <div className="flex flex-auto flex-col mx-auto justify-center items-center gap-8 font-inter w-fit h-[100vh]">
      <DnDContext>
        <div className="flex justify-end gap-14 w-[542px]">
          <ComponentsFrame />
          <ConstructorFrame />
        </div>
      </DnDContext>
    </div>
  );
}

export default App;
