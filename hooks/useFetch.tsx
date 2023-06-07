import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../utils/store";

//Reducers
import { handleInitialStateFilms } from "../utils/modelSlice";
import { handleInitialStateInfoMovie } from "../utils/modelSlice";

function useFetch() {
  const dispatch = useDispatch();
  const movies = useSelector((state: RootState) => state.filmsDiscover);

  interface options {
    method: string;
    headers: object;
  }

  const options: options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ` + import.meta.env.VITE_APP_API_KEY,
    },
  };

  const fetchEndPoint = async (url: string) => {
    const { data } = await axios.get(url, options);

    if (movies[0] === undefined && url === "https://api.themoviedb.org/3/discover/movie?language=es") {
        dispatch(handleInitialStateFilms(data.results));
    } else if ((movies[0] !== undefined && url !== "https://api.themoviedb.org/3/discover/movie?language=es")) {
      dispatch(handleInitialStateInfoMovie(data));
    } else return
  };

  return { fetchEndPoint };
}

export default useFetch;
