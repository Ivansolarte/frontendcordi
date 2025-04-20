import logo from "../../../assets/logo.png";
import { Label } from "../../atoms/label";
import { Input } from "../../atoms/input";
import { Button } from "../../atoms/button";
import { Link, useNavigate } from "react-router";
import { HanblesChange } from "../../../utils/hook/hanblesChange";
import { loginPost } from "../../../services/login";
import { useDispatch } from "react-redux";
import { login } from "../../../redux/slices/authSlice";
import { setRole } from "../../../redux/slices/roleSlice";

export const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { form, hanbleChangeText } = HanblesChange({ email: "", password: "" });

  const onsubmit = () => {
    loginPost(form).then((resp) => {
      if (resp.token) {
        console.log(resp);
        const json = {
          id:resp.user.id,
          name:resp.user.name,
          role:resp.user.role,
          city:resp.user.city,
        }
        sessionStorage.setItem("loggedUser", JSON.stringify(json));
        sessionStorage.setItem("Authorization", `Bearer ${resp.token}`);
        dispatch(login());
        dispatch(setRole(resp.user.role));
        navigate("/dashboard"); // usa `useNavigate` para redirigir
      } else {
        console.error("Token no recibido");
      }
    });
  };

  return (
    <div className="flex flex-col justify-center items-center content-center px-6  lg:px-8 bg-slate-50">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm text-center ">
        <img
          className="mx-auto h-10 w-auto mb-3 rounded-full"
          src={logo}
          alt="Your Company"
        />
        <Label>Inicia session </Label>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm bg-slate-50 ">
        <div className="space-y-6">
          <div>
            <Input
              value={form.email}
              name={"email"}
              title={"correo electronico"}
              onChange={hanbleChangeText}
            />
          </div>
          <div className="mt-2">
            <Input
              value={form.password}
              name={"password"}
              title={"contraseña"}
              onChange={hanbleChangeText}
            />
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
        <div className="text-sm text-center mt-10 ">
          <Link
            to="/recover-password "
            className="text-secondary text-base hover:text-secondarydark hover:text-lg"
          >
            olvidaste contraseña
          </Link>
        </div>
      </div>
    </div>
  );
};
