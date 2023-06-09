import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../utils/store";

//Componentes
import ListFilms from "../components/Home/ListPopularFilms";
import ListWrapFilms from "../components/Home/ListWrapFilms";

//Hooks
import usePlatform from "../../hooks/usePlatforn"

function Home() {
  const imageHome = useSelector((state: RootState) => state.filmsDiscover)
  const [url, setUrl] = useState<string>();
  const {platform, getMobileOperatingSystem} = usePlatform();

  function numberRandom(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

  const checkImg = () => {
    if (imageHome[numberRandom(0, imageHome.length)]?.backdrop_path !== undefined) {
      setUrl(`https://image.tmdb.org/t/p/original${imageHome[numberRandom(0, imageHome.length)]?.backdrop_path}`)
    } else {
      setUrl(`https://image.tmdb.org/t/p/original/eTvN54pd83TrSEOz6wbsXEJktCV.jpg`)
    }
  }

  useEffect(() => {
    checkImg();
    getMobileOperatingSystem()
    
  },[])

  
  return (
    <div  className={`flex flex-col ${platform === "iOS" ? "" : ""}  items-center dark:bg-black bg-white overflow-x-hidden`}>
      <div className="w-screen h-screen z-0 ">
        <img src={url}
          className="w-full h-screen object-cover object-top fixed z-0 dark:brightness-[0.5] brightness-[1.1] left-0"
        />
      </div>
      <ListFilms/>
      <ListWrapFilms/>
    </div>
  );
}

export default Home;
