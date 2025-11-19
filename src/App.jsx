import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Book from "./pages/Book";
import Contact from "./pages/Contact";
import Auth from "./pages/Auth";
import PNF from "./pages/PNF";
import Loader from "./components/Loader";
import { useState } from "react";

function App() {
  const [showHome, setShowHome] = useState(false);

  setTimeout(() => {
    setShowHome(true);
  }, 3000);

  return (
    <>
      <Routes>
        <Route path="/" element={showHome ? <Home /> : <Loader />} />
        <Route path="/books" element={<Book />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Auth />} />
        <Route path="/*" element={<PNF />} />
      </Routes>
    </>
  );
}

export default App;
