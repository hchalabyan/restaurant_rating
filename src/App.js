import React from "react";
import { Route, Routes, Navigate, Link } from "react-router-dom";
import RatingPage from "./pages/RatingPage/RatingPage";
import AllRestaurants from "./pages/AllRestaurants/AllRestaurants";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate replace to="/restaurant" />} />
        <Route path="/restaurant" element={<AllRestaurants />} />
        <Route path="/restaurant/:id" element={<RatingPage />} />
      </Routes>
    </div>
  );
}

export default App;
