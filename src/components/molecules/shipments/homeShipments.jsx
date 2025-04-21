import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { Table } from "../../organisms/table";
import {
  shipmentsGet,
  shipmentsGetById,
} from "../../../services/shipments.services";
import { routesGet } from "../../../services/routes.services";
import { AddShipmentsForm } from "./addShipments";
import { useSelector } from "react-redux";
import { ChangeRoute } from "./changeRoute";
import { AssignTransportation } from "./assignTransportation";

export const HomeShipments = () => {
  const navigate = useNavigate();
  const role = useSelector((state) => state.role.role); ///el rolo de login
  const user = JSON.parse(sessionStorage.getItem("loggedUser"));
  const [arrayData, setArrayData] = useState([]);
  const [arrayRoutes, setArrayRoutes] = useState([]);
  const [dataRow, setDataRow] = useState({});
  const [addShipment, setAddShipment] = useState(false);
  const [openRoute, setOpenRoute] = useState(false);
  const title = [
    "Numero orden",
    "ruta",
    "nombre",
    "telefono",
    "estado",
    role != "usuario" && "accion",
  ];
  const editRoute = (payload) => {
    setDataRow(payload);
    setOpenRoute(true);
    console.log(payload);
  };
  const assign = (payload) => {
    navigate("/dashboard/carriers", { state: payload });

    console.log(payload);
  };

  const getInfoAdmin = () => {
    console.log("admin");
    shipmentsGet().then((resp) => {
      const shipmentsValues = resp.shipments.map((shipment) => {
        return [
          shipment.order_number?.substring(0, 15) || "", // Previene error si es undefined  sr-only
          getRouteNameById(shipment.route_id),
          shipment.sender_name,
          shipment.sender_phone,
          <div className="flex gap-2" key={shipment.shipment_id}>
            <button
              disabled={
                role == "usuario" || shipment.status_actual == "Entregado"
              }
              onClick={() => assign(shipment)}
              className={`hover:underline
                ${shipment.status_actual == "En espera" && "text-red-500 "}
                ${shipment.status_actual == "En tránsito" && "text-yellow-400 "}
                ${
                  shipment.status_actual == "Entregado" && "text-green-600 "
                }              
                
              `}
            >
              {shipment.status_actual}
            </button>
          </div>,

          <div className="flex gap-2" key={shipment.shipment_id}>
            <button
              onClick={() => editRoute(shipment)}
              className={`text-yellow-500 hover:underline ${
                role == "usuario" && "sr-only"
              }`}
            >
              Editar ruta
            </button>
            <button
              className={`text-red-600 hover:underline ${
                role == "usuario" && "sr-only"
              }`}
            >
              Eliminar
            </button>
          </div>,
        ];
      });
      setArrayData(shipmentsValues);
    });
  };

  const getInfoUser = () => {
    shipmentsGetById(user.id).then((resp) => {
      console.log(resp.shipments);
      
      const shipmentsValues = resp.shipments.map((shipment) => {
        return [
          shipment.order_number?.substring(0, 15) || "", // Previene error si es undefined  sr-only
          getRouteNameById(shipment.route_id),
          shipment.sender_name,
          shipment.sender_phone,
          <div className="flex gap-2" key={shipment.shipment_id}>
            <button
              disabled={
                role == "usuario" || shipment.status_actual == "Entregado"
              }
              onClick={() => assign(shipment)}
              className={`hover:underline
                ${shipment.status_actual == "En espera" && "text-red-500 "}
                ${shipment.status_actual == "En tránsito" && "text-yellow-400 "}
                ${
                  shipment.status_actual == "Entregado" && "text-green-600 "
                }              
                
              `}
            >
              {shipment.status_actual}
            </button>
          </div>,

          <div className="flex gap-2" key={shipment.shipment_id}>
            <button
              onClick={() => editRoute(shipment)}
              className={`text-yellow-500 hover:underline ${
                role == "usuario" && "sr-only"
              }`}
            >
              Editar ruta
            </button>
            <button
              className={`text-red-600 hover:underline ${
                role == "usuario" && "sr-only"
              }`}
            >
              Eliminar
            </button>
          </div>,
        ];
      });
      setArrayData(shipmentsValues);
    });
  };

  const getInfo = () => {
    if (role == "administrador") {
      getInfoAdmin();
    } else {
      getInfoUser();
    }
  };

  const getRoutesCity = () => {
    routesGet().then((resp) => {
      setArrayRoutes(resp.routes);
    });
  };

  const getRouteNameById = (id) => {
    const route = arrayRoutes.find((r) => r.id == id);
    return route ? `${route.origin} - ${route.destination}` : "cargando...";
  };

  useEffect(() => {
    if (arrayRoutes.length == 0) {
      getRoutesCity();
    }
    getInfo();
    return () => {};
  }, [arrayRoutes]);

  return (
    <>
      <div className="mb-2">
        <button
          className="border border-2 border-primary rounded-lg w-10 h-10 text-4xl text-secondary font-bold hover:bg-primary hover:text-white "
          onClick={() => setAddShipment((state) => !state)}
        >
          +
        </button>
      </div>
      <Table title={title} data={arrayData} />
      {addShipment && (
        <AddShipmentsForm
          setAddShipment={setAddShipment}
          updateData={getInfo}
        />
      )}
      {openRoute && (
        <ChangeRoute
          data={dataRow}
          setOpenRoute={setOpenRoute}
          update={getInfo}
        />
      )}
    </>
  );
};
