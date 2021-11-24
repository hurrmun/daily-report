import "./App.css";
import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./components/routing/PrivateRoute";
import Homepage from "./components/screens/Homepage";
import LoginScreen from "./components/screens/LoginScreen";
import RegisterScreen from "./components/screens/RegisterScreen";
import Navbar from "./components/Navbar";
import ReportDate from "./components/screens/ReportDate";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <div className="App font-dm-sans">
      <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <div className="pt-20">
        <Routes>
          <Route path="/*" element={<PrivateRoute />}>
            <Route index element={<Homepage />} />
            <Route path="reports/:date" element={<ReportDate />} />
          </Route>
          <Route
            path="/login"
            element={<LoginScreen setLoggedIn={setLoggedIn} />}
          />
          <Route
            path="/register"
            element={<RegisterScreen setLoggedIn={setLoggedIn} />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
