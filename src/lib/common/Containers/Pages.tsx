import { twMerge } from "tailwind-merge";

type IPage = React.HTMLAttributes<HTMLDivElement> & {};

export const DefaultPage = (props: IPage) => {
  return (
    <div
      {...props}
      className={twMerge(
        `bg-gray-50 text-gray-700 min-h-screen  ${props.className}`
      )}
    />
  );
};

export const PageHeader = (props: IPage) => {
  return (
    <div
      {...props}
      className={twMerge(
        `w-full bg-gray-50 mx-auto max-w-[80rem] ${props.className}`
      )}
    />
  );
};

export const PageContent = (props: IPage) => {
  return (
    <div
      {...props}
      className={twMerge(
        `w-full h-full p-4 bg-gray-50 mx-auto max-w-[80rem] ${props.className}`
      )}
    />
  );
};
