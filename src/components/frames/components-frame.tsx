import { useAppSelector } from "@/store/hooks";
import { DraggableItem } from "../dnd/draggable-item";

export const ComponentsFrame = () => {
  const { currentlyDraggedItem, availableModules, modules, runtimeMode } = useAppSelector((state) => state.modularConstructor);

  return (
    <div className="flex flex-col justify-end gap-3">
      {!runtimeMode
        ? availableModules.map((item) => {
            const isDisabled = modules.find((mod) => mod.name === item.name) !== undefined;
            const isBeingDragged = currentlyDraggedItem?.name === item.name ? "opacity-50" : "";

            return (
              <DraggableItem
                className={`${isDisabled ? "cursor-not-allowed opacity-50" : "cursor-move"} ${isBeingDragged}`}
                draggable={!isDisabled}
                key={item.name}
                item={item}
              />
            );
          })
        : null}
    </div>
  );
};
