import "./App.css";
import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./components/routing/PrivateRoute";
import Homepage from "./components/screens/Homepage";
import LoginScreen from "./components/screens/LoginScreen";
import RegisterScreen from "./components/screens/RegisterScreen";
import Navbar from "./components/Navbar";
import ReportDate from "./components/screens/ReportDate";
import UserReport from "./components/screens/UserReport";
import NewReport from "./components/screens/NewReport";
import EditReport from "./components/screens/EditReport";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  return (
    <div className="App font-dm-sans">
      <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <div className="pt-20">
        <Routes>
          <Route path="/*" element={<PrivateRoute />}>
            <Route
              index
              element={<Homepage setSelectedDate={setSelectedDate} />}
            />
            <Route
              path="reports/:date"
              element={<ReportDate selectedDate={selectedDate} />}
            />
            <Route
              path="reports/:date/:user"
              element={<UserReport selectedDate={selectedDate} />}
            />
            <Route
              path="reports/:date/:user/new"
              element={<NewReport selectedDate={selectedDate} />}
            />
            <Route
              path="reports/:date/:user/edit"
              element={<EditReport selectedDate={selectedDate} />}
            />
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
