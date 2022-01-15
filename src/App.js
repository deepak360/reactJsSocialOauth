import './App.css';
import LoginHooks from './components/LoginHooks';
import LogoutHooks from './components/LogoutHooks';
import FacebookAuthorize from './components/FacbookAuthorize';
import LinkedIn from './components/Linkedin';
import Google from './components/Google';

function App() {
  return (
    <div className="App">
      <LoginHooks />
      <LogoutHooks />
      <br/>
      <FacebookAuthorize />
      <LinkedIn />
      <Google />
    </div>
  );
}

export default App;
