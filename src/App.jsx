import { Route, Routes } from 'react-router-dom';
import './App.css';

import SimonSay from "./SimonSayGame/SimonSay";
import Earthbound from './EarthboundGame/Earthbound';
import Home from './Home/Home';
import StonePaperScissor from './StonePaperScissor/Sps';
import Snake from './SnakeGame/Snake';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path="/simon-say" element={<SimonSay/>} />
        <Route path="/earthbound" element={<Earthbound/>} />
        <Route path="/stone-paper-scissor" element={<StonePaperScissor/>} />
        <Route path="/snake" element={<Snake/>} />
      </Routes>
    </div>
  );
}

export default App;
