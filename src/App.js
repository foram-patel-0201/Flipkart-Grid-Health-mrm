import logo from "./logo.svg";
import React from "react";
import "./App.css";
import { HealthMrmProvider } from "./context/healthmrmContext";
import Navbar from "./components/Navbar/Navbar";
import SignUp from "./signup";
import UserHomePage from "./userHomePage";
import Login from "./login";
import DocumentList from "./DocumentList";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
} from "react-router-dom";
function App() {
  return (
    <HealthMrmProvider>
      <div className="App">
        <Router>
          <Navbar />
          <div className="content">
            <Routes>
              <Route path="/" exact element={<Login />} />
              <Route path="/signup" exact element={<SignUp />} />
              <Route path="/Home" exact element={<UserHomePage />} />
              <Route
                path="/viewMedicalRecords"
                exact
                element={<DocumentList />}
              />
            </Routes>
          </div>
        </Router>
      </div>
    </HealthMrmProvider>
  );
}

export default App;
