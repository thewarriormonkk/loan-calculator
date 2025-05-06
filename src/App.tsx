import { Routes, Route } from "react-router-dom";

// components
import About from "./components/About";
import Error from "./components/Error";
import ExchangeRates from "./components/ExchangeRates";
import Home from "./components/Home";
import Navbar from "./components/Navbar";

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/exchange_rates_live" element={<ExchangeRates />} />
        <Route path="/error_page" element={<Error />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  )
}

export default App
