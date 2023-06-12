import ReactDOM from "react-dom/client";
import "./index.css";
import { Routes, Route, HashRouter } from "react-router-dom";
import { Provider } from "react-redux"
import {store} from "../utils/store"

//Pages
import App from "./App.tsx";
import Home from "./Pages/Home.tsx";
import Info from "./Pages/Info.tsx";
import FoundMovies from "./Pages/FoundMovies.tsx";
import MovieNotFound from "./Pages/MovieNotFound.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <HashRouter >
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/" element={<Home />}/>
          <Route path="/found-movies" element={<FoundMovies />} />
          <Route path="/movie-notFound" element={<MovieNotFound/>}/>
          <Route path="/movieId/:movieId" element={<Info/>}/>
        </Route>
      </Routes>
    </HashRouter>
  </Provider>
);
