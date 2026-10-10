import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import Assessment from "./pages/Assessment";
import CareerRoadmap from "./pages/CareerRoadmap";
import Resources from "./pages/Resources";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="app-shell">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<SignIn />} />
              <Route path="/signin" element={<Navigate to="/login" replace />} />
              <Route path="/signup" element={<Navigate to="/login" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Navigate to="/dashboard" replace />} />
              <Route path="/assessment" element={<Assessment />} />
              <Route path="/roadmap" element={<CareerRoadmap />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;