import { useState } from "react"
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../utils/store";


//Reducers
import { handleInitialStateFilms } from "../utils/modelSlice";
import { handleInitialStateInfoMovie } from "../utils/modelSlice";

import { infoMovieInterface } from "../interfaceFilms"


function useFetch() {
  const dispatch = useDispatch();
  const movies = useSelector((state: RootState) => state.filmsDiscover);
 

  const [films, setFilms] = useState<infoMovieInterface>();
 

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
    const { data } = await axios.get(`https://api.themoviedb.org/3/${url}`, options);
    
    if (movies[0] === undefined && url === "discover/movie?language=es") {
        dispatch(handleInitialStateFilms(data.results));

    } else if ((movies[0] !== undefined && url !== "discover/movie?language=es")) {
      setFilms(data);
      console.log("hola")
      
    } else {
      dispatch(handleInitialStateInfoMovie(data))
      console.log("adios")
     
    }
  };

  return { fetchEndPoint, films };
}

export default useFetch;
