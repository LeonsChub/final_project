import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Navbar from "./componenets/Navbar";
import LoginPage from "./componenets/pages/LoginPage";
import UserPage from "./componenets/pages/UserPage";
function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<UserPage />} />
        <Route path="login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;
