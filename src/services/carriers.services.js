
import { ENDPOINTS } from "../constants";

export const carriersPost = async (payload) => {
  const response = await fetch(ENDPOINTS.carriers, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      'Authorization': sessionStorage.getItem("Authorization"),
    },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error("Error en la solicitud");
  }
  const data = await response.json();
  return data;
};

export const carriersGet = async () => {
  const response = await fetch(ENDPOINTS.carriers, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      'Authorization': sessionStorage.getItem("Authorization"),
    },
  });
  if (!response.ok) {
    throw new Error("Error en la solicitud");
  }
  const data = await response.json();
  return data;
};

export const carriersPatch = async (payload,id) => {
    const response = await fetch(`${ENDPOINTS.carriers}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        'Authorization': sessionStorage.getItem("Authorization"),
      },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      throw new Error("Error en la solicitud");
    }
    const data = await response.json();
    return data;
  };