import { useEffect } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../utils/store"
import axios from "axios"

//Redux
import { handleMovieFound } from "../../utils/modelSlice"
import { useDispatch } from "react-redux"

//Componente
import ListWrapFilms from "../components/Home/ListWrapFilms"


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


function FoundMovies() {
  const movieFound = useSelector((state: RootState) => state.movieFound)
  const dispatch = useDispatch();

  const getMoviesFound = async () => {
    
      const { data } = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${localStorage.getItem("busquedas")}&include_adult=false&language=es&page=1`, options)
      dispatch(handleMovieFound(data.results))
    
  }
  
  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
    });
    getMoviesFound()
  },[])
 

  return (
    <div className=" dark:bg-[#121212] bg-white">
        <div className="h-[400px] relative">
          <img src={`https://image.tmdb.org/t/p/w780${movieFound[0]?.backdrop_path}`} className="object-cover dark:brightness-[60%] fixed h-[400px] z-0"/>
        </div>
        <ListWrapFilms titleWrap="" similar={movieFound}/>
    </div>
  )
}

export default FoundMovies