// src/constants.js

export const API_BASE_URL = "http://localhost:3000/api/";

export const ENDPOINTS = {
  login: `${API_BASE_URL}login`,
  register: `${API_BASE_URL}users`,
  recoverPassword: `${API_BASE_URL}/recover-password`,


  shipments: `${API_BASE_URL}shipments`,
  routes: `${API_BASE_URL}routes`,
  carriers: `${API_BASE_URL}carriers`,
  user: `${API_BASE_URL}/users`,
  // Agrega aquí todos los endpoints que necesites
};