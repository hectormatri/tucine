import {useSelector} from 'react-redux'
import { RootState } from '../../utils/store'

function MovieNotFound() {
  const img = useSelector((state: RootState) => state.filmsDiscover)
  function numberRandom(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

  return (
    <div className='h-screen'>
      <p className='absolute text-white z-10 top-1/4 text-xl px-5 bg-zinc-900/70 rounded-lg py-2 mx-5'>Lo sentimos, no se ha encontrado ningún resultado para su búsqueda.</p>
      <img src={`https://image.tmdb.org/t/p/original${img[numberRandom(0, img.length)]?.backdrop_path}`}
      className='object-cover h-screen brightness-[20%]'
      />
    </div>
  )
}

export default MovieNotFound