import React, { useRef, useEffect, useState } from 'react';

const Webcam = ({ onCapture }) => {
  const videoRef = useRef(null);
  const [isStreaming, setIsStreaming] = useState(false);

  useEffect(() => {
    let stream = null;

    const startWebcam = async () => {
      try {
        const constraints = { video: true };
        stream = await navigator.mediaDevices.getUserMedia(constraints);
        videoRef.current.srcObject = stream;
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

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      <div className="w-full h-96 border-4 border-red-500 rounded flex items-center justify-center bg-gray-100">
        {isStreaming ? (
          <video ref={videoRef} autoPlay className="w-full h-full object-cover" />
        ) : (
          <div className="text-gray-500 text-center">Webcam is turned off</div>
        )}
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
