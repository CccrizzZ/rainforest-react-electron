import { TextField } from '@mui/material';

// this module connect and authenticate user to the server
const UserAuthModule = (): JSX.Element => {
  const UserAuthModuleStyle = {
    width: '100vw',
    height: '100vh',
    backgroundColor: '#fff',
    opacity: '0.6',
  };

  return (
    <div style={UserAuthModuleStyle}>
      <h1>Authentication</h1>
    </div>
  );
};
