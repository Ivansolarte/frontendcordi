import { useEffect, useState } from "react";
import { Modal } from "../../atoms/modal";
import { Input } from "../../atoms/input";
import { Button } from "../../atoms/button";
import { HanblesChange } from "../../../utils/hook/hanblesChange";
import { Link } from "react-router";
import { Label } from "../../atoms/label";
import { validateAddress } from "../../../utils/validateAddress/validateAddress";
import { Select } from "../../atoms/select";
// import { useSelector } from "react-redux";
import { routesGet } from "../../../services/routes.services";
import { shipmentsPost } from "../../../services/shipments.services";

export const AddShipmentsForm = ({ setAddShipment, updateData }) => {
  const user = JSON.parse(sessionStorage.getItem("loggedUser"));
  const [validateAddres] = useState(false);
  // const role = useSelector((state) => state.role.role); ///el rolo de login
  const { form, hanbleChangeText, hanbleChangeNum } = HanblesChange({
    user_id: user.id,
    route_id: "", ////validar con el city y con la direccion
    status_actual: "En espera",
    sender_name: "",
    sender_phone: "",
    weight: "",
    width: "",
    height: "",
    product_type: "",
    shipment_address: "",

    carrier_id: "",
  });

  const [arrayRoutes, setArrayRoutes] = useState([]);

  const getRoutesCity = () => {
    routesGet().then((resp) => {
      setArrayRoutes(resp.routes);
    });
  };

  const runValidation = async (payload) => {
    const result = await validateAddress(payload);
    return result;
  };

  const searchRoutes = (origen, destino) => {
    console.log(arrayRoutes);
    
    const rutaEncontrada = arrayRoutes.find(
      (ruta) =>
        ruta.origin.toLowerCase() == origen.toLowerCase() &&
        ruta.destination.toLowerCase() == destino.toLowerCase()
    );

    if (rutaEncontrada) {
      return rutaEncontrada; // devuelve el objeto
    } else {
      return { error: "Ruta no encontrada", status: false }; // o simplemente null si prefieres
    }
  };

  const options = [
    { id: 1, label: "Sobre" },
    { id: 2, label: "Caja" },
    { id: 3, label: "Bolsa plástica" },
    { id: 4, label: "Tubo / Cilindro" },
    { id: 5, label: "Jaula / Guacal" },
    { id: 7, label: "Contenedor" },
  ];

  const onSubmit = async () => {
    const resp = await runValidation(form.shipment_address);
console.log(resp);

    if (!resp.valid) {
      alert("La direeccion no es valida ");
      return;
    }
console.log(user.city, resp.data.city);

    const idRoutes = searchRoutes(user.city, resp.data.city);
console.log(idRoutes);

    if (idRoutes.status == false) {
      alert("No tenemos cobertura para ese destino o la dirección esta mal escrita");
      return;
    }

    form.route_id = idRoutes.id;

    shipmentsPost(form).then((resp) => {

      if (resp) {
        alert("este es tu numero de guia ",JSON.stringify(resp?.shipment.order_umber));
        updateData();
        setAddShipment((state) => !state);
        return;
      }
      alert("algo fallo al registar");
    });
  };

  useEffect(() => {
    getRoutesCity();
    return () => {};
  }, []);

  return (
    <Modal>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 ">
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="text-center mb-3">
            <Label>Orden de envió</Label>
          </div>
          <div className="space-y-6">
            <div>
              <Input
                value={form.sender_name}
                name={"sender_name"}
                title={"nombre del destinatario"}
                onChange={hanbleChangeText}
              />
            </div>
            <div>
              <Input
                maxLength={"10"}
                value={form.sender_phone}
                name={"sender_phone"}
                title={"teléfono"}
                onChange={hanbleChangeNum}
              />
            </div>
            <div className="mt-2">
              <Input
                value={form.shipment_address}
                name={"shipment_address"}
                title={"Dirección de destino"}
                onChange={hanbleChangeText}
              />
              <div
                className={`p-4 mb-4 mt-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 text-center ${
                  !validateAddres && "sr-only"
                } `}
              >
                <span className="font-medium">Dirección!</span> no valida
              </div>
            </div>
            <div>
              <Select
                name={"product_type"}
                value={form.product_type}
                onChange={hanbleChangeText}
                title={"Tipo del producto"}
                options={options}
              />
            </div>
            <div>
              <Input
               maxLength={"4"}
                value={form.weight}
                name={"weight"}
                title={"Peso (en gramos)"}
                onChange={hanbleChangeNum}
              />
            </div>
            <div>
              <label className="block text-md font-medium font-coordi text-gray-900 ml-1 uppercase">
                Dimensiones del paquete (en cm)
              </label>
              <div className="flex">
                <Input
                  maxLength={"3"}
                  placeholder={"Ancho"}
                  classes={"mr-2"}
                  value={form.width}
                  name={"width"}
                  onChange={hanbleChangeNum}
                />
                <p className="text-4xl">x</p>
                <Input
                  maxLength={"3"}
                  placeholder={"Alto"}
                  classes={"ml-2"}
                  value={form.height}
                  name={"height"}
                  onChange={hanbleChangeNum}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Button
                classes={"hover:bg-primarydark text-white "}
                type="primary"
                text={"enviar"}
                onClick={onSubmit}
              />
              <Button
                classes={"hover:bg-canceldark text-white "}
                type="cancel"
                text={"cancelar"}
                onClick={() => setAddShipment((state) => !state)}
              />
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
