import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

type ILabel = React.HTMLAttributes<HTMLLabelElement>;
type ISpan = React.HTMLAttributes<HTMLSpanElement>;
type IInput = React.HTMLAttributes<HTMLInputElement> & {
  value?: string;
  type?: string;
  accept?: string;
};

export const Label = ({ className, ...props }: ILabel) => {
  return (
    <label
      {...props}
      className={twMerge(
        `w-full flex flex-col relative text-sm focus:bg-red-500 ${className}`
      )}
    />
  );
};

export const LabelError = ({ className, ...props }: ISpan) => {
  return <span {...props} className={twMerge(`text-red-600 ${className}`)} />;
};

export const Input = forwardRef<any, IInput>((props, ref) => {
  const { className } = props;
  return (
    <input
      {...props}
      ref={ref}
      className={twMerge(
        `w-full p-2 px-3 border text-md rounded-md transition peer
         outline-none border-gray-300
         hover:border-blue-500 focus:border-blue-500
         data-[error=true]:border-red-600 data-[type=color]:p-0
         [&:hover~div]:border-blue-500 [&:focus~div]:border-blue-500
         [&:focus~div]:text-blue-500 [&~div]:data-[error=true]:border-red-600
         bg-white ${className}`
      )}
    />
  );
});

Input.displayName = "Input";
