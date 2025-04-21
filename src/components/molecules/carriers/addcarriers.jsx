import { useEffect } from "react";
import { Modal } from "../../atoms/modal";
import { Label } from "../../atoms/label";
import { Input } from "../../atoms/input";
import { HanblesChange } from "../../../utils/hook/hanblesChange";
import { Select } from "../../atoms/select";
import { Button } from "../../atoms/button";
import { carriersPost } from "../../../services/carriers.services";

export const Addcarriers = ({ setOpenCarriers, update }) => {
  const { form, hanbleChangeText } = HanblesChange({
    name: "",
    vehicle_capacity: "",
    is_available: "libre",
    vehicle_type: "",
    location: "",
    capacity: "",
  });

  const tipoVehi = [
    { id: "moto", label: "Moto" },
    { id: "automóvil", label: "Automóvil" },
    { id: "camion", label: "Camion" },
  ];

  const arrayLocation = [
    { id: "Cali", label: "Cali" },
    { id: "Bogotá", label: "Bogotá" },
    { id: "Cartagena", label: "Cartagena" },
    { id: "Medellín", label: "Medellín" },
    { id: "Pasto", label: "Pasto" },
  ];

  const onsubmit = () => {
    console.log(form);

    carriersPost(form).then((resp) => {
      console.log(resp);
      
      setOpenCarriers(false);
      update();
    });
  };

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <Modal>
      <div className="m-10 p-1">
        <div className="mb-6 text-center">
          <Label>Crea un transportista</Label>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Input
              value={form.name}
              name={"name"}
              title={"nombre completo"}
              onChange={hanbleChangeText}
            />
          </div>
          <div>
            <Select
              title={"tipo de vehículo"}
              name={"vehicle_type"}
              value={form.vehicle_type}
              onChange={hanbleChangeText}
              options={tipoVehi}
            />
          </div>
          <div>
            <Input
              value={form.vehicle_capacity}
              name={"vehicle_capacity"}
              title={"capacidad  (en kilos)"}
              onChange={hanbleChangeText}
            />
          </div>
          <div>
            <Select
              value={form.location}
              name={"location"}
              title={"ubicación"}
              options={arrayLocation}
              onChange={hanbleChangeText}
            />
          </div>
        </div>
        <div className="mt-3 flex">
          <Button text={"enviar"} onClick={onsubmit} />
          <Button
            type="cancel"
            text={"cancelar"}
            onClick={() => setOpenCarriers((state) => !state)}
          />
        </div>
      </div>
    </Modal>
  );
};
