import { Result } from "../../../interfaceFilms"
import CardFilmWrap from "../CardFilmWrap"

interface Props {
  similar: Result[] | undefined
}

function ListWrapFilms({similar}: Props) {
  
  return (
    <div  className="flex flex-wrap justify-between px-5">
        
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
  )
}

export default ListWrapFilms