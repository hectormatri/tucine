import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../utils/store";
import axios from "axios";


//Componentes
import ListHorizontalFilms from "../components/Home/ListHorizontalFilms";
import { Result, filmsDiscoverInterface } from "../../interfaceFilms";
import ListWrapFilms from "../components/Home/ListWrapFilms";


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


function Home() {
  const filmsDiscover = useSelector((state: RootState) => state.filmsDiscover);
  const [url, setUrl] = useState<string>();
  const [mejorValoradas, setMejoraValoradas] = useState<filmsDiscoverInterface[]>();
  const [upcoming, setUpcoming] = useState<Result[]>();
  

  function numberRandom(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

  const checkImg = () => {
    if (filmsDiscover[numberRandom(0, filmsDiscover.length)]?.backdrop_path !== undefined) {
      setUrl(`https://image.tmdb.org/t/p/original${filmsDiscover[numberRandom(0, filmsDiscover.length)]?.backdrop_path}`)
    } else {
      setUrl(`https://image.tmdb.org/t/p/original/eTvN54pd83TrSEOz6wbsXEJktCV.jpg`)
    }
  }

  const getTopRated = async () => {
    const { data } = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?language=es&page=1`, options)
    setMejoraValoradas(data.results)
  }

  const getUpcoming = async () => {
    const currentDate = new Date();
    const { data } = await axios.get(`https://api.themoviedb.org/3/movie/upcoming?language=es&page=1`,options)
    const dateFilter = data.results.filter((f: Result) => new Date(f.release_date).getTime() > currentDate.getTime())
    setUpcoming(dateFilter)
  }


  useEffect(() => {
    window.scrollTo(0, 0)
    checkImg();
    getTopRated();
    getUpcoming();
  },[])


  if (history.scrollRestoration) {
    history.scrollRestoration = "manual";
  }
  
  
  return (
    <div  className={`flex flex-col items-center dark:bg-black bg-white overflow-hidden`}>
      <div className="w-screen h-screen z-0 ">
        <i className="dark:bg-[#121212] opacity-50 bg-white rounded-full p-1 iconoir-mouse-scroll-wheel dark:text-white fixed z-10 bottom-5 left-[calc(50vw-29px)] text-[50px]"/>
        <img src={url}
          loading="lazy"
          className="w-full h-screen object-cover object-top fixed z-0 dark:brightness-[0.5] brightness-[1.1] left-0"
        />
      </div>
      <div className="flex flex-col w-screen">
        <ListHorizontalFilms films={filmsDiscover} titleList={"Lo más popular"}/>
        <ListHorizontalFilms films={mejorValoradas} titleList={"Con mejor valoración"}/>
        {
          upcoming && upcoming?.length > 0 ? 
          <ListWrapFilms films={upcoming} titleWrap="Están por llegar"/> : ''
        }
      </div>
    </div>
  );
}

export default Home;
