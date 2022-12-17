import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import {
  BottomNavigationAction,
  BottomNavigation,
  IconButton,
} from '@mui/material';
import { Forest, AccountBalance, Warehouse } from '@mui/icons-material';
import InventoryManager from './components/InventoryManager';
import TimeBar from './components/TimeBar';
import GrowRoomManager from './components/GrowRoomManager';
import LedgerBook from './components/LedgerBook';
import './App.css';

const Hub = () => {
  const [currentPage, setCurrentPage] = useState(1);

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

  const navIconStyle = {
    color: '#e09145',
  };
  const navIconOverride = {
    '& .MuiBottomNavigationAction-label': {
      color: '#fcd9b8',
    },
  };

  return (
    <div className="hub">
      <TimeBar />
      <div className="overlay">{renderHub()}</div>
      <BottomNavigation
        className="navigation"
        style={{ backgroundColor: '#17181d' }}
        value={currentPage}
        onChange={(event, newValue) => {
          event.preventDefault();
          setCurrentPage(newValue);
        }}
      >
        <BottomNavigationAction
          disableRipple
          label="InventoryManager"
          icon={<Warehouse style={navIconStyle} />}
          sx={navIconOverride}
        />
        <BottomNavigationAction
          disableRipple
          label="GrowRoomManager"
          icon={<Forest style={navIconStyle} />}
          sx={navIconOverride}
        />
        <BottomNavigationAction
          disableRipple
          label="LedgerBook"
          icon={<AccountBalance style={navIconStyle} />}
          sx={navIconOverride}
        />
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
