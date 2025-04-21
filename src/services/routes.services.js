import { ENDPOINTS } from "../constants";

export const routesGet = async () => {
  const response = await fetch(ENDPOINTS.routes, {
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
