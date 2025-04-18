import React from "react";
import {  Routes, Route } from "react-router";
import { Dashboard } from "../components/pages/dashboard";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard/>} />
      <Route path="/profile" element={<>perfil</>} />
    </Routes>
  );
};
