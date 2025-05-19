import { Route, Routes } from 'react-router-dom';
import SimonSay from "./SimonSay/SimonSay";
import Earthbound from './Earthbound/Earthbound';
import Home from "./Home/Home"
import StonePaperScissor from './StonePaperScissor/Sps';
import Snake from './Snake/Snake';
import Traceback from './Traceback/Traceback';
import './App.css';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path="/simon-say" element={<SimonSay/>} />
        <Route path="/earthbound" element={<Earthbound/>} />
        <Route path="/stone-paper-scissor" element={<StonePaperScissor/>} />
        <Route path="/snake" element={<Snake/>} />
        <Route path="/traceback" element={<Traceback/>} />
      </Routes>
    </div>
  );
}

export default App;
