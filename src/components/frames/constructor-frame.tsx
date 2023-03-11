import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { registerKey, resetCalculator } from "@/store/reducers/calculatorSlice/calculatorSlice";
import { switchRuntime } from "@/store/reducers/modularConstructorSlice";
import { useEffect } from "react";
import { DndSortableContainer } from "../dnd/dnd-sortable-container";
import { Canvas } from "../ui/canvas";
import { ToggleRuntimeMode } from "../ui/toggle-runtime-mode";

export const ConstructorFrame = () => {
  const { runtimeMode, modules, currentlyDraggedItem } = useAppSelector((state) => state.modularConstructor);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!runtimeMode) {
      dispatch(resetCalculator());
    }
  }, [runtimeMode]);

  const onClick = runtimeMode ? (value: string) => dispatch(registerKey(value)) : undefined;

  return (
    <div className="relative flex justify-end flex-col gap-[30px]">
      <ToggleRuntimeMode checked={runtimeMode} onClick={() => dispatch(switchRuntime())} />
      {modules.length === 0 && <Canvas isActive={currentlyDraggedItem !== null} />}
      <DndSortableContainer modulesInBuilder={modules} onClick={onClick} />
    </div>
  );
};
