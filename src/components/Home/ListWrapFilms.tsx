import { Result } from "../../../interfaceFilms"
import CardFilmWrap from "../CardFilmWrap"

interface Props {
  films: Result[] | undefined
  titleWrap: string
}

function ListWrapFilms({films, titleWrap}: Props) {
  
  return (

    <div className="flex flex-col px-5 dark:bg-[#121212] bg-white relative pb-7 items-center">
      <div className="w-[calc(100vw-40px)] 2xl:w-[1500px]">
        <p className={`dark:text-white text-3xl ${titleWrap === "" ? "my-0" : "my-4"}`}>{titleWrap}</p>
        <div  className="flex flex-wrap justify-between">
            {
              films?.filter((f) => 
                (f.poster_path !== null && f.poster_path !== "") && 
                (f.backdrop_path !== null && f.backdrop_path !== "") && 
                (f.overview !== "" && f.overview !== null)).map((s, index) => {
                return (
                  <CardFilmWrap 
                    key={index}
                    date={s.release_date}
                    id={s.id}
                    path={`https://image.tmdb.org/t/p/w780${s.poster_path}`}
                    title={s.title}
                    valoration={s.vote_average}
                  />
                )
              })
            }
        </div>
      </div>
    </div>
  )
}

export default ListWrapFilms