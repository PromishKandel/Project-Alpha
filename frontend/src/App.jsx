import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UploadTarget from './pages/UploadTarget'; // Ensure this path is correct
import TargetPage from './pages/TargetPage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path='/target-page' element={<TargetPage/>}/>
          <Route path="/upload-target" element={<UploadTarget />} />
        </Routes>
      </div>
    </Router>
    // <UploadTarget/>
    // <TargetPage/>
  //   <LoginPage/>
  );
}

export default App;
