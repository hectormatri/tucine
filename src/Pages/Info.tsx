import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";

//Componentes
import ListWrapFilms from "../components/Home/ListWrapFilms";
import ListActors from "../components/Info/ListActors";
import InfoMovie from "../components/Info/InfoMovie";

//Interfaces
import { Result } from "../../interfaceFilms";


function Info() {
  const [similar, setSimilar] = useState<Result[]>();
  const params = useParams();
  const location = useLocation();

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

  const getSimilar = async () => {
    const {data} = await axios.get(`https://api.themoviedb.org/3/movie/${params.movieId}/similar?language=es`, options)
    setSimilar(data.results)
  }

  useEffect(() => {
    if (location.pathname.split("/", 3)[1] === "movieId") {
      window.scroll({top: 0, left: 0, behavior: "smooth"});
      getSimilar();
    }
  },[params.movieId])

  return (
    <div className={`flex flex-col items-center md:items-start`}>
   
      <InfoMovie/>
      <ListActors/>        
      <ListWrapFilms titleWrap="Similares" films={similar}/>
      
    </div>
  );
}

export default Info;
