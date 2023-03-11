import { useSortable } from "@dnd-kit/sortable";
import { GetModule } from "../ui/modules/get-module";
import { CSS } from "@dnd-kit/utilities";
import { ConstructorPlaceholder } from "../ui/constructor-placeholder";

type Props = {
  item: ModuleItem;
  activeItem: ModuleItem | null;
  disallowedToMovePast: string[];
  draggable: boolean;
  runtimeMode: boolean;
  displayValue?: string;
  onClick?: (value: string) => void;
  onDoubleClick?: () => void;
};

export const SortableItem = ({
  item,
  activeItem,
  disallowedToMovePast,
  draggable = true,
  runtimeMode = false,
  displayValue,
  onClick,
  onDoubleClick,
}: Props) => {
  const active = activeItem?.name === item.name;

  const { attributes, listeners, transform, setNodeRef, over } = useSortable({
    id: item.id,
    disabled: runtimeMode || !draggable,
    data: {
      name: item.name,
    },
  });

  const style = () => {
    if (activeItem && disallowedToMovePast.indexOf(activeItem.name) > -1) {
      return undefined;
    } else {
      if (activeItem && disallowedToMovePast.indexOf(over?.data.current?.name) === -1) {
        return {
          transform: CSS.Translate.toString(transform),
        };
      }
      return undefined;
    }
  };

  return (
    <div
      className={`${!draggable ? "cursor-not-allowed" : ""}`}
      style={style()}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      onDoubleClick={onDoubleClick}
    >
      {active ? (
        <ConstructorPlaceholder />
      ) : (
        <GetModule displayValue={displayValue} item={item} onClick={onClick} moduleClickable={true} />
      )}
    </div>
  );
};
