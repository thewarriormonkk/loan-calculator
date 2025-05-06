import { Routes, Route } from "react-router-dom";
import { Box, useTheme } from "@mui/material";
// components
import About from "./components/About";
import Error from "./components/Error";
import ExchangeRates from "./components/ExchangeRates";
import Home from "./components/Home";
import Navbar from "./components/Navbar";

function App() {
  const theme = useTheme();
  
  return (
    <Box 
      sx={{ 
        minHeight: '100vh',
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        transition: 'background-color 0.3s, color 0.3s'
      }}
    >
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/exchange_rates_live" element={<ExchangeRates apiUrl={""} token={""} />} />
        <Route path="/error_page" element={<Error />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Box>
  )
}

export default App;