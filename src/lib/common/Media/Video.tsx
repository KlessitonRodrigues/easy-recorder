import { twMerge } from "tailwind-merge";

type IVideo = React.HTMLAttributes<HTMLVideoElement> & {
  src?: string;
};

export const Video = ({ className, ...props }: IVideo) => {
  return (
    <video
      {...props}
      controls
      muted
      className={twMerge(`w-full overflow-hidden rounded-3xl ${className}`)}
    />
  );
};
