import { CanvasIcon } from "../icons/canvas-icon";

export const Canvas = ({ isActive }: { isActive: boolean }) => {
  return (
    <div
      className={`absolute flex flex-col justify-center items-center h-[448px] w-[243px]  rounded-md text-center pointer-events-none ${
        isActive ? "bg-[#F0F9FF]" : "bg-[#fff]"
      }`}
    >
      <div className="absolute bg-dashed-border top-0 left-0 bottom-0 right-0 rounded-md"></div>
      <CanvasIcon />
      <p className="pt-3 text-sm text-active">Перетащите сюда</p>
      <p className="pt-1 text-xsm text-[#6B7280]">
        любой элемент
        <br /> из левой панели
      </p>
    </div>
  );
};
