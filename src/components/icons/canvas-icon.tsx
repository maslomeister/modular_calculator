export const CanvasIcon = ({ width = 20, height = 20, color }: IconProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" width={width} height={height} viewBox="0 0 22 22">
      <path
        stroke={color ?? "#000"}
        strokeLinecap="round"
        strokeWidth="2"
        d="M18.8 1v4.4M21 3.2h-4.4m-4.2 0H5a4 4 0 0 0-4 4v9m17.8-6.6V17a4 4 0 0 1-4 4H5a4 4 0 0 1-4-4v-.7m0 0 3.8-3.9a4 4 0 0 1 5.7 0l4.4 4.4"
      />
      <path stroke={color ?? "#000"} strokeLinecap="round" strokeWidth="2" d="m18.8 14.6-.5-.5a4 4 0 0 0-5.7 0l-.2.2" />
      <circle cx="12.1" cy="7.7" r=".6" fill={color ?? "#000"} />
    </svg>
  );
};
