import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Box, Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import './App.css'
import LoginPage from './pages/LoginPage'
import CreateUserPage from './pages/CreateUserPage'
import HomePage from './pages/HomePage'
import TopBar from './component/TopBar'
import AddProductPage from './pages/AddProductPage'
import MyProductsPage from './pages/MyProductsPage'
import MyCartsPage from './pages/MyCartsPage'
import MyOrdersPage from './pages/MyOrdersPage'
import InComingOrdersPage from './pages/InComingOrdersPage'

const theme = createTheme({
  palette: {
    primary: {
      main: '#f97316',
      light: '#fb923c',
      dark: '#ea580c',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ffffff',
      light: '#f8fafc',
      dark: '#f1f5f9',
      contrastText: '#1e293b',
    },
    background: {
      default: '#ffffff',
      paper: '#f8fafc',
    },
    text: {
      primary: '#1e293b',
      secondary: '#64748b',
    },
    error: {
      main: '#ef4444',
    },
    success: {
      main: '#22c55e',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      letterSpacing: '-0.025em',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      letterSpacing: '-0.025em',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      letterSpacing: '-0.025em',
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      letterSpacing: '-0.025em',
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
      letterSpacing: '-0.025em',
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
      letterSpacing: '-0.025em',
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 16px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          },
        },
        contained: {
          '&:hover': {
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
          transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
          backgroundColor: '#ffffff',
        },
      },
    },
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default' }}>
        <TopBar />
        <Container maxWidth="lg" sx={{ flex: 1, py: 4 }}>
          <Routes>
            <Route path='/productAdd' element={<AddProductPage />} />
            <Route path='/' element={<HomePage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/createuser' element={<CreateUserPage />} />
            <Route path='/myproducts' element={<MyProductsPage />} />
            <Route path='/carts' element={<MyCartsPage />} />
            <Route path='/myorders' element={<MyOrdersPage />} />
            <Route path='/incomingorders' element={<InComingOrdersPage />} />
          </Routes>
        </Container>
      </Box>
    </ThemeProvider>
  )
}

export default App
