import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Home from './assets/home.png';
import Firstpage from './components/firstpage';
import SecondPage from './components/secondpage';
import Button from '@mui/material/Button';
import ThirdPage from './components/thirdpage';
import Result from './components/result';
import { useState } from 'react';
import Header from "./components/Header/header";
import Trends from './pages/Trends';

function App() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
      <div className="App container-fluid">
        <Header />
        <Routes>
          <Route path="/" element={<Firstpage />} />
          <Route path="/second" element={<SecondPage />} />
          <Route path="/third" element={<ThirdPage />} />
          <Route path="/result" element={<Result />} />
          <Route path="/trends" element={<Trends />} />
        </Routes>
      </div>
  );
}

export default App;
