import { useState,useEffect } from "react";
import { Label } from "../atoms/label";


import { LoginForm } from "../molecules/login/loginForm";
import { RegisterForm } from "../molecules/login/registerForm";
import { Input } from "../atoms/input";
import { Button } from "../atoms/button";
import { shipmentsGetByOrden } from "../../services/shipments.services";

export const Login = () => {
  const [action, setAction] = useState(false);
  const [search, setSearch] = useState("");
  const [data, setData] = useState(undefined);

  const onsubmit = () => {
    shipmentsGetByOrden(search).then((resp) => {
      setData(resp.shipments[0]);
      setSearch("");
    });
  };
  useEffect(() => {

  
  
  return () => {
      console.log("cerrar");
      setData(undefined)
    }
  }, [])
  

  return (
    <div className="bg-slate-50 h-screen ">
      <div className="border flex content-center h-screen ">
        <div className="  w-full col-span-2 flex  items-center justify-center flex-col ">
          <div className="">
            <Label classes={"uppercase"}>consulta el estado de tu envió</Label>
          </div>
          <div className=" flex mt-3">
            <div className="w-1/2 mr-2">
              <Input
                placeholder={"Número de guía"}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="w-1/2 ml-2">
              <Button text={"Consulta"} onClick={onsubmit} />
            </div>
          </div>
          {data == undefined ? (
            <div className="flex items-center mt-2">
              <div className="mr-2">
              <Label>No se encontró registro con ese numero de guía</Label>
              </div>
            </div>
          ) : (
            <div className="flex items-center mt-2">
              <div className="mr-2">
                <Label>su envio esta : {data?.status_actual}</Label>
              </div>
              <div>
                {data?.status_actual == "En tránsito" ? (
                  <img
                    src="https://cdnl.iconscout.com/lottie/premium/thumb/camion-10940930-8853224.gif"
                    alt=""
                    className="w-28"
                  />
                ) : (
                  <img
                    src="https://elmercantil.com/wp-content/uploads/2021/03/AR-Racking-Caprabo.gif"
                    alt=""
                    className="w-28"
                  />
                )}
              </div>
            </div>
          )}
        </div>

        <div className=" w-[40%] col-span-1 flex  justify-center items-center">
          <div className="grid grid-cols-2 border border-2 border-slate-300 bg-slate-50 rounded-t-lg rounded-b-lg border border-3  h-[70%] ">
            <div
              className={`border border-slate-400 p-2 text-center rounded-tl-lg h-14 ${
                !action && "bg-secondary opacity-85 "
              }`}
              onClick={() => setAction(false)}
            >
              <Label classes={`uppercase ${!action && "text-white"}`}>
                Inicio session
              </Label>{" "}
            </div>
            <div
              className={`border border-slate-400 p-2 text-center rounded-tr-lg h-14 ${
                action && "bg-secondary opacity-85 "
              }`}
              onClick={() => setAction(true)}
            >
              <Label classes={`uppercase ${action && "text-white"}`}>
                regístrate
              </Label>
            </div>
            <div className="col-span-2">
              {!action ? <LoginForm /> : <RegisterForm />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
