import { useDraggable } from "@dnd-kit/core";
import { GetModule } from "../ui/modules/get-module";

type Props = {
  className?: string;
  item: ModuleItem;
  moduleClickable?: boolean;
  draggable?: boolean;
  onClick?: (value: string) => void;
  onDoubleClick?: () => void;
};

export const DraggableItem = ({ className, item, moduleClickable = false, draggable = true, onClick, onDoubleClick }: Props) => {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: item.id,
    disabled: !draggable,
    data: {
      name: item.name,
    },
  });

  return (
    <div className={className} ref={setNodeRef} {...listeners} {...attributes} onDoubleClick={onDoubleClick}>
      <GetModule item={item} onClick={onClick} moduleClickable={moduleClickable} />
    </div>
  );
};
