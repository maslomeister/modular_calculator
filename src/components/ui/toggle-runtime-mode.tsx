import { EyeIcon } from "../icons/eye-icon";
import { SelectorIcon } from "../icons/selector-icon";

export const ToggleRuntimeMode = ({ checked, onClick }: { checked: boolean; onClick: () => void }) => {
  return (
    <label
      htmlFor="toggle"
      className="text-sm inline-flex items-center p-px rounded-md cursor-pointer bg-gray-100 text-[#4D5562] w-[243px]"
    >
      <input id="toggle" type="checkbox" className="hidden peer" checked={checked} onChange={onClick} />
      <div className="flex items-center basis-1/2 gap-2 px-3 py-2 rounded-toggle border border-transparent bg-transparent peer-checked:bg-white peer-checked:border-[#E2E3E5] select-none">
        <EyeIcon color={checked ? "#5D5FEF" : "#4D5562"} />
        <p>Runtime</p>
      </div>
      <div className="flex items-center basis-1/2 gap-2 px-3 py-2 rounded-toggle border border-[#E2E3E5] bg-white peer-checked:bg-transparent peer-checked:border-transparent select-none">
        <SelectorIcon color={checked ? "#4D5562" : "#5D5FEF"} />
        <p>Constructor</p>
      </div>
    </label>
  );
};
