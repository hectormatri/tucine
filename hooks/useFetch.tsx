import axios from "axios";
import { useDispatch } from "react-redux"

//Reducers
import { handleInitialState } from "../utils/modelSlice"

function useFetch() {
  const dispatch = useDispatch();

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

  const fetchEndPoint = async () => {
    const {data} = await axios.get(
      "https://api.themoviedb.org/3/discover/movie?language=es",
      options
    );
    
    dispatch(handleInitialState(data.results))
  };

  return { fetchEndPoint };
}

export default useFetch;
