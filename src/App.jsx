import { Route, Routes } from 'react-router-dom';
import SimonSay from "./simonSay_temp/SimonSay";
import Earthbound from './Earthbound_temp/Earthbound';
import Home from "./Home/Home"
import StonePaperScissor from './StonePaperScissor_temp/Sps';
import Snake from './snake_temp/Snake';
import Traceback from './traceback_temp/Traceback';
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
