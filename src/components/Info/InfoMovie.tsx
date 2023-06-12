import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";

import useFetch from "../../../hooks/useFetch";

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

function InfoMovie() {
  const [watchVideo, setWatchVideo] = useState<boolean>(false);
  const [trailer, setTrailer] = useState<string>("");
  const [loadTrailer, setLoadTrailer] = useState<boolean>(false);
  const params = useParams();
  const location = useLocation();
  const { fetchEndPoint, films } = useFetch();

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
        );
        if (fetchTrailerEN.data.results[0] !== undefined) {
          setTrailer(
            `https://www.youtube-nocookie.com/embed/${fetchTrailerEN.data.results[0].key}`
          );
        } else {
          setTrailer("");
        }
      }
    }
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

  useEffect(() => {
    if (watchVideo) {
      document.getElementById("sidebar")?.classList.add("sidebaractive");
      setTimeout(() => setLoadTrailer(true), 1000);
    } else {
      document.getElementById("sidebar")?.classList.remove("sidebaractive");
      setTimeout(() => setTrailer(""), 300);
      setLoadTrailer(false);
    }
  }, [watchVideo]);

  useEffect(() => {
    if (location.pathname.split("/", 3)[1] === "movieId") {
      window.scroll({top: 0, left: 0, behavior: "smooth"});
      fetchEndPoint(`movie/${params.movieId}?language=es`);
    }
  },[params.movieId])



  return (
    <>
      <div className="w-screen h-screen z-0 dark:bg-[#121212] bg-white">
        <img
          loading="eager"
          src={films?.backdrop_path ? `https://image.tmdb.org/t/p/original${films?.backdrop_path}` : ""}
          className="w-full h-screen object-cover object-top fixed z-0 brightness-[0.4] left-0"
          alt=""
        />
      </div>
      <div className="flex flex-col absolute w-screen top-24 lg:w-[1024px] lg:py-24 lg:px-24">
        <p className="text-white text-2xl text-start w-full px-5">
          {films?.title}
        </p>
        <div className="flex flex-row justify-start gap-4 self px-5">
          <p className="text-white text-sm text-start">
            {films?.adult === false ? "+13" : "+18"}
          </p>
          <p className="text-white text-sm text-start">{`${films?.release_date}`}</p>
        </div>
        <div className="flex flex-row mt-2 justify-between px-5 md:justify-start md:gap-5">
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
        <div className="flex md:flex-row flex-col">
          <div className="flex flex-col">
            <p className="text-white ps-5 my-4">Sinopsis</p>
            <p className="text-white px-5 text-sm break-normal text-justify text-ellipsis h-[260px] lg:overflow-y-hidden overflow-y-scroll">
              {films?.overview}
            </p>
          </div>

          <div className={`flex flex-col md:pe-5 px-5`}>
            <p className="text-white my-4 text-start">Categorías</p>
            <div className="flex flex-wrap md:w-[200px] w-fit gap-3 bg-slate-700/40 rounded-lg p-2">
              {films?.genres.map((g, index) => {
                return (
                  <p className="text-white text-sm" key={index}>
                    {g.name}
                  </p>
                );
              })}
            </div>
          </div>
        </div>
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
          className={`absolute w-[calc(100vw-40px)] md:w-[calc(50%)] md:right-[calc(50vw-400px)] right-5 -top-[200px] overflow-hidden rounded-3xl z-40`}
        >
          {trailer !== "" ? (
            <iframe
              allowFullScreen
              referrerPolicy="unsafe-url"
              className="w-full h-[300px] lg:h-[400px]"
              src={trailer}
            />
          ) : loadTrailer ? (
            <div className="h-[300px] lg:h-[400px] bg-zinc-900/90 grid place-content-center px-5">
              <p className="text-3xl leading-10 text-[#FFB500]">
                Lo sentimos no hemos encontrado ningun trailer
              </p>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}

export default InfoMovie;
