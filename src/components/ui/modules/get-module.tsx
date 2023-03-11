import { useMemo } from "react";
import { Display } from "@/components/ui/modules/display";
import { Equals } from "@/components/ui/modules/equals";
import { NumberPad } from "@/components/ui/modules/number-pad";
import { Operands } from "@/components/ui/modules/operands";

type Props = {
  className?: string;
  item: ModuleItem;
  moduleClickable?: boolean;
  displayValue?: string;
  onClick?: (value: string) => void;
};

export const GetModule = ({ className, item, displayValue, moduleClickable = false, onClick }: Props) => {
  const getModule = useMemo(() => {
    switch (item.name) {
      case "display":
        return <Display displayValue={displayValue ?? "0"} />;
      case "operands":
        return <Operands onClick={onClick} />;
      case "numberPad":
        return <NumberPad onClick={onClick} />;
      case "equals":
        return <Equals onClick={onClick} />;
    }
  }, [item.name, displayValue, onClick]);

  return (
    <div
      className={`${className ?? ""} p-1 shadow-md rounded bg-white w-[243px] ${
        !moduleClickable ? "pointer-events-none select-none" : ""
      }`}
    >
      {getModule}
    </div>
  );
};
