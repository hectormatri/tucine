import { Result } from "../../../interfaceFilms"
import CardFilmWrap from "../CardFilmWrap"

interface Props {
  similar: Result[] | undefined
  titleWrap: string
}

function ListWrapFilms({similar, titleWrap}: Props) {
  
  return (

    <div className="flex flex-col px-5 dark:bg-[#121212] bg-white relative pb-7">
      <p className={`dark:text-white text-2xl ${titleWrap === "" ? "my-0" : "my-4"}`}>{titleWrap}</p>
      <div  className="flex flex-wrap justify-between">
          {
            similar?.filter((f) => (f.poster_path !== null) && (f.backdrop_path !== null) && (f.overview !== "")).map((s, index) => {
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
  )
}

export default ListWrapFilms