import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home/Home";
import Explore from "../pages/Explore/Explore";
import PropertyDetails from "../pages/PropertyDetails/PropertyDetails";


function AppRoutes() {
  return (
    <Routes>

      {/* MAIN WEBSITE LAYOUT */}
      <Route element={<MainLayout />}>

        {/* HOME */}
        <Route
          path="/"
          element={<Home />}
        />

        {/* EXPLORE */}
        <Route
          path="/explore"
          element={<Explore />}
        />

        {/* PROPERTY DETAILS */}
        <Route
          path="/property/:id"
          element={<PropertyDetails />}
        />

      </Route>

    </Routes>
  );
}

export default AppRoutes;