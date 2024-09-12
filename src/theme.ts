import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FF6347',
    },
    secondary: {
      main: '#628B48',
    },
    error: {
      main: '#7D5BA6',
    },
    background: {
      default: '#FFE1C6',
    },
    success: {
      main: '#628B48',
    },
    warning: {
      main: '#C3BEF7',
    },
    info: {
      main: '#7D5BA6',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

export default theme;