import React from "react";
import './App.css';
import LoginHooks from './components/LoginHooks';
import LogoutHooks from './components/LogoutHooks';
import Google from './components/Google';
import FacbookAuthorize from './components/FacbookAuthorize';
import Linkedin from './components/Linkedin';


function App() {
  return (
    <div className="App">
      <LoginHooks/>
      <LogoutHooks/>
      <br/>
      <Google/>
      <FacbookAuthorize/>
      <FacbookAuthorize/>
    </div>
  );
}

export default App;
