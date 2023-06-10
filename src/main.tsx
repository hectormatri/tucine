import ReactDOM from "react-dom/client";
import "./index.css";
import { Routes, Route, HashRouter } from "react-router-dom";
import { Provider } from "react-redux"
import {store} from "../utils/store"

//Pages
import App from "./App.tsx";
import Explore from "./Pages/Explore.tsx";
import Home from "./Pages/Home.tsx";
import Info from "./Pages/Info.tsx";
import FoundMovies from "./Pages/FoundMovies.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <HashRouter >
      <Routes>
        
        <Route path="/" element={<App />}>
          <Route path="/" element={<Home />}/>
          <Route path="/explore-films" element={<Explore />} />
          <Route path="/found-movies" element={<FoundMovies />} />
          <Route path="/movieId/:movieId" element={<Info/>}/>
        </Route>
      </Routes>
    </HashRouter>
  </Provider>
);
