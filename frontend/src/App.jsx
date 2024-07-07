import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UploadTarget from './pages/UploadTarget'; // Ensure this path is correct
import TargetPage from './pages/TargetPage';

function App() {
  return (
    // <Router>
    //   <div className="App">
    //     <Header />
    //     <Routes>
    //       <Route path="/" element={<Hawk />} />
    //       <Route path="/upload-target" element={<UploadTarget />} />
    //     </Routes>
    //   </div>
    // </Router>
    // <UploadTarget/>
    <TargetPage/>
  );
}

export default App;
