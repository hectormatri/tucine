import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

//Hooks
import useVisible from "../../hooks/useVisible";
import useTheme from "../../hooks/useTheme";

//Componentes
import SideBar from "./SideBar";

//Redux
import { useDispatch } from "react-redux";
import { handleMovieFound } from "../../utils/modelSlice";

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


const NavBar = () => {
  const [scroll, setScroll] = useState<boolean>(true);
  const { visible, toogleVisible } = useVisible();
  const { theme, handleToogleTheme } = useTheme();
  const [search, setSearch] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const location = useLocation();
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const handleChangeState = () => {
    toogleVisible();
  };

  const handleChangeTheme = () => {
    handleToogleTheme();
  };

  useEffect(() => {
    if (visible || search) {
      const body = document.getElementsByTagName("body")[0]
      body.classList.add("scroller-blocker")
      document.getElementById("sidebar")?.classList.add("sidebaractive");
    } else {
      const body = document.getElementsByTagName("body")[0]
      body.classList.remove("scroller-blocker")
      document.getElementById("sidebar")?.classList.remove("sidebaractive");
    }
  }, [visible, search]);


  const searchMovie = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    
    if (e.key === "Enter") {
    
    const {data} = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=es&page=1`, options)  
    
    
    if (data.results[0] !== undefined) {
      dispatch(handleMovieFound(data.results))
    }
    
   
    localStorage.setItem("busquedas", query)
    document.getElementById("search")?.blur();
    document.getElementById("searchPC")?.blur();
    setQuery("")

    if(location.pathname === "/found-movies" && data.results[0] !== undefined) {
      window.location.reload();
    } else if (data.results[0] !== undefined) {
      navigation("found-movies")
    } else (
      navigation("movie-notFound")
    )
    
    setSearch(false)
    
  }
  }

  const stateInput = () => {
    setSearch(!search)
    if (query !== "") {
      setQuery("")
    } 
  } 
  

  useEffect(() => {
    addEventListener("scroll", () => {
      const scrollY = window.scrollY;
      if (scrollY === 0) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    });
  }, []);

  return (
    <>
      <div
        className={` ${
          scroll
            ? "bg-slate-50/20 dark:bg-transparent"
            : "bg-white dark:bg-[#111111]"
        }  w-full py-[15px] flex flex-row items-center fixed z-40 transition-all duration-300`}
      >
        <Link onClick={() => scrollTo(0, 0)} to="/" className={`h-[35px] w-full relative ${search ? "right-full" : "right-0"} transition-all duration-300`}>
          <img
            src="/assets/Logo.svg"
            className="h-[35px] w-full grid place-content-center"
          />
        </Link>
        <div className="flex-row items-center relative w-full hidden md:inline-flex">
          <input
            id="searchPC"
            placeholder="Busca tu pelicula"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {searchMovie(e)}}
            className="placeholder:text-black placeholder:dark:text-slate-200 dark:text-slate-200 w-full border-2 rounded-xl border-[#FFB500] py-1.5 outline-none px-3 bg-transparent"
          />
          <i className="iconoir-search absolute right-3 text-lg dark:text-white" />
        </div>
        <div className="flex flex-row items-center gap-2 mx-4 w-full justify-end md:justify-start">
          <i
            onClick={handleToogleTheme}
            className={`iconoir-${
              theme === "dark" ? "sun-light" : "half-moon"
            } text-2xl p-2 hover:bg-slate-50/10 rounded-full dark:text-white hidden md:inline-flex`}
          />
          

            
          <i onClick={() => {stateInput(), document.getElementById("search")?.focus()}} className={`iconoir-${search && query !== "" ? "cancel" : "search"} z-50 dark:text-white text-2xl absolute right-16 md:hidden`}/>         
          <input
            id="search"
            autoFocus
            value={query}
            onBlur={() => setSearch(false)}
            onKeyDown={(e) => searchMovie(e)}
            onChange={(e) => setQuery(e.target.value)}
            className={`absolute h-[45px] w-[calc(100vw-90px)] ${search ? "-translate-x-10" : "translate-x-[calc(100vw+20px)]"} dark:text-white px-5 outline-none border-2 w-[280px] border-[#FFB500] rounded-lg absolutepy-1 bg-transparent dark:bg-[#121212]/30 z-40 transition-all duration-300 md:hidden`}/>  
          
            


          <i
            onClick={() => {
              toogleVisible();
            }}
            className="iconoir-menu text-2xl dark:text-white hover:bg-slate-50/10 p-2 rounded-md"
          />
        </div>
      </div>

      <SideBar
        isVisible={visible}
        handleVisible={handleChangeState}
        handleChangeTheme={handleChangeTheme}
        theme={theme}
      />
    </>
  );
};

export default NavBar;
