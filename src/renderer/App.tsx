import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import {
  BottomNavigationAction,
  BottomNavigation,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
} from '@mui/material';
import {
  Forest,
  AccountBalance,
  Warehouse,
  Settings,
} from '@mui/icons-material';
import InventoryManager from './components/InventoryManager';
import TitleBar from './components/TitleBar';
import GrowRoomManager from './components/GrowRoomManager';
import LedgerBook from './components/LedgerBook';
import SettingsComponent from './components/SettingsComponent';
import { globalColor } from './style/GlobalStyle';
import { ISetting } from './utilities/Types';
import './App.css';

const defaultAppSettings: ISetting = {
  dbSelection: 'mongo',
};
const navIconStyle = {
  color: '#e09145',
};
const navIconOverride = {
  '& .MuiBottomNavigationAction-label': {
    color: '#fcd9b8',
  },
};

const Hub = () => {
  const [currentPage, setCurrentPage] = useState(1);
  // need redux
  const [appSettings, setAppSettings] = useState(defaultAppSettings);
  const [drawerWidth] = useState(250);
  const [allComponents] = useState([
    'InventoryManager',
    'GrowRoomManager',
    'LedgerBook',
    'SettingsComponent',
  ]);

  // renders components according to navigation selection
  const renderHub = (): JSX.Element => {
    switch (currentPage) {
      case 0:
        return <InventoryManager />;
      case 1:
        return <GrowRoomManager />;
      case 2:
        return <LedgerBook />;
      case 3:
        return <SettingsComponent />;
      default:
        return <h1>404</h1>;
    }
  };

  const renderIcon = (componentName: string): JSX.Element => {
    switch (componentName) {
      case 'InventoryManager':
        return <Warehouse style={navIconStyle} />;
      case 'GrowRoomManager':
        return <Forest style={navIconStyle} />;
      case 'LedgerBook':
        return <AccountBalance style={navIconStyle} />;
      case 'SettingsComponent':
        return <Settings style={navIconStyle} />;
      default:
        return <Forest style={navIconStyle} />;
        break;
    }
  };

  const handleDrawerClick = (key: number) => {
    setCurrentPage(key);
  };

  const contentBoxStyle = {
    width: '100%',
    height: '100%',
    overflow: 'scroll',
  };

  return (
    <div className="hub">
      <TitleBar />
      <div style={{ display: 'flex' }}>
        <div>
          <Drawer
            variant="permanent"
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              [`& .MuiDrawer-paper`]: {
                width: drawerWidth,
                boxSizing: 'border-box',
                backgroundColor: '#17181d',
                color: globalColor.textColor,
              },
            }}
          >
            <List style={{ paddingTop: '60px' }}>
              {allComponents.map((text, index) => (
                <ListItem
                  key={text}
                  disablePadding
                  style={{ paddingTop: '20px' }}
                >
                  <ListItemButton onClick={() => handleDrawerClick(index)}>
                    <ListItemIcon>{renderIcon(text)}</ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Drawer>
        </div>
        <div style={contentBoxStyle}>{renderHub()}</div>
        {/* <BottomNavigation
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
        <BottomNavigationAction
          disableRipple
          label="Settings"
          icon={<Settings style={navIconStyle} />}
          sx={navIconOverride}
        />
      </BottomNavigation> */}
      </div>
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
