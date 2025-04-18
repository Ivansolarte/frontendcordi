import { ENDPOINTS } from "../constants";
export const loginPost = async (payload) => {
  try {
    const response = await fetch(ENDPOINTS.login, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      throw new Error("Error en la solicitud");
    }
    const data = await response.json();
    return data;
    
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    return null;
  }
};

export const registerPost = async (payload) => {
  try {
    const response = await fetch(ENDPOINTS.register, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      throw new Error("Error en la solicitud");
    }
    const data = await response.json();
    return data;

  } catch (error) {
    console.error("Error al registra:", error);
    return null;
  }
};
