import { Module } from "module";
import { useCallback } from "react";
import { Button } from "../button";

export const Equals = ({ disabled = false, onClick }: Pick<Module, "disabled" | "onClick">) => {
  const equalsClick = useCallback(() => onClick && onClick("equals"), [onClick]);

  return (
    <Button
      className={`w-full bg-active gap-2 h-16 text-white active:bg-[#4042A6] ${disabled && "pointer-events-none"}`}
      onClick={equalsClick}
    >
      =
    </Button>
  );
};
