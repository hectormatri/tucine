interface Film {
  title: string;
  path: string;
  date: Date;
  valoration: number;
}

function CardFilm({ title, path, date, valoration }: Film) {
  return (
    <div className=" hover:bg-white/5 relative flex flex-col justify-between items-center h-[455px] w-[233.33px] rounded-xl hover:scale-105 transition-all duration-300 ">
      <div className="absolute bg-white/60 w-7 h-7 p-1 rounded-full right-3 top-3">
        <p className="text-center font-bold text-sm ">{valoration}</p>
      </div>
      <div>
        <img src={path} className="h-[350px] rounded-t-xl" />
        <p className="mt-3 text-center font-bold dark:text-white dark:font-normal px-1">{title}</p>
      </div>
      <div className="w-[233.33px] px-[50px] mb-3">
        
        <p className="text-center text-[#FFB500] font-bold dark:font-normal">{`${date}`}</p>
      </div>
    </div>
  );
}

export default CardFilm;
