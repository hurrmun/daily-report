import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./components/routing/PrivateRoute";
import PrivateScreen from "./components/screens/PrivateScreen";
import LoginScreen from "./components/screens/LoginScreen";
import RegisterScreen from "./components/screens/RegisterScreen";

function App() {
  return (
    <div className="App font-dm-sans">
      <Routes>
        <Route path="/*" element={<PrivateRoute />}>
          <Route index element={<PrivateScreen />} />
        </Route>
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
      </Routes>
    </div>
  );
}

export default App;
