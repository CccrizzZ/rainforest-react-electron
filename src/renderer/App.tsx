import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import {
  BottomNavigationAction,
  BottomNavigation,
  IconButton,
  AppBar,
  Drawer,
} from '@mui/material';
import { Forest, AccountBalance, Warehouse, Air } from '@mui/icons-material';
import InventoryManager from './components/InventoryManager';
import TimeBar from './components/TimeBar';
import GrowRoomManager from './components/GrowRoomManager';
import LedgerBook from './components/LedgerBook';
import './App.css';

const Hub = () => {
  const [currentPage, setCurrentPage] = useState(2);

  // renders components according to navigation selection
  const renderHub = (): JSX.Element => {
    switch (currentPage) {
      case 0:
        return <InventoryManager />;
      case 1:
        return <GrowRoomManager />;
      case 2:
        return <LedgerBook />;
      default:
        return <h1>404</h1>;
    }
  };

  return (
    <div className="hub">
      <TimeBar />
      <div className="overlay">{renderHub()}</div>
      <BottomNavigation
        className="navigation"
        value={currentPage}
        onChange={(event, newValue) => {
          event.preventDefault();
          setCurrentPage(newValue);
        }}
      >
        <BottomNavigationAction label="InventoryManager" icon={<Warehouse />} />
        <BottomNavigationAction label="GrowRoomManager" icon={<Forest />} />
        <BottomNavigationAction label="LedgerBook" icon={<AccountBalance />} />
      </BottomNavigation>
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
