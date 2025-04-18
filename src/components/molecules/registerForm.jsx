import { useState } from "react";
import { Input } from "../atoms/input";
import { Button } from "../atoms/button";
import {  useNavigate } from "react-router";
import { HanblesChange } from "../../utils/hook/hanblesChange";
import { registerPost } from "../../services/login";
import { useDispatch } from "react-redux";
import { InputPassword } from "../atoms/inputPassword";

export const RegisterForm = () => {
  const navigate = useNavigate();

  const { form, hanbleChangeText } = HanblesChange({
    name: "",
    email: "",
    password: "",
  });
  const [pass, setPass] = useState("");

  const onsubmit = () => {
    if (form.password != pass) {      
      return;
    }

    registerPost(form).then((resp) => {
      console.log(resp);

      if (resp) {
        navigate("/"); // usa `useNavigate` para redirigir
        window.location.reload();
      } else {
        console.error("Token no recibido");
      }
    });
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 ">
      <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="space-y-6">
          <div>
            <Input
              value={form.name}
              name={"name"}
              title={"nombre completo"}
              onChange={hanbleChangeText}
            />
          </div>
          <div>
            <Input
              value={form.email}
              name={"email"}
              title={"correo electronico"}
              onChange={hanbleChangeText}
            />
          </div>
          <div className="mt-2">
            <InputPassword
              value={form.password}
              name={"password"}
              title={"contraseña"}
              onChange={hanbleChangeText}
            />
          </div>
          <div className="mt-2">
            <InputPassword
              value={pass}
              name={"pass"}
              title={"confirma contraseña"}
              onChange={(e) => setPass(e.target.value)}
            />
            {form.password != pass && (
              <div
                className="p-4 mb-4 mt-1 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                <span className="font-medium">Las contraseña </span> no son
                iguales.
              </div>
            )}
          </div>
          <div>
            <Button
              classes={"hover:bg-primarydark text-white "}
              type="primary"
              text={"enviar"}
              onClick={onsubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
