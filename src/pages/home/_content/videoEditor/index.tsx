import {
  PiArrowsMergeBold,
  PiCameraBold,
  PiDownloadSimpleBold,
  PiPause,
  PiRecordBold,
  PiTrashBold,
  PiUser,
  PiVideo,
  PiVideoCameraBold,
} from "react-icons/pi";
import { SolidButton, SolidButtonRed } from "src/lib/common/Button/SolidButton";
import { Column, Row } from "src/lib/common/Containers/Flex";
import useScreenRecord from "src/hooks/useScreenRecord";
import { VideoCard, VideoCardPurple } from "src/lib/common/Cards/VideoCard";
import If from "src/lib/common/Containers/Conditional";
import { Video } from "src/lib/common/Media/Video";
import Paragraph from "src/lib/common/Text/Paragraph";

export const VideoEditor = () => {
  const {
    inRecording,
    recordStartTime,
    editVideo,
    videoList,
    fileToURL,
    onStartRecord,
    onStopRecord,
    onPauseRecord,
    onDownload,
    onCleanList,
    setEditVideo,
  } = useScreenRecord();

  return (
    <Column item="start" gap={4}>
      <Row className="w-fit">
        <If check={!(inRecording && recordStartTime)}>
          <SolidButtonRed onClick={onStartRecord}>
            <PiRecordBold size={18} />
            Record
          </SolidButtonRed>
        </If>
        <If check={!!(inRecording && recordStartTime)}>
          <SolidButtonRed onClick={onPauseRecord}>
            <PiPause size={18} />
            Pause {recordStartTime}s
          </SolidButtonRed>
        </If>
        <SolidButton onClick={onStopRecord} disabled={!inRecording}>
          <PiPause size={18} />
          Stop
        </SolidButton>
        <SolidButton onClick={onStartRecord}>
          <PiUser size={18} />
          Webcam
        </SolidButton>
        <SolidButton disabled={videoList.length < 2}>
          <PiArrowsMergeBold size={18} />
          Merge
        </SolidButton>
        <SolidButton onClick={onCleanList} disabled={videoList.length === 0}>
          <PiTrashBold size={18} />
          Clean
        </SolidButton>
        <SolidButton onClick={onDownload} disabled={!editVideo}>
          <PiDownloadSimpleBold size={18} />
          Download
        </SolidButton>
      </Row>
      <Row item="start" resposive="md">
        <VideoCard className="h-[450px] w-full">
          <If check={!inRecording && !editVideo}>
            <PiVideoCameraBold size={34} className="text-gray-500" />
          </If>
          <If check={inRecording}>
            <Video id="record_preview" />
          </If>
          <If check={!!editVideo}>
            <Video src={editVideo && fileToURL(editVideo)} />
          </If>
        </VideoCard>
        <VideoCard className="w-80 h-40">
          <PiCameraBold size={34} className="text-gray-500" />
        </VideoCard>
      </Row>
      <Row className="p-4 border border-gray-400 rounded-xl h-40">
        {videoList.map((video, index) => (
          <VideoCardPurple key={index} onClick={() => setEditVideo(video)}>
            <PiVideo size={40} className="text-purple-500" />
            <Paragraph size="sm" opacity="70">
              {video.size} kb
            </Paragraph>
          </VideoCardPurple>
        ))}
      </Row>
    </Column>
  );
};
