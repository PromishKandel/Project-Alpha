import React, { useRef, useEffect, useState } from 'react';
import * as faceapi from 'face-api.js';
import axios from 'axios';

const MODEL_URL = '/models';

const WecamFeed = ({ onCapture }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [errorLoadingModels, setErrorLoadingModels] = useState(false);
  const [videoDimensions, setVideoDimensions] = useState({ width: 0, height: 0 });
  const [faceData, setFaceData] = useState([]);

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
    const fetchFaceData = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/getFaceData');
        if (Array.isArray(response.data)) {
          setFaceData(response.data);
        } else {
          console.error('Fetched face data is not an array:', response.data);
        }
      } catch (error) {
        console.error('Error fetching face data:', error);
      }
    };

    fetchFaceData();
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

      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext('2d');
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      }
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [isStreaming]);

  const detectFaces = async () => {
    if (isStreaming && videoRef.current && canvasRef.current) {
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
        .withFaceDescriptors()
        .withAgeAndGender();
      const resizedDetections = faceapi.resizeResults(detections, displaySize);
  
      if (Array.isArray(faceData)) {
        const labeledDescriptors = faceData.map(fd => new faceapi.LabeledFaceDescriptors(fd.name, [new Float32Array(fd.faceDescriptor)]));
        const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors, 0.6);
  
        resizedDetections.forEach(detection => {
          const box = detection.detection.box;
          const descriptor = detection.descriptor;
  
          const bestMatch = faceMatcher.findBestMatch(descriptor);
  
          let text = 'Unknown';
          let locationText = '';
          let ageText = `Age: ${Math.round(detection.age)}`;
          if (bestMatch.label !== 'unknown') {
            const matchedFace = faceData.find(fd => fd.name === bestMatch.label);
            text = matchedFace.name;
            locationText = matchedFace.lastLocation;
          }
  
          ctx.strokeStyle = 'red';
          ctx.lineWidth = 2;
          ctx.strokeRect(box.x, box.y, box.width, box.height);
  
          // Draw multiline text
          drawMultilineText(ctx, [text, locationText, ageText], box.x, box.y + box.height + 20);
        });
      } else {
        console.error('faceData is not an array:', faceData);
      }
    }
  };
  
  const drawMultilineText = (ctx, textArray, x, y) => {
    const lineHeight = 20; // Adjust line height as needed
    ctx.fillStyle = 'red';
    ctx.font = '16px Arial';
  
    textArray.forEach((text, index) => {
      ctx.fillText(text, x, y + (index * lineHeight));
    });
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
    // Call the onCapture callback with the captured image URL
    if (onCapture) {
      onCapture(imageUrl);
    }
  };

  const toggleWebcam = () => {
    setIsStreaming(prevStreaming => !prevStreaming);
  };

  if (errorLoadingModels) {
    return <div className='absolute top-[calc(70%_-_273px)] left-[calc(50%_-_370.5px)] text-[30px] leading-[24px] font-semibold font-button-2-regular text-neutral-100 text-center'>Error loading models. Please check console for details.</div>;
  }

  if (!isModelLoaded) {
    return <div className='absolute top-[calc(70%_-_273px)] left-[calc(50%_-_370.5px)] text-[30px] leading-[24px] font-semibold font-button-2-regular text-neutral-100 text-center'>Loading models...</div>;
  }
  return (
    <>
      <div
        className={`absolute top-[calc(50%_-_273px)] left-[calc(50%_-_631px)] w-[741px] h-[727px]`}
      >
        <div className="cursor-pointer [border:none] py-2.5 px-2 bg-white-8 absolute top-[683px] left-[calc(50%_-_263.5px)] rounded-xl w-[252px] flex flex-row items-center justify-center box-border">
          <button
            onClick={toggleWebcam}
            className="relative text-base leading-[24px] font-semibold font-button-2-regular text-neutral-100 text-center"
          >
            {isStreaming ? "Turn Off Webcam" : "Turn On Webcam"}
          </button>
        </div>
        {isStreaming && (
          <button
            onClick={captureImage}
            className="cursor-pointer [border:none] py-2.5 px-2 bg-white-8 absolute top-[683px] left-[calc(50%_+_1.5px)] rounded-xl w-[252px] flex flex-row items-center justify-center box-border"
          >
            <div className="relative text-base leading-[24px] font-semibold font-button-2-regular text-neutral-100 text-center">
              Take Picture
            </div>
          </button>
        )}
        <div className="absolute top-[0px] left-[calc(50%_-_370.5px)] rounded-2xl bg-gray-200 w-[741px] h-[654px] overflow-hidden">
          {isStreaming ? (
            <video
              ref={videoRef}
              autoPlay
              className="w-full h-full object-cover absolute top-0 left-0 z-0"
            />
          ) : (
            <div className="text-gray-500 text-center">
              Webcam is turned off
            </div>
          )}
          <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 z-10"
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      </div>
    </>
  );
};

export default WecamFeed;
