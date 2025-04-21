import React from "react";
import { Header } from "../organisms/header";
import { Outlet } from "react-router";
import { useSelector } from "react-redux";

export const Dashboard = () => {
    const role = useSelector((state) => state.role.role);
    console.log(role,'rol del usuario');
    

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="mx-6 my-3 rounded-lg border flex-1 overflow-auto p-3 bg-slate-100">
        <Outlet />
      </div>
    </div>
  );
};
