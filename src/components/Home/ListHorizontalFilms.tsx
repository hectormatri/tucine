//Componentes
import CardFilmHorizontal from "../CardFilmHorizontal";

//Interace
import { filmsDiscoverInterface } from "../../../interfaceFilms";

interface Props {
  films: filmsDiscoverInterface[] | undefined
  titleList: string
}


function ListHorizontalFilms({films, titleList}: Props) {
  
  return (
    <div className="scrollingX flex flex-col bg-white dark:bg-[#121212] md:w-full items-center z-30 pt-[25px] transition-all duration-300">
      <div className="w-[calc(100vw-40px)] px-1 2xl:w-[1500px]">
        <p className="text-3xl text-start w-screen dark:text-white ">{titleList}</p>
        <div
          id="overflowVisible"
          className="flex flex-row gap-4 overflow-hidden py-6 mb-4"
        >
          {films?.map((f, index: number) => {
            return (
              <CardFilmHorizontal
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
    </div>
  );
}

export default ListHorizontalFilms;
