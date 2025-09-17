import { Button, ButtonProps } from "antd";
import { twMerge } from "tailwind-merge";

export const SolidButton = ({ className, ...props }: ButtonProps) => {
  return (
    <Button
      {...props}
      variant="solid"
      className={twMerge(`!rounded-lg !text-gray-500 !font-bold ${className}`)}
    />
  );
};

export const SolidButtonRed = ({ className, ...props }: ButtonProps) => {
  return (
    <SolidButton
      {...props}
      className={`!bg-red-700 !text-white ${className}`}
    />
  );
};

export const SolidButtonGreen = ({ className, ...props }: ButtonProps) => {
  return (
    <SolidButton
      {...props}
      className={`!bg-green-500 !text-white ${className}`}
    />
  );
};

export const SolidButtonBlue = ({ className, ...props }: ButtonProps) => {
  return (
    <SolidButton
      {...props}
      className={`!bg-blue-500 !text-white ${className}`}
    />
  );
};

export const SolidButtonYellow = ({ className, ...props }: ButtonProps) => {
  return (
    <SolidButton
      {...props}
      className={`!bg-yellow-600 !text-white ${className}`}
    />
  );
};
