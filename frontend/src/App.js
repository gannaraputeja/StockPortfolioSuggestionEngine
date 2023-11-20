import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import InvestmentPage from './pages/InvestmentPage/InvestmentPage';
import StrategiesPage from './pages/StrategiesPage/StrategiesPage';
import ConfirmationPage from './pages/ConfirmationPage/ConfirmationPage';
import ResultsPage from './pages/ResultsPage/ResultsPage';
import Header from "./components/Header/header";
import Trends from './pages/Trends';

function App() {

  return (
      <div className="App container-fluid">
        <Header />
        <Routes>
          <Route path="/" element={<InvestmentPage />} />
          <Route path="/strategies" element={<StrategiesPage />} />
          <Route path="/confirm" element={<ConfirmationPage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/trends" element={<Trends />} />
        </Routes>
      </div>
  );
}

export default App;
