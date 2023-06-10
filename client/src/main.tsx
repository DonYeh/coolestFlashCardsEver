import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.scss'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Header } from './Header';
import Deck from './Deck';
import Layout from './Layout';
import { createTheme, colors, ThemeProvider } from '@mui/material'
import { Box } from '@mui/material'

const theme = createTheme({
  palette: {
    primary: {
      // main: colors.purple[500],
      main: "#d3d4d8",
    },
    secondary: {
      main: colors.orange[500],
    }
  }
})


const router = createBrowserRouter([
  {
    element: <Layout/>,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/decks/:deckId",
        element: <Deck />,
      },
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Box className="appContainer" sx={{paddingInline: {
        xs: 'max(20vw,2.5rem)', 
        sm: '2.5rem',
        md: '1rem',
        lg: '3rem',
      }}} >
      <RouterProvider router={router} />
      </Box>
    </ThemeProvider>
  </React.StrictMode>,
)
