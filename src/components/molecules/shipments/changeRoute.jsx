import { useState, useEffect } from "react";
import { Modal } from "../../atoms/modal";
import { Label } from "../../atoms/label";
import { Select } from "../../atoms/select";
import { Button } from "../../atoms/button";
import { routesGet } from "../../../services/routes.services";
import { shipmentsUpdateRoute } from "../../../services/shipments.services";

export const ChangeRoute = ({ data, setOpenRoute, update }) => {
  const [arrayRoutes, setArrayRoutes] = useState([]);
  const [text, setText] = useState("");
  const getRoutes = () => {
    routesGet().then((resp) => {
      const origin = resp.routes.find((route) => route.id === data.route_id);
      console.log(origin);
      setText(origin.origin);
      const newArray = resp.routes
        .filter((route) => route.origin === origin.origin)
        .map((route) => ({
          id: route.id,
          label: `${route.origin} - ${route.destination}`,
        }));

      setArrayRoutes(newArray);
    });
  };

  const handleChange = (e) => {
    const id = e.target.value;
    data.route_id = parseInt(id);
  };

  const onsubmit = () => {
    console.log(data);
    shipmentsUpdateRoute(data,data.shipment_id).then((resp) => {
      update()
      setOpenRoute(false)
    });
  };

  useEffect(() => {
    getRoutes();
    return () => {};
  }, []);

  return (
    <Modal>
      <div className="text-center m-3 p-3">
        <div>
          <Label>cambio de ruta</Label>
        </div>
        <div
          class="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300"
          role="alert"
        >
          ten presente la ruta de origen es:
          <span class="font-bold text-xl"> {text}</span>.
        </div>
        <div className="my-5">
          <Select options={arrayRoutes} onChange={handleChange} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Button type="prymary" text={"guardar"} onClick={onsubmit} />
          <Button
            type="prymary"
            text={"cancelar"}
            onClick={() => setOpenRoute(false)}
          />
        </div>
      </div>
    </Modal>
  );
};
