import { useEffect, useState } from "react";
import { mergeVideos, screenRecord } from "src/utils/video";

const useScreenRecord = () => {
  const [inRecording, setRecording] = useState(false);
  const [recordTime, setRecordTime] = useState(0);
  const [videoList, setVideoList] = useState<File[]>([]);
  const [editVideo, setEditVideo] = useState<File>();

  const onRecordStart = async () => {
    setRecording(true);
    setEditVideo(undefined);
    const videoData = await screenRecord();
    setVideoList((prev) => [...prev, videoData]);
    setEditVideo(videoData);
    setRecording(false);
  };

  const onDownload = () => {
    if (!editVideo) return;
    const url = URL.createObjectURL(editVideo);
    const a = document.createElement("a");
    a.href = url;
    a.download = editVideo.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const onMergeAllVideos = async () => {
    if (videoList.length < 2) return;
    const mergedVideo = await mergeVideos(videoList);
    setEditVideo(mergedVideo);
    setVideoList([mergedVideo]);
  };

  const onCleanList = () => {
    setVideoList([]);
    setEditVideo(undefined);
  };

  const fileToURL = (file: File) => {
    return URL.createObjectURL(file);
  };

  useEffect(() => {
    if (!inRecording) return setRecordTime(0);
    const timer = setTimeout(() => setRecordTime(recordTime + 1), 1000);
    return () => clearInterval(timer);
  }, [inRecording, recordTime]);

  return {
    inRecording,
    recordTime,
    videoList,
    editVideo,
    setEditVideo,
    setRecording,
    onRecordStart,
    onDownload,
    onMergeAllVideos,
    onCleanList,
    fileToURL,
  };
};

export default useScreenRecord;
