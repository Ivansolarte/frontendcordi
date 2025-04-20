import { ENDPOINTS } from "../constants";

export const shipmentsGet = async () => {
  const response = await fetch(ENDPOINTS.shipments, {
    method: "Get",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `${sessionStorage.getItem("Authorization")}`,
    },
    
  });
  if (!response.ok) {
    throw new Error("Error en la solicitud");
  }
  const data = await response.json();
  return data;
};

export const shipmentsGetById = async (id) => {
  const response = await fetch(`${ENDPOINTS.shipments}/${id}`, {
    method: "Get",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `${sessionStorage.getItem("Authorization")}`,
    },
    
  });
  if (!response.ok) {
    throw new Error("Error en la solicitud");
  }
  const data = await response.json();
  return data;
};
//publica
export const shipmentsGetByOrden= async (id) => {
  const response = await fetch(`${ENDPOINTS.shipments}/public/${id}`, {
    method: "Get",
    headers: {
      "Content-Type": "application/json",
    },
    
  });
  if (!response.ok) {
    throw new Error("Error en la solicitud");
  }
  const data = await response.json();
  return data;
};

export const shipmentsPost = async (payload) => {
  const response = await fetch(ENDPOINTS.shipments, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
     "Authorization": `${sessionStorage.getItem("Authorization")}`,
    },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error("Error en la solicitud");
  }
  const data = await response.json();
  return data;
};

export const shipmentsUpdateRoute = async (payload ,id) => {
  const response = await fetch(`${ENDPOINTS.shipments}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `${sessionStorage.getItem("Authorization")}`,
    },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error("Error en la solicitud");
  }
  const data = await response.json();
  return data;
};
