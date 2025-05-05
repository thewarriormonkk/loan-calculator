import { Routes, Route } from "react-router-dom";

// components
import About from "./components/About";
import ExchangeRates from "./components/ExchangeRates";
import Error from "./components/Error";
import Home from "./components/Home";

function App() {

  return (
    <>
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
