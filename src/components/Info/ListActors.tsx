import { useState, useEffect } from "react";
import { Cast } from "../../../interfaceFilms";
import axios from "axios";
import { useParams, useLocation } from "react-router-dom";

//Componentes
import CardActor from "../CardActor";

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

function ListActors() {
  const [reparto, setReparto] = useState<Cast[]>();
  const location = useLocation();
  const params = useParams();

  const getReparto = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${params.movieId}/credits?language=es`,
      options
    );

    setReparto(data.cast.filter((r: Cast) => (r.character !== "Additional Voices (voice)" || undefined) &&
    r.profile_path !== null));
  };

  useEffect(() => {
    if (location.pathname.split("/", 3)[1] === "movieId") {
      window.scroll({ top: 0, left: 0, behavior: "smooth" });
      getReparto();
    }
  }, [params.movieId]);


  return (
    <div className={`dark:bg-[#121212] ${reparto?.length === 0 ? "hidden" : "inline"} bg-white flex flex-col z-30 w-screen items-center`} >
      <p className="dark:text-white text-2xl my-5 px-5 text-start w-screen 2xl:w-[1500px] 2xl:px-0">
        Reparto
      </p>
      <div className="scrollReparto flex flex-row w-[calc(100vw-40px)] overflow-x-auto pb-5 2xl:w-[1500px]">
        {reparto?.map((r, index) => {
            return <CardActor key={index} repartoCharacter={r} />;
          })}
      </div>
    </div>
  );
}

export default ListActors;
