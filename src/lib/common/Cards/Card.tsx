import { twMerge } from "tailwind-merge";

type ICard = React.HTMLAttributes<HTMLDivElement>;

export const Card = ({ className, ...props }: ICard) => {
  return (
    <div
      {...props}
      className={twMerge(
        `w-full flex flex-col items-start gap-2 p-4 rounded-lg shadow-sm 
         text-text1 bg-white hover:shadow-md transition-shadow ${className}`
      )}
    />
  );
};

export const CardRed = ({ className, ...props }: ICard) => {
  return <Card {...props} className={`bg-red-700 text-white ${className}`} />;
};

export const CardGreen = ({ className, ...props }: ICard) => {
  return <Card {...props} className={`bg-green-700 text-white ${className}`} />;
};
