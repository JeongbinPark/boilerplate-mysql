import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import LandingPage from './components/view/LandingPage/LandingPage';
import LoginPage from './components/view/LoginPage/LoginPage';
import RegisterPage from './components/view/RegisterPage/RegisterPage';
import LostPage from './components/view/LostPage/LostPage';
import Auth from './hoc/auth';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={Auth(LandingPage, null)} />
          <Route path="/login" element={Auth(LoginPage, false)}/>
          <Route path="/register" element={Auth(RegisterPage, false)} />
          <Route path="*" element={Auth(LostPage, null)} />
        </Routes>
      </div>
    </Router>

  );
}

export default App;
