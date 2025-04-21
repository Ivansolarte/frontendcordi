import { useState } from "react";
import { Label } from "../../atoms/label";
import { Input } from "../../atoms/input";
import { Button } from "../../atoms/button";
import { shipmentsGetByOrden } from "../../../services/shipments.services";

export const ShippingHistory = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState(null);
  const onsubmit = () => {
    console.log(search);
    shipmentsGetByOrden(search).then((resp) => {
      console.log(resp.shipments[0]);
      setData(resp.shipments[0]);
    });
  };
  return (
    <div>
      <div>
        <Label>historias de el envio</Label>
      </div>
      <div className="w-[350px] flex">
        <div>
          <Input value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div>
          <Button text={"buscar"} onClick={onsubmit} />
        </div>
      </div>
      <div>
        {data&&<div className="py-3">
          <h3 className="font-bold text-blue-600 mb-2">Envío actualizado</h3>
          <p className="text-sm">
            <span className="font-semibold">Orden:</span> {data.order_number}
          </p>
          <p className="text-sm">
            <span className="font-semibold">Estado:</span> {data.status_actual}
          </p>
          <p className="text-sm">
            <span className="font-semibold">Remitente:</span> {data.sender_name}
          </p>
          <p className="text-sm">
            <span className="font-semibold">Teléfono:</span> {data.sender_phone}
          </p>
          <p className="text-sm">
            <span className="font-semibold">Dirección:</span>{" "}
            {data.shipment_address}
          </p>
        </div>}
      </div>
    </div>
  );
};
