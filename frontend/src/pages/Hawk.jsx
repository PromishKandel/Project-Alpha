import React, { useState } from 'react';
import Webcam from '../components/Webcam';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';

const Hawk = () => {
  const [capturedImage, setCapturedImage] = useState(null);

  const handleCapture = (imageUrl) => {
    setCapturedImage(imageUrl);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1 container mx-auto mt-8 p-4">
        <Sidebar position="left" />
        <div className="w-1/2 px-4">
          <Webcam onCapture={handleCapture} />
        </div>
        <Sidebar position="right" capturedImage={capturedImage} />
      </div>
      <Footer />
    </div>
  );
};

export default Hawk;
