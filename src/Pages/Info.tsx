import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Lottie from "lottie-react";
import axios from "axios";

import useFetch from "../../hooks/useFetch";

//Componentes
import CardActor from "../components/CardActor";
import ListWrapFilms from "../components/Home/ListWrapFilms";
import trailerNotFound from "../../public/lottie/trailerNotFound.json"

//Interfaces
import { Cast } from "../../interfaceFilms";
import { Result } from "../../interfaceFilms";

function Info() {
  const [watchVideo, setWatchVideo] = useState<boolean>(false);
  const [trailer, setTrailer] = useState<string>("");
  const [reparto, setReparto] = useState<Cast[]>();
  const { fetchEndPoint, films } = useFetch();
  const [similar, setSimilar] = useState<Result[]>();
  const params = useParams();

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



  const videoStopper = (id: string) => {
    const containerElement = document.getElementById(id);
    const iframe_tag = containerElement?.querySelector("iframe");
    const video_tag = containerElement?.querySelector("video");
    if (iframe_tag) {
      const iframeSrc = iframe_tag.src;
      iframe_tag.src = iframeSrc;
    }
    if (video_tag) {
      video_tag.pause();
    }
  };

  const getTrailer = async () => {
    if (params.movieId) {
      const fetchTrailerES = await axios.get(
        `https://api.themoviedb.org/3/movie/${params.movieId}/videos?language=es`,
        options
      );

      if (fetchTrailerES.data.results[0] !== undefined) {
        setTrailer(
          `https://www.youtube-nocookie.com/embed/${fetchTrailerES.data.results[0].key}`
        );
      } else {
          const fetchTrailerEN = await axios.get(
            `https://api.themoviedb.org/3/movie/${params.movieId}/videos?language=en-US`,
            options
          )
          if (fetchTrailerEN.data.results[0] !== undefined) {
            setTrailer(
              `https://www.youtube-nocookie.com/embed/${fetchTrailerEN.data.results[0].key}`
            );
          } else {
            setTrailer("")
          }
      }
    }
  };

  console.log(films?.overview === "")

  const getSimilar = async () => {
    const {data} = await axios.get(`https://api.themoviedb.org/3/movie/${params.movieId}/similar?language=es`, options)
    setSimilar(data.results)
  }

  const getReparto = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${params.movieId}/credits?language=es`,
      options
    );
    setReparto(data.cast);
  };

  useEffect(() => {  
    window.scroll({
      top: 0,
      left: 0,
    });
    fetchEndPoint(`movie/${params.movieId}?language=es`);
    getReparto();
    getSimilar();
  }, []);


  useEffect(() => {
    if (watchVideo) {
      document.getElementById("sidebar")?.classList.add("sidebaractive");
    } else {
      document
        .getElementById("sidebar")
        ?.classList.remove("sidebaractive");
    }
  }, [watchVideo]);

  return (
    <div className={`flex flex-col items-center`}>
      <div className="w-screen h-screen dark:bg-black bg-white">
        <div className="w-screen h-screen z-0">
          <img
            loading="eager"
            src={
              films?.backdrop_path !== undefined
                ? `https://image.tmdb.org/t/p/original${films?.backdrop_path}`
                : ""
            }
            className="w-full h-screen object-cover object-top fixed z-0 brightness-[0.4] left-0"
            alt=""
          />
        </div>
        <div className="flex flex-col absolute w-screen top-24">
          <p className="text-white text-2xl text-start w-full px-5">
            {films?.title}
          </p>
          <div className="flex flex-row justify-start gap-4 self px-5">
            <p className="text-white text-sm text-start">
              {films?.adult === false ? "+13" : "+18"}
            </p>
            <p className="text-white text-sm text-start">{`${films?.release_date}`}</p>
          </div>
          <div className="flex flex-row mt-2 justify-between px-5">
            <p className="text-white text-sm bg-slate-700/40 px-3 py-1 rounded-md w-fit">
              {films?.vote_count} votos
            </p>
            <p className="text-white text-sm bg-slate-700/40 px-3 py-1 rounded-md w-fit">
              Valoracion {Math.round(Number(films?.vote_average))}
            </p>
            <button
              onClick={() => {
                setWatchVideo(!watchVideo),
                  getTrailer(),
                  videoStopper("stopvideo");
              }}
              className="text-white text-sm bg-slate-700/40 px-3 py-1 rounded-md w-fit"
            >
              Ver trailer
            </button>
          </div>
          <p className="text-white px-5 my-4">Sinopsis</p>
          <p  className="text-white px-5 text-sm break-normal text-justify text-ellipsis h-[260px] overflow-y-scroll">
            {films?.overview}
          </p>
          <div
            className={`flex flex-wrap gap-x-4 mb-2 my-9 bg-slate-700/40 mx-5 w-fit px-5 py-1.5 rounded-lg`}
          >
            {films?.genres.map((g, index) => {
              return (
                <p className="text-white text-sm" key={index}>
                  {g.name}
                </p>
              );
            })}
          </div>

          <div
            className={`fixed w-full h-[350px] flex flex-row z-40 top-[55%] transition-all duration-300 ${
              watchVideo ? "right-0" : "-right-full"
            }`}
          >
            <div
              onClick={() => {
                setWatchVideo(!watchVideo), videoStopper("stopvideo");
              }}
              className="bg-slate-900/60 fixed w-screen top-0 h-screen z-40"
            />
            <div
              id="stopvideo"
              className={`absolute w-[calc(100vw-40px)] right-5 -top-[200px] overflow-hidden rounded-3xl z-40`}
            >
              { trailer !== "" ? 
                <iframe
                  allowFullScreen
                  referrerPolicy="unsafe-url"
                  className="w-full h-[300px]"
                  src={trailer}
                /> : 
                  <div className="h-[300px] grid place-content-center bg-zinc-900/90">
                    <Lottie loop animationData={trailerNotFound}/>
                  </div>
               
                
              }
            </div>
          </div>



        </div>
      </div>

      <div className="dark:bg-[#121212] bg-white flex flex-col z-30 w-screen">
        <p className="dark:text-white text-2xl my-5 px-5">Reparto</p>
        <div className="flex flex-row justify-between pe-5 w-screen overflow-x-scroll pb-5">
          {reparto
            ?.filter(
              (r) =>
                (r.character !== "Additional Voices (voice)" || undefined) &&
                r.profile_path !== null
            )
            .map((r, index) => {
              return <CardActor key={index} repartoCharacter={r} />;
            })}
        </div>
      </div>
      <div  className="dark:bg-[#121212] bg-white flex flex-col z-30 w-screen pb-6">
        <ListWrapFilms titleWrap="Similares" similar={similar}/>
      </div>
    </div>
  );
}

export default Info;
