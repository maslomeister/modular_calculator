import { useCallback, useMemo } from "react";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { removeModule } from "@/store/reducers/modularConstructorSlice";
import { SortableItem } from "./sortable-item";
import { useDroppable } from "@dnd-kit/core";
import { DndOverlay } from "./dnd-overlay";

type Props = {
  modulesInBuilder: ModuleItem[];
  onClick?: (value: string) => void;
};

export const DndSortableContainer = ({ modulesInBuilder, onClick }: Props) => {
  const { displayValue } = useAppSelector((state) => state.calculator);
  const { currentlyDraggedItem, runtimeMode } = useAppSelector((state) => state.modularConstructor);
  const dispatch = useAppDispatch();

  const items = modulesInBuilder.map((item) => item.id);

  const doubleClick = useCallback((name: string) => () => !runtimeMode ? dispatch(removeModule(name)) : undefined, [runtimeMode]);

  const disallowedToMovePast = useMemo(() => {
    return modulesInBuilder.filter((item) => !item.draggable).map((item) => item.name);
  }, [modulesInBuilder]);

  const { setNodeRef } = useDroppable({
    id: "constructor",
  });

  return (
    <div ref={setNodeRef} className="flex flex-col gap-3 h-[445px]">
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {modulesInBuilder.map((item) => {
          return (
            <SortableItem
              displayValue={runtimeMode && item.name === "display" ? displayValue : undefined}
              key={item.id}
              item={item}
              activeItem={currentlyDraggedItem}
              disallowedToMovePast={disallowedToMovePast}
              draggable={item.draggable}
              runtimeMode={runtimeMode}
              onClick={onClick}
              onDoubleClick={doubleClick(item.name)}
            />
          );
        })}
      </SortableContext>
      <DndOverlay item={currentlyDraggedItem} />
    </div>
  );
};
