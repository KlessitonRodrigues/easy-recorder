import { useState } from "react";
import { PiVideoCameraBold } from "react-icons/pi";
import { VideoCard } from "src/lib/common/Cards/VideoCard";
import If from "src/lib/common/Containers/Conditional";

type IVideoRecorderProps = {
  inRecord?: boolean;
  content?: string;
  onRecordStart?: () => void;
  onRecordStop?: (video: Blob) => void;
};

export const VideoRecorder = (props: IVideoRecorderProps) => {
  const { content } = props;
  const [onRecord] = useState(false);

  return (

  );
};
