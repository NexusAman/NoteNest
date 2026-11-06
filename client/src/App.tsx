import { Routes, Route } from "react-router";
import LandingPage from "@/features/landing/pages/LandingPage";
import Signup from "./features/auth/pages/Signup";
import Login from "./features/auth/pages/Login";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default App;