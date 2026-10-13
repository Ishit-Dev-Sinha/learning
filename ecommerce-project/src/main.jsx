import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import App from './App.jsx'

const theme = createTheme({
      palette: {
       primary: {
         main: '#198754',      // The main green used in buttons & links
         dark: '#084f2d',      // The dark green used in the header
       },
       secondary: {
         main: '#baffbe',      // Accent light green for search button
       },
       background: {
         default: '#ffffff',
       },
     },
     typography: {
       fontFamily: 'Roboto, Arial, sans-serif',
     },
   });

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
