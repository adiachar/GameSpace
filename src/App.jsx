import { Route, Routes } from 'react-router-dom';
import './App.css';

import SimonSay from "./SimonSayGame/SimonSay";
import Earthbound from './EarthboundGame/Earthbound';
import Home from './Home/Home';
import StonePaperScissor from './StonePaperScissor/Sps';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path="/simonSay" element={<SimonSay/>} />
        <Route path="/earthbound" element={<Earthbound/>} />
        <Route path="/stonePaperScissor" element={<StonePaperScissor/>} />
      </Routes>
    </div>
  );
}

export default App;
