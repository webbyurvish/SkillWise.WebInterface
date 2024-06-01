import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Register from "./Components/Register";
import { CookiesProvider } from "react-cookie";
import Mentors from "./Components/Mentors";
import BecomeMentor from "./Components/BecomeMentor";

function App() {
  return (
    <CookiesProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/mentors" element={<Mentors />} />
        <Route path="/bementor" element={<BecomeMentor />} />
      </Routes>
    </CookiesProvider>
  );
}

export default App;
