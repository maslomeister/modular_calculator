import React from "react";

type Props = {
  className: string;
  onClick?: () => void;
  children: React.ReactNode;
};

export const Button = ({ className, onClick, children }: Props) => {
  return (
    <button className={`flex justify-center items-center rounded text-sm font-medium select-none  ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};
