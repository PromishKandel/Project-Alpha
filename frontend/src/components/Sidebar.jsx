import React from 'react';

const Sidebar = ({ position, capturedImage }) => {
  return (
    <div className={`w-1/4 ${position === 'left' ? 'pr-4' : 'pl-4'}`}>
      <div className="bg-gray-100 p-4 rounded">
        {position === 'left' && (
          <>
            <h2 className="text-lg font-bold mb-2">Recognized Faces</h2>
            <div className="grid grid-cols-3 gap-2">
              {/* Placeholder images */}
              <img src="https://via.placeholder.com/50" alt="Face 1" className="rounded" />
              <img src="https://via.placeholder.com/50" alt="Face 2" className="rounded" />
              <img src="https://via.placeholder.com/50" alt="Face 3" className="rounded" />
              {/* Add more as needed */}
            </div>
          </>
        )}
        {position === 'right' && capturedImage && (
          <>
            <h2 className="text-lg font-bold mb-2">Captured Image</h2>
            <img src={capturedImage} alt="Captured" className="mb-4 rounded" />
            <div>
              <h3 className="text-md font-semibold">User Information</h3>
              <p><strong>Name:</strong> John Doe</p>
              <p><strong>Email:</strong> john.doe@example.com</p>
              {/* Add more user information as needed */}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
