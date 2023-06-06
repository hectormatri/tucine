import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div className="w-screen h-screen">
      <NavBar />

      <Outlet />
    </div>
  );
}

export default App;
