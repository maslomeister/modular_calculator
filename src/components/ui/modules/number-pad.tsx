import { useCallback } from "react";
import { Button } from "../button";

const Item = ({
  span = 1,
  children,
  onClick,
  disabled = false,
}: {
  span?: 1 | 2;
  children: string;
  onClick?: (number: string) => void;
  disabled?: boolean;
}) => {
  const numberClick = useCallback(() => onClick && onClick(children), [onClick]);

  return (
    <Button
      className={`h-12 ${span === 1 ? "w-1/3" : "w-2/3"} border border-normal active:border-active active:border-2 ${
        disabled && "pointer-events-none"
      }`}
      onClick={numberClick}
    >
      {children}
    </Button>
  );
};

export const NumberPad = (props: Pick<Module, "disabled" | "onClick">) => {
  return (
    <div className="flex flex-grow-0 gap-2 flex-col">
      <div className="flex flex-row gap-2">
        <Item {...props}>7</Item>
        <Item {...props}>8</Item>
        <Item {...props}>9</Item>
      </div>

      <div className="flex flex-row gap-2">
        <Item {...props}>4</Item>
        <Item {...props}>5</Item>
        <Item {...props}>6</Item>
      </div>

      <div className="flex flex-row gap-2">
        <Item {...props}>1</Item>
        <Item {...props}>2</Item>
        <Item {...props}>3</Item>
      </div>

      <div className="flex flex-row gap-2">
        <Item {...props} span={2}>
          0
        </Item>
        <Item {...props}>,</Item>
      </div>
    </div>
  );
};
