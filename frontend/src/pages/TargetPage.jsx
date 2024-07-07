import React, { useState } from 'react';
import Header from "../components/Header";
import WecamFeed from "../components/WecamFeed";
import PhotoFeed from "../components/PhotoFeed";
import AllTargetSection from "../components/AllTargetSection";

const TargetPage = () => {
  const [capturedImage, setCapturedImage] = useState(null);

  const handleCapture = (imageUrl) => {
    setCapturedImage(imageUrl);
  };

  return (
    <div className="w-full relative shadow-[555px_868px_288px_rgba(0,_0,_0,_0),_355px_556px_264px_rgba(0,_0,_0,_0.01),_200px_312px_223px_rgba(0,_0,_0,_0.05),_89px_139px_165px_rgba(0,_0,_0,_0.09),_22px_35px_91px_rgba(0,_0,_0,_0.1)] [background:radial-gradient(50%_50%_at_50%_50%,_#4b4d4f,_#151516)] h-screen overflow-hidden text-left text-[48px] text-neutral-100 font-button-2-regular">
      <Header />
      <WecamFeed onCapture={handleCapture} />
      <PhotoFeed capturedImage={capturedImage}/>
      <AllTargetSection />
      <div className="absolute top-[calc(50%_-_367px)] left-[calc(50%_-_253px)] font-semibold inline-block w-[505px]">{`Welcome Agent Name `}</div>
    </div>
  );
};

export default TargetPage;
