import { useEffect } from "react"
import { useSelector } from "react-redux";
import { RootState } from "../../utils/store";

function Info() {
  const movie = useSelector((state: RootState) => state.infoMovie)

  useEffect(() => {
    window.scroll({
        top: 0,
    })
  },[])

  return (
    <div className="flex flex-col items-center ">
      <div className="w-screen h-screen">
        <div className="w-screen h-screen z-0">
          <img
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            className="w-full h-screen object-cover object-top fixed z-0 brightness-[0.5] left-0"
          />
        </div>
        <div className="z-40 flex flex-col absolute w-screen top-24">
         <div className="flex flex-row justify-between px-5">
            {movie.genres?.map((g, index) => {return (<p className="text-white text-sm" key={index}>{g.name}</p>) })}
         </div>   
            <p className="text-white text-2xl text-start w-full px-5">{movie.title}</p>
          <div className="flex flex-row justify-start">
            <p className="text-white text-sm text-start px-5">{movie.adult === false ? "+13" : "+18"}</p>
            <p className="text-white text-sm text-start px-5">{`${movie.release_date}`}</p>
          </div>
          <div className="px-5">
            <img src={`https://image.tmdb.org/t/p/w780${movie.poster_path}`} className="h-[300px] rounded-lg mt-2 shadow-xl"/>
          </div>
        </div>
        
      </div>
      <div className="flex flex-col bg-white dark:bg-[#121212] z-40 w-full md:items-center items-start">
        <p className="text-2xl text-start lg:w-[1500px] w-screen py-3 px-6 md:px-0 dark:text-white">
          
        </p>
      </div>
    </div>
  );
}

export default Info;
