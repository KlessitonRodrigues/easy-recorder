import { twMerge } from "tailwind-merge";

export const TabContainer = (props: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      {...props}
      className={twMerge(
        `w-full px-4 pb-4 border border-gray-200 rounded-lg ${props.className}`
      )}
    />
  );
};
