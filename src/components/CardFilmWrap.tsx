import { Link } from "react-router-dom"

interface Film {
    title: string
    path: string
    date: Date
    valoration: number
    id: number
  
  }

function CardFilmWrap({ title, path, date, valoration, id }: Film) {
    const reload = () => {
        setTimeout(() => window.location.reload(), 200)
    }

    return (
        <Link onClick={reload} to={`/movieId/${id}`} className="dark:bg-zinc-900 bg-zinc-50 justify-between w-[47%] mt-4 md:hover:bg-white/5 relative flex flex-col items-center rounded-xl md:hover:scale-105 transition-all duration-300 ">
          <div className="absolute bg-white/60 w-7 h-7 p-1 rounded-full right-3 top-3">
            <p className="text-center font-bold text-sm ">{valoration?.toFixed(1)}</p>
          </div>
          <div>
            <img src={path} className="rounded-t-xl" />
            <p className="dark:text-white dark:font-normal text-center text-sm md:text-base my-1 px-1">{title}</p>
          </div>
          <div className="">
            <p className="text-center text-sm md:text-base text-[#FFB500] font-bold dark:font-normal my-2">{`${date}`}</p>
          </div>
        </Link>
      );

}

export default CardFilmWrap