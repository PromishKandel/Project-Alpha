import React, { useRef, useEffect, useState } from 'react';
import * as faceapi from 'face-api.js';

const MODEL_URL = '/models';

const Webcam = ({ onCapture }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [errorLoadingModels, setErrorLoadingModels] = useState(false);
  const [videoDimensions, setVideoDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const loadModels = async () => {
      try {
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
          faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
          faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
          faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
          faceapi.nets.ageGenderNet.loadFromUri(MODEL_URL),
        ]);
        setIsModelLoaded(true);
      } catch (error) {
        console.error('Error loading models:', error);
        setErrorLoadingModels(true);
      }
    };

    loadModels();
  }, []);

  useEffect(() => {
    let stream = null;

    const startWebcam = async () => {
      try {
        const constraints = { video: true };
        stream = await navigator.mediaDevices.getUserMedia(constraints);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setIsStreaming(true);
      } catch (err) {
        console.error('Error accessing webcam:', err);
        setIsStreaming(false);
      }
    };

    if (isStreaming) {
      startWebcam();
    } else {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach(track => track.stop());
        videoRef.current.srcObject = null;
      }
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [isStreaming]);

  const detectFaces = async () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;

      if (video.videoWidth === 0 || video.videoHeight === 0) {
        console.warn('Video dimensions are zero, waiting for valid dimensions...');
        return;
      }

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const displaySize = { width: video.videoWidth, height: video.videoHeight };
      faceapi.matchDimensions(canvas, displaySize);

      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withAgeAndGender();
      const resizedDetections = faceapi.resizeResults(detections, displaySize);

      ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      resizedDetections.forEach(detection => {
        const box = detection.detection.box;
        const gender = detection.gender;
        const text = `${gender} (${Math.round(detection.age)})`;

        ctx.strokeStyle = 'red';
        ctx.lineWidth = 2;
        ctx.strokeRect(box.x, box.y, box.width, box.height);

        ctx.fillStyle = 'red';
        ctx.font = '16px Arial';
        ctx.fillText(text, box.x, box.y + box.height + 20);
      });
    }
  };

  useEffect(() => {
    const updateVideoDimensions = () => {
      if (videoRef.current) {
        setVideoDimensions({
          width: videoRef.current.videoWidth,
          height: videoRef.current.videoHeight,
        });
      }
    };

    window.addEventListener('resize', updateVideoDimensions);
    updateVideoDimensions();

    return () => {
      window.removeEventListener('resize', updateVideoDimensions);
    };
  }, []);

  useEffect(() => {
    if (isStreaming && isModelLoaded) {
      const interval = setInterval(detectFaces, 1000);
      return () => clearInterval(interval);
    }
  }, [isStreaming, isModelLoaded]);

  const captureImage = () => {
    if (!videoRef.current) return;

    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;

    const ctx = canvas.getContext('2d');
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    const imageUrl = canvas.toDataURL('image/png');
    onCapture(imageUrl);
  };

  const toggleWebcam = () => {
    setIsStreaming(prevStreaming => !prevStreaming);
  };

  if (errorLoadingModels) {
    return <div>Error loading models. Please check console for details.</div>;
  }

  if (!isModelLoaded) {
    return <div>Loading models...</div>;
  }

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      <div className="w-full h-96 border-4 border-red-500 rounded flex items-center justify-center bg-gray-100 relative">
        {isStreaming ? (
          <video ref={videoRef} autoPlay className="w-full h-full object-cover absolute top-0 left-0 z-0" />
        ) : (
          <div className="text-gray-500 text-center">Webcam is turned off</div>
        )}
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 z-10"
          style={{ width: '100%', height: '100%' }}
        />
      </div>
      <div className="absolute bottom-4 flex space-x-4">
        <button onClick={toggleWebcam} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
          {isStreaming ? 'Turn Off Webcam' : 'Turn On Webcam'}
        </button>
        {isStreaming && (
          <button onClick={captureImage} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
            Capture Image
          </button>
        )}
      </div>
    </div>
  );
};

export default Webcam;
