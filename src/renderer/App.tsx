import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import Button from '@mui/material/Button';
import icon from '../../assets/icon.svg';
import './App.css';

const Hub = () => {
  return (
    <div>
      <div className="Hello">
        <img width="200" alt="icon" src={icon} />
      </div>
      <Button>Close</Button>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hub />} />
      </Routes>
    </Router>
  );
}
