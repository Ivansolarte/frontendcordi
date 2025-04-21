import { useEffect, useState } from 'react';
import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend,
  LineChart, Line, CartesianGrid,
} from 'recharts';
import { shipmentsGet } from "../../../services/shipments.services";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Graphics = () => {
  const [shipments, setShipments] = useState([]);

  useEffect(() => {
    // Llamar a la función para obtener los datos de shipments

    shipmentsGet().then((resp)=>{
      
      console.log(resp.shipments);
        setShipments(resp.shipments);
  
    })  
  }, []);

console.log(shipments);

  // Contar por estado

  const statusCounts = shipments.reduce((acc, curr) => {
    acc[curr.status_actual] = (acc[curr.status_actual] || 0) + 1;
    return acc;
  }, {});

  const statusData = Object.keys(statusCounts).map((key) => ({
    name: key,
    value: statusCounts[key],
  }));

  // Contar por transportista
  const carrierCounts = shipments.reduce((acc, curr) => {
    const carrier = curr.carrier_id || 'Sin asignar';
    acc[carrier] = (acc[carrier] || 0) + 1;
    return acc;
  }, {});

  const carrierData = Object.keys(carrierCounts).map((key) => ({
    name: key === 'Sin asignar' ? 'Sin asignar' : `Transportista ${key}`,
    value: carrierCounts[key],
  }));

  // Agrupar por hora
  const hourlyData = shipments.reduce((acc, curr) => {
    const hour = new Date(curr.created_at).getHours();
    acc[hour] = (acc[hour] || 0) + 1;
    return acc;
  }, {});

  const shipmentsByHour = Object.keys(hourlyData).map((hour) => ({
    hour: `${hour}:00`,
    count: hourlyData[hour],
  }));

  if (shipments.length === 0) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Estado actual - Pie */}
      <div className="shadow p-4 rounded-xl border bg-white">
        <h2 className="text-lg font-bold mb-4 text-center">Estados de envíos</h2>
        <PieChart width={300} height={250}>
          <Pie
            data={statusData}
            cx="50%"
            cy="50%"
            outerRadius={80}
            label
            dataKey="value"
          >
            {statusData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>

      {/* Por transportista - Barras */}
      <div className="shadow p-4 rounded-xl border bg-white">
        <h2 className="text-lg font-bold mb-4 text-center">Envíos por transportista</h2>
        <BarChart width={300} height={250} data={carrierData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </div>

      {/* Por hora - Línea */}
      <div className="shadow p-4 rounded-xl border bg-white">
        <h2 className="text-lg font-bold mb-4 text-center">Envíos por hora</h2>
        <LineChart width={300} height={250} data={shipmentsByHour}>
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="hour" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="count" stroke="#82ca9d" />
        </LineChart>
      </div>
    </div>
  );
};

export default Graphics;
