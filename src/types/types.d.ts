interface IconProps {
  width?: number;
  height?: number;
  color?: string;
}

type Module = {
  onClick?: (value: string) => void;
  disabled?: boolean;
};

type ModuleItem = {
  id: string;
  name: string;
  draggable: boolean;
};

type ConstructorModuleName = "display" | "operands" | "numberPad" | "equals";
