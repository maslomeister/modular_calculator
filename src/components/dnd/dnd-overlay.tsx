import { DragOverlay, Modifiers } from "@dnd-kit/core";
import { GetModule } from "../ui/modules/get-module";

export const DndOverlay = ({ modifiers, item }: { modifiers?: Modifiers; item: ModuleItem | null }) => {
  return (
    <DragOverlay className={"cursor-move opacity-70"} zIndex={10} modifiers={modifiers}>
      {item && <GetModule item={item} />}
    </DragOverlay>
  );
};
