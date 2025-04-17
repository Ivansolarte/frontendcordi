
import logo from "../../assets/logo.png";
import { Label } from "../atoms/label";
import { Input } from "../atoms/input";
import { Button } from "../atoms/button";
import { Link, useNavigate } from "react-router";
import { HanblesChange } from "../../utils/hook/hanblesChange";
import { loginPost } from "../../services/login";
import { useDispatch } from "react-redux";
import { login } from "../../redux/slices/authSlice";

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch(); 

  const { form, hanbleChangeText } = HanblesChange({ email: "", password: "" });


  const onsubmit = () => {
    loginPost(form).then((resp) => {
      if (resp.token) {
        sessionStorage.setItem("Authorization",`Bearer ${ resp.token}`);
        dispatch(login());
        navigate("/dashboard"); // usa `useNavigate` para redirigir
      } else {
        console.error("Token no recibido");
      }
    });
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 border border-2 border-red-800 h-screen">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm text-center">
        <img
          className="mx-auto h-10 w-auto mb-3"
          src={logo}
          alt="Your Company"
        />
        <Label>Inicia session </Label>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="space-y-6" >
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
        <div className="text-sm text-center mt-10">
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
