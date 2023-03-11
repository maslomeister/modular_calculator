export const EyeIcon = ({ width = 20, height = 20, color }: IconProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" width={width} height={height} viewBox="0 0 20 20">
      <path
        stroke={color ?? "#4D5562"}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M11.8 11.8a2.5 2.5 0 1 0-3.6-3.6 2.5 2.5 0 0 0 3.6 3.6Z"
      />
      <path
        stroke={color ?? "#4D5562"}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M2 10a8.3 8.3 0 0 1 16 0 8.3 8.3 0 0 1-16 0Z"
      />
    </svg>
  );
};
