import { twMerge } from "tailwind-merge";

export const Form = (props: React.HTMLAttributes<HTMLFormElement>) => {
  return (
    <form
      {...props}
      className={twMerge(
        `w-full max-w-3xl p-4 rounded-lg flex flex-col items-start gap-4
          border border-gray-200 ${props.className}`
      )}
    />
  );
};
