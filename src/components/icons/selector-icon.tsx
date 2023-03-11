export const SelectorIcon = ({ width = 20, height = 20, color }: IconProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" width={width} height={height} viewBox="0 0 20 20">
      <path
        stroke={color ?? "#4D5562"}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M7.5 13.3 4.2 10l3.3-3.3m5 0 3.3 3.3-3.3 3.3"
      />
    </svg>
  );
};
