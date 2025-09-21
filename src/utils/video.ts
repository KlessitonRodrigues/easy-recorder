import { dateFormat } from "./date";

type IScreenRecord = {
  previewId?: string;
  videoBitsPerSecond?: number;
  audioBitsPerSecond?: number;
  onStart: (stream: MediaStream, record: MediaRecorder) => void;
};

export const screenRecord = async (props: IScreenRecord) => {
  return new Promise<File>(async (resolve, reject) => {
    try {
      const {
        previewId = "record_preview",
        videoBitsPerSecond = 2500000,
        audioBitsPerSecond = 128000,
        onStart,
      } = props;

      let stream: MediaStream | null = null;

      stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
      });

      let videoEl = document.getElementById(previewId) as HTMLVideoElement;
      if (videoEl) {
        videoEl.srcObject = stream;
        videoEl.play();
      }

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: "video/webm; codecs=vp9",
        videoBitsPerSecond,
        audioBitsPerSecond,
      });

      const chunks: BlobPart[] = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const name = `screen_record_${dateFormat()}.webm`;
        const blob = new Blob(chunks, { type: "video/webm" });
        const file = new File([blob], name, {
          type: "video/webm",
        });
        resolve(file);
      };

      mediaRecorder.start();

      onStart && onStart(stream, mediaRecorder);
    } catch (err) {
      console.error("Error recording screen:", err);
      reject(err);
    }
  });
};

export const downloadFile = (file: File) => {
  const url = URL.createObjectURL(file);
  const a = document.createElement("a");
  a.href = url;
  a.download = file.name || "recorded-video.webm";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const getVideoThumb = (file: File) => {
  return new Promise<string>((resolve) => {
    const video = document.createElement("video");
    video.src = URL.createObjectURL(file);
    video.currentTime = 1;
    video.onloadeddata = () => {
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imgData = canvas.toDataURL("image/png");
        resolve(imgData);
      } else {
        resolve("");
      }
    };
  });
};

export const mergeVideosWithOverlay = async (
  mainFile: File,
  overlayFile: File,
  overlayOptions: {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
  } = {}
): Promise<File> => {
  return new Promise(async (resolve, reject) => {
    try {
      // Create video elements
      const mainVideo = document.createElement("video");
      const overlayVideo = document.createElement("video");

      mainVideo.src = URL.createObjectURL(mainFile);
      overlayVideo.src = URL.createObjectURL(overlayFile);

      mainVideo.muted = true;
      overlayVideo.muted = true;

      await Promise.all([
        mainVideo.play().catch(() => {}),
        overlayVideo.play().catch(() => {}),
      ]);

      // Create canvas
      const canvas = document.createElement("canvas");
      canvas.width = mainVideo.videoWidth;
      canvas.height = mainVideo.videoHeight;
      const ctx = canvas.getContext("2d")!;

      // Overlay size/position (default bottom-right)
      const ow = overlayOptions.width || mainVideo.videoWidth / 4;
      const oh = overlayOptions.height || mainVideo.videoHeight / 4;
      const ox = overlayOptions.x ?? canvas.width - ow - 20;
      const oy = overlayOptions.y ?? canvas.height - oh - 20;

      // Record canvas
      const stream = canvas.captureStream();
      const recorder = new MediaRecorder(stream, { mimeType: "video/webm" });
      const chunks: Blob[] = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: "video/webm" });
        const file = new File([blob], "merged-video.webm", {
          type: "video/webm",
        });
        resolve(file);
      };

      recorder.start();

      function drawFrame() {
        if (mainVideo.ended && overlayVideo.ended) {
          recorder.stop();
          return;
        }

        ctx.drawImage(mainVideo, 0, 0, canvas.width, canvas.height);

        if (!overlayVideo.ended) {
          ctx.drawImage(overlayVideo, ox, oy, ow, oh);
        }

        requestAnimationFrame(drawFrame);
      }

      drawFrame();
    } catch (err) {
      reject(err);
    }
  });
};

export const mergeVideos = async (files: File[]): Promise<File> => {
  return new Promise(async (resolve, reject) => {
    try {
      if (files.length === 0) {
        throw new Error("No video files provided");
      }

      // Create video elements for each file
      const videos = files.map((file) => {
        const video = document.createElement("video");
        video.src = URL.createObjectURL(file);
        video.muted = true;
        return video;
      });

      // Wait for metadata to load for all videos
      await Promise.all(
        videos.map(
          (video) =>
            new Promise<void>((res) => {
              video.onloadedmetadata = () => res();
              video.load();
            })
        )
      );

      // Use the dimensions of the first video
      const width = videos[0].videoWidth;
      const height = videos[0].videoHeight;

      // Create canvas
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d")!;

      // Record canvas
      const stream = canvas.captureStream();
      const recorder = new MediaRecorder(stream, { mimeType: "video/webm" });
      const chunks: Blob[] = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: "video/webm" });
        const file = new File([blob], "merged-video.webm", {
          type: "video/webm",
        });
        resolve(file);
      };

      recorder.start();

      let current = 0;

      function playNextVideo() {
        if (current >= videos.length) {
          recorder.stop();
          return;
        }

        const video = videos[current];
        video.currentTime = 0;
        video.play();

        function drawFrame() {
          if (video.ended) {
            video.pause();
            current++;
            playNextVideo();
            return;
          }
          ctx.drawImage(video, 0, 0, width, height);
          requestAnimationFrame(drawFrame);
        }

        drawFrame();
      }

      playNextVideo();
    } catch (err) {
      reject(err);
    }
  });
};
