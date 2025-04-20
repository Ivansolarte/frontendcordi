import React from "react";
import { Routes, Route } from "react-router";
import { Dashboard } from "../components/pages/dashboard";
import { Shipments } from "../components/templates/shipments";
import { AssignTransportation } from "../components/molecules/shipments/assignTransportation";
import { ShippingHistory } from "../components/molecules/history/shippingHistory";
import Graphics from "../components/molecules/history/graphics";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />}>
        <Route path="shipments" element={<Shipments />} />
        <Route path="carriers" element={<AssignTransportation/>} />
        <Route path="followUp" element={<ShippingHistory/>} />
        <Route path="packages" element={<>packages</>} />
        {/* Redirección por defecto */}
        <Route index element={<Graphics/>} />
      </Route>

      <Route path="/profile" element={<>perfil</>} />
    </Routes>
  );
};
