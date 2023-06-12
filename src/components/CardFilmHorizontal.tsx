import { Link } from "react-router-dom"

 
interface Film {
  title: string
  path: string
  date: Date
  valoration: number
  id: number

}

function CardFilmHorizontal({ title, path, date, valoration, id }: Film) {
   

  
  return (
    <Link to={`/movieId/${id}`} className=" lg:hover:bg-white/5 relative flex flex-col justify-between items-center h-[455px] w-[233.33px] rounded-xl lg:hover:scale-105 transition-all duration-300 ">
      <div className="absolute bg-white/60 w-7 h-7 p-1 rounded-full right-3 top-3">
        <p className="text-center font-bold text-sm ">{valoration.toFixed(1)}</p>
      </div>
      <div>
        <img loading="lazy" src={path} className="h-[350px] rounded-t-xl" />
        <p className="mt-3 text-center font-bold dark:text-white dark:font-normal px-1">{title}</p>
      </div>
      <div className="w-[233.33px] px-[50px] mb-3">
        
        <p className="text-center text-[#FFB500] font-bold dark:font-normal">
          {`${date.toString().split('-', 3)[2]}-${date.toString().split('-', 3)[1]}-${date.toString().split('-', 3)[0]}`}
        </p>
      </div>
    </Link>
  );
}

export default CardFilmHorizontal;
