import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ZenForm from "./components/users/ZenForm";
import Success from "./components/users/Success";
import Status from "./components/users/Status";
import Dashboard from "./components/admin/Dashboard";
import Issues from "./components/admin/Issues";
import Login from "./components/users/Login";
import Signup from "./components/users/SignUp";
import Home from "./components/users/Home"
export const CommonContext = React.createContext();
const apiurl = "http://localhost:8000";

function App() {
  return (
    <>
      <BrowserRouter>
        <CommonContext.Provider value={{ apiurl }}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/new-complaint" element={<ZenForm />} />
            <Route path="/user-dashboard" element={<Home />} />
            <Route path="/success/:id" element={<Success />} />
            <Route path="/track-issue" element={<Status />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/issue/:id" element={<Issues />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </CommonContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
