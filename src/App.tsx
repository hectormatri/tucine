import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import { useEffect } from "react"

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

  useEffect(() => {
   fetchEndPoint('discover/movie?language=es')
  }, []);

  return (
    <div  className="w-screen h-screen">
      <NavBar />

      <Outlet />
    </div>
  );
}

export default App;
