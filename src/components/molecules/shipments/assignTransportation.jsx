import { useState, useEffect } from "react";
import { useLocation, Link , useNavigate} from "react-router";
import { Button } from "../../atoms/button";
import { Input } from "../../atoms/input";
import { Label } from "../../atoms/label";
import { P } from "../../atoms/p";
import { Select } from "../../atoms/select";
import { Addcarriers } from "../carriers/addcarriers";
import { carriersGet,carriersPatch } from "../../../services/carriers.services";
import { routesGet } from "../../../services/routes.services";
import { shipmentsUpdateRoute } from "../../../services/shipments.services";

export const AssignTransportation = () => {
    const navigate = useNavigate();
  const location = useLocation();
  const datos = location.state;
  const [openCarriers, setOpenCarriers] = useState(false);
  const [arrayCarriers, setArrayCarriers] = useState([]);
  const [arrayRoutes, setArrayRoutes] = useState([]);
  const [infCarriers, setInfCarriers] = useState({});
  const [dataCarriers, setDataCarriers] = useState([]);
  const [idCarriers, setIdCarriers] = useState({
    carrier_id: "",
    // status_actual: "En tránsito",
    status_actual: "En tránsito",
  });
console.log(datos);

  const getCarriers = () => {
    carriersGet().then((resp) => {
      setDataCarriers(resp.carriers);
      const newArray = resp.carriers
      .filter(row => row.is_available !== "viajando")
      .map(row => ({
        id: row.id,
        label: `Transportista-${row.name}`,
      }));

      setArrayCarriers(newArray);
    });
  };

  const getRoutes = () => {
    routesGet().then((resp) => {
      setArrayRoutes(resp.routes);
    });
  };

  const routeById = (id) => {
    const resp = arrayRoutes.find((elem) => elem.id == id);
    // setStateAvailable(resp);
    return `${resp?.origin}-${resp?.destination}`;
  };

  const selectCarriers = (e) => {
    console.log(e.target.value);
    const resp = dataCarriers.find((elem) => elem.id == e.target.value);
    console.log(resp);
    setIdCarriers((prev) => ({
      ...prev,
      carrier_id: e.target.value,
    }));
    setInfCarriers(resp);
  };

  const onsubmit = () => {
    datos.carrier_id= idCarriers.carrier_id
    datos.status_actual= idCarriers.status_actual    
    shipmentsUpdateRoute(datos,datos.shipment_id).then(() => {
        infCarriers.is_available="viajando"
        carriersPatch(infCarriers,infCarriers.id).then(()=>{
            navigate('/dashboard/shipments')
        })
    });
  };

  useEffect(() => {
    getCarriers();

    getRoutes();

    return () => {};
  }, []);

  return (
    <div>
      <div className="mb-5 hover:text-lg">
        <Link to={"/dashboard/shipments"}>volver</Link>
      </div>

      <div className="w-52 ">
        <Button
          onClick={() => setOpenCarriers(true)}
          type="secondary"
          classes={"hover:bg-secondarydark text-white"}
          text={"Crear trasnsportista"}
        />
      </div>

      <div className="mt-5">
        <Label>
          <span className="text-base">
            asigna un transportador al paquete No.Guia:
          </span>
          {datos?.order_number}
        </Label>
      </div>
      <div className="grid grid-cols- gap-10 mt-5">
        <div className="border border-2 border-slate-500 rounded-lg grid grid-cols-3 gap-10 p-3   ">
          <P classes={"col-span-3  -mb-9 uppercase font-bold"}>datos paquete</P>
          {arrayRoutes.length != 0 && (
            <div>
              <Input
                title={"ruta"}
                disabled={true}
                value={routeById(datos?.route_id)}
              />
            </div>
          )}

          <div>
            <Input
              title={"dirección"}
              disabled={true}
              value={datos?.shipment_address}
            />
          </div>
          <div>
            <Input title={"tipo"} disabled={true} value={datos?.package_ids} />
          </div>
          <div>
            <Input
              title={"Dimensiones"}
              disabled={true}
              value={`${datos?.package_widths} x ${datos?.package_heights}`}
            />
          </div>
          <div>
            <Input
              title={"peso"}
              disabled={true}
              value={datos?.package_weights}
            />
          </div>
          <div>
            <Input
              title={"estado"}
              disabled={true}
              value={datos?.status_actual}
            />
          </div>
        </div>

        <div className="border border-2 border-slate-500 rounded-lg grid grid-cols-3 gap-10 p-3   ">
          <P classes={"col-span-3  -mb-9 uppercase font-bold"}>datos usuario</P>
          <div>
            <Input title={"nombre"} disabled={true} value={datos?.sender_name} />
          </div>
          <div>
            <Input
              title={"teléfono"}
              disabled={true}
              value={datos?.sender_phone}
            />
          </div>
          <div>
            <Input
              title={"ubicación"}
              disabled={true}
              value={datos?.package_weights}
            />
          </div>
        </div>
        <div className="border border-2 border-slate-500 rounded-lg grid grid-cols-3 gap-10 p-3   ">
          <P classes={"col-span-3  -mb-9 uppercase font-bold"}>
            Asignar transportador
          </P>
          <div>
            <Select
              options={arrayCarriers}
              name={""}
              value={datos?.carrier_id}
              onChange={selectCarriers}
            />
          </div>
          <div>
            <div className="grid grid-cols-2 ">
              <p>
                Tipo vehículo:
                <span className="font-semibold">
                  {infCarriers?.vehicle_type}
                </span>
              </p>
              <p>
                Capacidad de carga:
                <span className="font-semibold">
                  {infCarriers?.vehicle_capacity}-kl
                </span>
              </p>
              <p>
                Disponibilidad:
                <span className="font-semibold">
                  {infCarriers?.is_available}
                </span>
              </p>
              <p>
                Ubicación:
                <span className="font-semibold">{infCarriers?.location}</span>
              </p>
            </div>
          </div>
          <div>
            <Button text={"Agregar"} onClick={onsubmit} />
          </div>
        </div>
      </div>
      {openCarriers && <Addcarriers setOpenCarriers={setOpenCarriers} update={getCarriers} />}
    </div>
  );
};
