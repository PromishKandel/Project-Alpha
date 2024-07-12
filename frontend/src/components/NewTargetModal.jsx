import React, { useState } from 'react';
import axios from 'axios';
import * as faceapi from 'face-api.js';

const NewTargetModal = () => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(''); // State to hold the file name

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setFileName(selectedFile.name); // Set the file name
  };

  const MODEL_URL = '/models';

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    console.log('Submitting form with:', { name, location, file });
  
    if (!file) {
      alert('Please upload a file');
      return;
    }
  
    const reader = new FileReader();
    reader.onloadend = async () => {
      const imageData = reader.result;
  
      try {
        console.log('Loading models...');
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
          faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
          faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
          faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
          faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
        ]);
        console.log('Face detection and landmark models loaded.');
  
        console.log('Fetching image...');
        const img = await faceapi.fetchImage(imageData);
        console.log('Image loaded successfully:', img);
  
        console.log('Detecting faces...');
        const detections = await faceapi.detectAllFaces(img).withFaceLandmarks().withFaceDescriptors();
        console.log('Face detected:', detections);
  
        // Extract face descriptors
        const faceDescriptors = detections.map(detection => detection.descriptor);
  
        console.log('Sending data to backend...');
        const response = await axios.post('http://localhost:5001/api/addFaceData', {
          name,
          imageData,
          lastLocation: location,
          faceDescriptor: faceDescriptors.length > 0 ? Array.from(faceDescriptors[0]) : null
        });
  
        if (response.status === 201) {
          alert('Face data uploaded successfully');
        } else {
          alert('Failed to upload face data');
        }
      } catch (error) {
        console.error('There was an error:', error);
        alert('Failed to upload face data');
      }
    };
  
    reader.readAsDataURL(file);
  };

  return (
    <div
      className={`absolute top-[calc(50%_-_207px)] left-[calc(50%_-_205px)] [backdrop-filter:blur(17.79px)] rounded-[28.46px] bg-gray-300 box-border h-[459px] overflow-hidden flex flex-col items-center justify-start py-10 px-20 gap-[40px] text-left text-5xl text-neutral-100 font-button-2-regular border-[2.1px] border-solid border-steelblue`}
    >
      <div className="relative font-abeezee">{`New Target `}</div>
      <form
        className="w-[250px] flex flex-col items-start justify-start text-smi"
        onSubmit={handleSubmit}
      >
        <div className="w-[251px] relative h-[195px]">
          <div className="absolute top-[161px] left-[0px] flex flex-col items-start justify-start text-center text-base">
            <label
              htmlFor="file"
              className="relative leading-[24px] font-semibold cursor-pointer"
            >
              <div className="w-[251px] rounded-xl bg-darkslategray h-[34px] flex flex-row items-center justify-center py-2.5 px-2 box-border gap-[8px]">
                Upload Picture
                <input
                  id="file"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>
            </label>
            <div className='text-center w-[251px]'>{fileName}</div>
          </div>
          <div className="absolute top-[0px] left-[1px] flex flex-col items-start justify-start gap-[8px]">
            <div className="relative font-semibold">Target Name</div>
            <input
              className="[outline:none] flex font-abeezee text-smi bg-neutral-100 w-[250px] rounded-8xs box-border h-8 overflow-hidden shrink-0 flex-row items-center justify-start p-4 text-black border-[0.7px] border-solid border-silver"
              placeholder="Full Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="absolute top-[72px] left-[1px] flex flex-col items-start justify-start gap-[8px]">
            <div className="relative font-semibold">Last Location</div>
            <input
              className="[outline:none] flex font-abeezee text-smi bg-neutral-100 w-[250px] rounded-8xs box-border h-8 overflow-hidden shrink-0 flex-col items-start justify-center p-4 text-black border-[0.7px] border-solid border-silver"
              placeholder="Location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
        </div>
        <button
          type="submit"
          className="self-stretch rounded-xl bg-primary-500 flex flex-row items-center justify-center py-2.5 px-2 gap-[8px] text-center text-base mt-10"
        >
          <div className="relative leading-[24px] font-semibold">Submit</div>
        </button>
      </form>
    </div>
  );
};

export default NewTargetModal;
