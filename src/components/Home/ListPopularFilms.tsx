import { useSelector } from "react-redux";
import { RootState } from "../../../utils/store";

//Componentes
import CardFilm from "../CardFilm";


function ListFilms() {
  const filmsDiscover = useSelector((state: RootState) => state.filmsDiscover);

  return (
    <div className="scrollingX flex flex-col bg-white dark:bg-[#121212] md:w-full items-center z-30 pt-[25px] transition-all duration-300">
      <p className="text-3xl text-start lg:w-[1500px] w-screen px-6 md:px-0 dark:text-white">Los más popular</p>
      <div
        id="overflowVisible"
        className="flex flex-row gap-4 w-[calc(100vw-40px)] px-1 lg:w-[1500px] overflow-hidden py-6"
      >
        {filmsDiscover.map((f, index: number) => {
          return (
            <CardFilm
              key={index}
              title={f.title}
              path={`https://image.tmdb.org/t/p/w780${f.poster_path}`}
              date={f.release_date}
              valoration={f.vote_average}
              id={f.id}
            />
          );
        })}
      </div>
    </div>
  );
}

export default ListFilms;
