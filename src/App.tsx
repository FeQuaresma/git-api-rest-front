import { BrowserRouter, Routes, Route } from "react-router-dom";

import './styles/globals.css';
import Home from "./pages/Home";
import User from "./pages/User";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user" element={<User />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
