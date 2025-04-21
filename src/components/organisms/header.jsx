import { useState, useEffect } from "react";
import logo from "../../assets/logo-header.png";
import { Link } from "react-router";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { io } from 'socket.io-client';
const socket = io("http://localhost:3000");

export const Header = () => {
  const role = useSelector((state) => state.role.role); ///el rolo de login
  const navigate = useNavigate();
  const [menuMobil, setMenuMobil] = useState(false);
  const [menuDestop, setMenuDestop] = useState(false);

  const logOut = () => {
    console.log("cerrando seccion");

    
    sessionStorage.clear();
    navigate(0);
  };
  console.log(role);

 useEffect(() => {
  // const user = JSON.parse(sessionStorage.getItem("loggedUser")); // o de Redux si prefieres
  // if (user && user.user_id) {
  //   console.log('entrooooooooo',user.user_id);
    
  //   socket.emit("registerUser", user.user_id); //no quemes el "2"
  // }
  socket.emit("registerUser", 2);
  socket.on("shipmentStatusUpdated", (data) => {
    alert(" Estado actualizado inf socket:" + JSON.stringify(data, null, 2));
    // O usar toast: toast(`Tienes ${data.length} envíos pendientes`);
  });

  return () => {
    socket.off("shipmentStatusUpdated");
  };
}, []);

  return (
    <nav className="bg-secondary ">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-blue-500 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={() => setMenuMobil((state) => !state)}
            >
              <span className="absolute -inset-0.5"></span>
              <span className="sr-only">Open main menu</span>

              <svg
                className="block size-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
                data-slot="icon"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>

              <svg
                className="hidden size-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
                data-slot="icon"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <img
                src={logo}
                alt="coordinadora"
                className="rounded-full w-36 "
              />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <Link
                  to={"/dashboard/shipments"}
                  className={`rounded-md hover:bg-blue-600 px-3 py-2 text-sm font-medium text-white ${role}`}
                >
                  Ordenes de envío
                </Link>
                {/* <Link
                  to={"/dashboard/carriers"}
                  className={`rounded-md hover:bg-blue-600 px-3 py-2 text-sm font-medium text-white ${role!="administrador"&&"sr-only"}`}
                >
                  Asignar trasporte
                </Link> */}
                <Link
                  to={"/dashboard/followUp"}
                  className={`rounded-md hover:bg-blue-600 px-3 py-2 text-sm font-medium text-white ${role}`}
                >
                  Seguimiento
                </Link>
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button
              type="button"
              className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden"
            >
              <span className="absolute -inset-1.5"></span>
              <span className="sr-only">View notifications</span>
              <svg
                className="size-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
                data-slot="icon"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                />
              </svg>
            </button>

            <div className="relative ml-3">
              <div>
                <button
                  type="button"
                  className="relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden"
                  id="user-menu-button"
                  aria-expanded="false"
                  aria-haspopup="true"
                  onClick={() => setMenuDestop((state) => !state)}
                >
                  <span className="absolute -inset-1.5"></span>
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="size-8 rounded-full"
                    src="https://img.freepik.com/vector-premium/icono-perfil-usuario-estilo-plano-ilustracion-vector-avatar-miembro-sobre-fondo-aislado-concepto-negocio-signo-permiso-humano_157943-15752.jpg?semt=ais_hybrid&w=740"
                    alt=""
                  />
                </button>
              </div>

              {menuDestop && (
                <div
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-hidden"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu-button"
                  tabindex="-1"
                >
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700"
                    role="menuitem"
                    tabindex="-1"
                    id="user-menu-item-0"
                  >
                    Perfil
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700"
                    role="menuitem"
                    tabindex="-1"
                    id="user-menu-item-1"
                  >
                    Configuración
                  </a>
                  <p
                    className="block px-4 py-2 text-sm text-gray-700 cursor-pointer"
                    tabindex="-1"
                    id="user-menu-item-2"
                    onClick={logOut}
                  >
                    Cerrar session
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {menuMobil && (
        <div className="sm:hidden" id="mobile-menu">
          <div className="space-y-1 px-2 pt-2 pb-3">
            <a
              href="#"
              className="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white"
              aria-current="page"
            >
              Dashboardmm
            </a>
            <a
              href="#"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              Team
            </a>
            <a
              href="#"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              Projects
            </a>
            <a
              href="#"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              Calendar
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};
