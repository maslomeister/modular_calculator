import { useCallback } from "react";
import { Button } from "../button";

const Operand = ({ children, onClick }: { children: string; onClick?: (operand: string) => void }) => {
  const operandClick = useCallback(() => onClick && onClick(children), [onClick]);

  return (
    <Button
      className="flex w-1/4 h-12 px-[2px] rounded border border-normal active:border-active active:border-2 active:mx-0"
      onClick={operandClick}
    >
      {children}
    </Button>
  );
};

export const Operands = (props: Pick<Module, "disabled" | "onClick">) => {
  return (
    <div className="flex gap-2">
      <Operand {...props}>/</Operand>
      <Operand {...props}>x</Operand>
      <Operand {...props}>-</Operand>
      <Operand {...props}>+</Operand>
    </div>
  );
};
