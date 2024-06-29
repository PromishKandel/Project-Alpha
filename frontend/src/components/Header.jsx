import React from 'react';

const Header = () => {
  return (
    <header className="bg-blue-500 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Face Recognition Application</h1>
      <div className="flex space-x-4">
        <button className="bg-gray-700 px-4 py-2 rounded">Option 1</button>
        <button className="bg-gray-700 px-4 py-2 rounded">Option 2</button>
      </div>
    </header>
  );
};

export default Header;
