import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import { useEffect, useState } from "react"

import useFetch from "../hooks/useFetch";

interface options {
  method: string,
  headers: object,
}

const options:options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      `Bearer ` + import.meta.env.VITE_APP_API_KEY,
  },
};


function App() {
  const { fetchEndPoint } = useFetch();
  const [fixed, setFixed] = useState<boolean>(false);
  

  useEffect(() => {
   fetchEndPoint('discover/movie?language=es')
  }, []);

  


  return (
    <div  className="w-screen h-screen">
      <NavBar getFixed={(state) => setFixed(state)}/>

      <div className={`${fixed ? "fixed" : ""}`}>
       <Outlet />
      </div>
    </div>
  );
}

export default App;
