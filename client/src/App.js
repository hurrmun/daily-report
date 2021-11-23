import "./App.css";
import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./components/routing/PrivateRoute";
import PrivateScreen from "./components/screens/PrivateScreen";
import LoginScreen from "./components/screens/LoginScreen";
import RegisterScreen from "./components/screens/RegisterScreen";
import Navbar from "./components/Navbar";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <div className="App font-dm-sans">
      <Navbar loggedIn={loggedIn} />
      <div className="pt-20">
        <Routes>
          <Route path="/*" element={<PrivateRoute />}>
            <Route index element={<PrivateScreen />} />
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
