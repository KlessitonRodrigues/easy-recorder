import { useState } from "react";
import { Column } from "src/lib/common/Containers/Flex";

const RecordTable = () => {
  const [videoList, setVideoList] = useState<Blob[]>([]);

  return (
    <Column item="start">
      {videoList.map((video, index) => (
        <video
          className="h-80 overflow-hidden rounded-lg border-2"
          key={index}
          controls
          src={URL.createObjectURL(video)}
          style={{ marginTop: "10px", maxWidth: "100%" }}
        />
      ))}
    </Column>
  );
};

export default RecordTable;
