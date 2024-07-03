import React, { useState } from 'react';
import axios from 'axios';
import * as faceapi from 'face-api.js';

const UploadTargetPage = () => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6">Upload Target</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">
              Last Known Location
            </label>
            <input
              id="location"
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="file">
              Upload Picture
            </label>
            <input
              id="file"
              type="file"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={handleFileChange}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadTargetPage;
