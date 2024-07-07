import React from 'react';
const PhotoFeed = ({capturedImage}) => {
  return (
    <div className="absolute top-[calc(50%_-_273px)] left-[calc(50%_+_149px)] rounded-2xl bg-gray-200 w-[300px] h-[315px] overflow-hidden">
      {capturedImage && (
        <>
          <img src={capturedImage} className="w-[300px]" />
          <div className="text-[15px] font-semibold">
            <h3>User Information</h3>
            <p>
              <strong>Name:</strong> John Doe
            </p>
            <p>
              <strong>Email:</strong> john.doe@example.com
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default PhotoFeed;
