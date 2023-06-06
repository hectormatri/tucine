import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";


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
  

  return (
    <div className="w-screen h-screen">
      <NavBar />

      <Outlet />
    </div>
  );
}

export default App;
