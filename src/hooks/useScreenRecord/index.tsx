import { useState } from "react";
import { downloadFile, mergeVideos, screenRecord } from "src/utils/video";

const useScreenRecord = () => {
  const [inRecording, setRecording] = useState(false);
  const [videoList, setVideoList] = useState<File[]>([]);
  const [editVideo, setEditVideo] = useState<File>();
  const [mediaStream, setMediaStream] = useState<MediaStream>();
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder>();
  const [recordStartTime, setRecordStartTime] = useState<number>(0);

  const onStartRecord = async () => {
    setRecording(true);
    setEditVideo(undefined);
    const videoData = await screenRecord({
      onStart: (stream, recording) => {
        setMediaStream(stream);
        setMediaRecorder(recording);
        setRecordStartTime(Date.now());
      },
    });
    setVideoList((prev) => [...prev, videoData]);
    setEditVideo(videoData);
    setRecording(false);
    setRecordStartTime(0);
    setMediaStream(undefined);
    setMediaRecorder(undefined);
  };

  const onPauseRecord = () => {
    if (mediaRecorder) mediaRecorder.pause();
  };

  const onResumeRecord = () => {
    if (mediaRecorder) mediaRecorder.resume();
  };

  const onStopRecord = () => {
    if (mediaRecorder) mediaRecorder.stop();
    if (mediaStream) {
      mediaStream.getTracks().forEach((track) => track.stop());
    }
  };

  const onDownload = () => {
    if (!editVideo) return;
    downloadFile(editVideo);
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

  return {
    inRecording,
    videoList,
    editVideo,
    recordStartTime,
    setEditVideo,
    setRecording,
    onStartRecord,
    onStopRecord,
    onPauseRecord,
    onResumeRecord,
    onDownload,
    onMergeAllVideos,
    onCleanList,
    fileToURL,
  };
};

export default useScreenRecord;
