import { useMemo } from "react";

export const Display = ({ displayValue, disabled = false }: { displayValue: string; disabled?: boolean }) => {
  const fontSize = useMemo(() => {
    if (displayValue) {
      const validNumberDisplay = displayValue.replace(",", ".");

      if (isNaN(+validNumberDisplay)) {
        return "text-2xl";
      }

      if (validNumberDisplay.length > 18) {
        return "text-sm";
      }

      if (validNumberDisplay.length > 12) {
        return "text-[19px]";
      }

      if (validNumberDisplay.length > 9) {
        return "text-2xl";
      }

      if (validNumberDisplay.length > 6) {
        return "text-3xl";
      }

      return "text-4xl";
    } else {
      return "text-4xl";
    }
  }, [displayValue]);
  return (
    <div
      className={`w-full  flex flex-1 h-[52px] items-end justify-end px-2 py-1 rounded bg-gray-100 ${
        disabled ? "pointer-events-none" : ""
      }`}
    >
      <span className={`text-gray-900 ${fontSize} font-extrabold`}>{displayValue}</span>
    </div>
  );
};
