import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../utils/store";

import useFetch from "../../hooks/useFetch";

function Info() {
  const movie = useSelector((state: RootState) => state.infoMovie);
  const [watchVideo, setWatchVideo] = useState<boolean>(false);
  const { fetchEndPoint } = useFetch();

  useEffect(() => {
    window.scroll({
      top: 0,
    });
    if (Object.keys(movie).length === 0) {
        fetchEndPoint(`movie/${localStorage?.getItem("idFilm")}?language=es`)
    }
  }, []);

  return (
    <div className="flex flex-col items-center ">
      <div className="w-screen h-screen">
        <div className="w-screen h-screen z-0">
          <img
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            className="w-full h-screen object-cover object-top fixed z-0 brightness-[0.4] left-0"
          />
        </div>
        <div className="z-40 flex flex-col absolute w-screen top-24">
          <div className={`flex flex-row ${movie.genres?.length <= 2 ? "justify-start gap-4" : "justify-between"} px-5`}>
            {movie.genres?.map((g, index) => {
              return (
                <p className="text-white text-sm" key={index}>
                  {g.name}
                </p>
              );
            })}
          </div>
          <p className="text-white text-2xl text-start w-full px-5">
            {movie.title}
          </p>
          <div className="flex flex-row justify-start gap-4 self px-5">
            <p className="text-white text-sm text-start">
              {movie.adult === false ? "+13" : "+18"}
            </p>
            <p className="text-white text-sm text-start">{`${movie.release_date}`}</p>
          </div>
          <div className="flex flex-row mt-2 justify-between px-5">
            <p className="text-white text-sm bg-slate-700/40 px-3 py-1 rounded-md w-fit">
              {movie.vote_count} votos
            </p>
            <p className="text-white text-sm bg-slate-700/40 px-3 py-1 rounded-md w-fit">
              Valoracion {Math.round(movie.vote_average)}
            </p>
            <button onClick={() => setWatchVideo(!watchVideo)} className="text-white text-sm bg-slate-700/40 px-3 py-1 rounded-md w-fit">
              Ver trailer
            </button>
          </div>
          <p className="text-white px-5 my-4">Sinopsis</p>
          <p className="text-white px-5 text-sm">{movie.overview}</p>
          <div className="relative w-full h-[350px]">
            <div className={`fixed w-full top-[220px] ${watchVideo ? "-right-0" : "-right-full"} transition-all duration-300`}>
                <iframe
                    id="popover-click"
                    allowFullScreen
                    className="w-full h-[300px]"
                    src={`https://www.youtube.com/embed/L0anWmmd8TI?autoplay=1&showinfo=0&controls=1`}
                />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col bg-white dark:bg-[#121212] z-40 w-full md:items-center items-start">
        <p className="text-2xl text-start lg:w-[1500px] w-screen py-3 px-6 md:px-0 dark:text-white"></p>
      </div>
    </div>
  );
}

export default Info;
