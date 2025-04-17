import { useEffect } from "react";
import { useSelector } from "react-redux";
import { AuthRoutes } from "./routes/authRoutes";
import { AppRoutes } from "./routes/appRoutes";
import { useDispatch } from 'react-redux';
import { login } from "./redux/slices/authSlice";
import { useNavigate } from "react-router";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate() 
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    const token = sessionStorage.getItem('Authorization');
    if (token) {
      dispatch(login());
      navigate("/dashboard"); 
    }else{
      navigate("/"); 
    }
  }, [])
  
  
  return (     
    <>
      {!isAuthenticated?(<AuthRoutes/>):(<AppRoutes/>)}
    </>
   
  )
}

export default App
