import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addModule, moveModule, setDraggedItem } from "@/store/reducers/modularConstructorSlice";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragOverEvent,
  DragEndEvent,
  closestCorners,
  pointerWithin,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useCallback, useMemo } from "react";

import { CollisionDetection } from "@dnd-kit/core";

export const DnDContext = ({ children }: { children: React.ReactNode }) => {
  const { currentlyDraggedItem, availableModules, modules } = useAppSelector((state) => state.modularConstructor);
  const items = useMemo(() => modules.map((item) => item.name), [modules]);

  const dispatch = useAppDispatch();

  const collisionDetectionStrategy: CollisionDetection = useCallback(
    (args) => {
      if (currentlyDraggedItem) {
        if (items.find((item) => item === currentlyDraggedItem.name)) {
          const closest = closestCenter({
            ...args,
            droppableContainers: args.droppableContainers.filter((container) =>
              items.find((item) => item === container.data.current?.name)
            ),
          });
          return closest;
        } else {
          return pointerWithin({
            ...args,
            droppableContainers: args.droppableContainers.filter((container) => container.id === "constructor"),
          });
        }
      }

      return closestCorners(args);
    },
    [currentlyDraggedItem?.name, items]
  );

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 200,
        tolerance: 150,
      },
    })
  );

  function DragStart(event: DragStartEvent) {
    const item = availableModules.find((item) => item.name === event.active.data.current?.name);
    if (item) {
      dispatch(setDraggedItem(item));
    }
  }

  function DragOver(event: DragOverEvent) {
    if (modules.length > 0) {
      if (currentlyDraggedItem && event.active.data.current?.name === currentlyDraggedItem.name) {
        const collision = event.collisions?.find((col) => col.id === "constructor");

        if (collision) {
          if (modules.find((item) => item.name === currentlyDraggedItem.name) === undefined) {
            dispatch(addModule(currentlyDraggedItem));
          }
        }
      }
    }
  }

  function DragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (currentlyDraggedItem) {
      if (modules.length === 0) {
        if (over?.id === "constructor") {
          dispatch(addModule(currentlyDraggedItem));
        }
      }

      if (!modules.some((item) => item.name === currentlyDraggedItem?.name && item.draggable)) {
        dispatch(setDraggedItem(null));
        return;
      }

      if (over && active.data.current?.name !== over.data.current?.name) {
        const oldIndex = items.indexOf(active.data.current?.name as string);
        const newIndex = items.indexOf(over.data.current?.name as string);

        if (newIndex !== -1) {
          if (modules[newIndex].draggable) {
            dispatch(moveModule({ oldIndex, newIndex }));
            arrayMove(items, oldIndex, newIndex);
          }
        }
      }

      dispatch(setDraggedItem(null));
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={collisionDetectionStrategy}
      onDragStart={DragStart}
      onDragOver={DragOver}
      onDragEnd={DragEnd}
    >
      {children}
    </DndContext>
  );
};
