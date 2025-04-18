import { useState } from "react";
import { Label } from "../atoms/label";

import { Link, useNavigate } from "react-router";
import { LoginForm } from "../molecules/loginForm";
import { RegisterForm } from "../molecules/registerForm";

export const Login = () => {
  const [action, setAction] = useState(false);

  return (
    <div className="bg-slate-200 h-screen flex justify-center items-center">
      <div className="grid grid-cols-2 border border-2 border-slate-300 rounded-t-lg rounded-b-lg ">
        <div
          className={`border border-slate-400 p-2 text-center rounded-tl-lg ${!action&&"bg-secondary opacity-85 "}`}
          onClick={() => setAction(false)}
        >
          <Label classes={`uppercase ${!action&&"text-white"}`}>Inicio session</Label>{" "}
        </div>
        <div
          className={`border border-slate-400 p-2 text-center rounded-tr-lg  ${action&&"bg-secondary opacity-85 "}`}
          onClick={() => setAction(true)}
        >
          <Label classes={`uppercase ${action&&"text-white"}`}>regístrate</Label>
        </div>
        <div className="col-span-2">
          {!action ? <LoginForm /> : <RegisterForm />}
        </div>
      </div>
    </div>
  );
};
