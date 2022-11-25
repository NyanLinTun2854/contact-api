import React from "react";
import { Route, Routes } from "react-router-dom";
import Create from "./Create";
import Dashboard from "./Dashboard";
import Edit from "./Edit";
import Guard from "./Guard";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";

const App = () => {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <Guard>
              <Dashboard />
            </Guard>
          }
        />
        <Route
          path="/create"
          element={
            <Guard>
              <Create />
            </Guard>
          }
        />
        <Route path="/edit/:id" element={<Edit />} />
      </Routes>
    </div>
  );
};

export default App;
