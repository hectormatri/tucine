import { Cast } from "../../interfaceFilms"

interface Props {
  repartoCharacter: Cast
}

function CardActor({repartoCharacter}: Props) {
  
  return (
    <div className="flex flex-col items-center w-[150px] mr-5">
      <img loading="lazy" src={`https://image.tmdb.org/t/p/w154${repartoCharacter.profile_path}`} className="rounded-xl"/>
      <p className="dark:text-white text-sm mt-2 w-[130px] text-center line-clamp-2">{repartoCharacter.character}</p>
    </div>
  )
}

export default CardActor