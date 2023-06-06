import { useSelector } from "react-redux";
import { RootState } from "../../utils/store";

//Componentes
import ListFilms from "../components/Home/ListPopularFilms";
import ListTrendFilms from "../components/Home/ListWrapFilms";


function Home() {
  const imageHome = useSelector((state: RootState) => state.filmsDiscover)

  function numberRandom(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-screen h-screen">
        <img src={`https://image.tmdb.org/t/p/original${imageHome[numberRandom(0, imageHome.length)]?.backdrop_path}`}
          className="md:w-full w-screen h-screen object-cover object-top fixed z-0 dark:brightness-[0.5] brightness-[1.1] left-0"
        />
      </div>
      <ListFilms/>
      <ListTrendFilms/>
    </div>
  );
}

export default Home;
