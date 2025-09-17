import { twMerge } from "tailwind-merge";

type IVideoCard = React.HTMLAttributes<HTMLDivElement>;

export const VideoCard = ({ className, ...props }: IVideoCard) => {
  return (
    <div
      {...props}
      className={twMerge(
        `flex flex-col items-center justify-center w-40 h-30 rounded-xl border border-gray-300
         bg-gray-950 cursor-pointer ${className}`
      )}
    />
  );
};

export const VideoCardPurple = ({ className, ...props }: IVideoCard) => {
  return (
    <VideoCard
      {...props}
      className={twMerge(
        `border-purple-300 bg-white hover:bg-purple-50 ${className}`
      )}
    />
  );
};
