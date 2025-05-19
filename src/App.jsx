import { Route, Routes } from 'react-router-dom';
import './App.css';

import SimonSay from "./simonSay/SimonSay";
import Earthbound from './earthbound/Earthbound';
import Home from './home/Home.jsx';
import StonePaperScissor from './stonePaperScissor/Sps';
import Snake from './snake/Snake';
import Traceback from './traceback/Traceback';

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
