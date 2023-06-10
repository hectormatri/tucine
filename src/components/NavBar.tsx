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
      document.getElementById("sidebar")?.classList.add("sidebaractive");
    } else {
      document.getElementById("sidebar")?.classList.remove("sidebaractive");
    }
  }, [visible, search]);


  const searchMovie = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    
    if (e.key === "Enter") {
    
    const {data} = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=es&page=1`, options)  
    if (data.results[0] === undefined) {
      dispatch(handleMovieFound(data.results))
    }
    
   
    localStorage.setItem("busquedas", query)
    setQuery("")

    if(location.pathname === "/found-movies") {
      window.location.reload();
    } else {
      navigation("found-movies")
    }
    
    setSearch(false)
    const field = document.createElement('input');
    field.setAttribute('type', 'text');
    document.body.appendChild(field);

    setTimeout(function() {
        field.focus();
        setTimeout(function() {
            field.setAttribute('style', 'display:none;');
        }, 50);
    }, 50);
    
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
        <Link to="/" className={`h-[35px] w-full relative ${search ? "right-full" : "right-0"} transition-all duration-300`}>
          <img
            src="/assets/Logo.svg"
            className="h-[35px] w-full grid place-content-center"
          />
        </Link>
        <div className="flex-row items-center relative w-full hidden md:inline-flex">
          <input
            placeholder="Busca tu pelicula"
            className="placeholder:text-black placeholder:dark:text-slate-200 dark:text-slate-200 w-full border-2 rounded-xl border-[#FFB500] py-1.5 outline-none px-3 bg-transparent"
          />
          <i className="iconoir-search absolute right-3 text-lg dark:text-white" />
        </div>
        <div className="flex flex-row items-center gap-2 mx-4 w-full justify-end md:justify-start">
          <div className="flex-row gap-1 hover:bg-slate-50/10 px-2 py-1 rounded-md hidden md:inline-flex">
            <i className="iconoir-translate text-2xl dark:text-white" />
            <p className="font-bold dark:text-white">ES</p>
          </div>
          <i
            onClick={handleToogleTheme}
            className={`iconoir-${
              theme === "dark" ? "sun-light" : "half-moon"
            } text-2xl p-2 hover:bg-slate-50/10 rounded-full dark:text-white hidden md:inline-flex`}
          />
          <button className="bg-[#FFB500] px-3 py-1 rounded-lg font-bold w-32 hidden md:inline-flex">
            Iniciar sesion
          </button>

            
          <i onClick={() => {stateInput(), document.getElementById('search')?.focus()}} className={`iconoir-${search ? "cancel" : "search"} z-50 dark:text-white text-2xl absolute right-16`}/>
          <input
            id="search"
            autoFocus
            value={query}
            onKeyDown={(e) => searchMovie(e)}
            onChange={(e) => setQuery(e.target.value)}
            className={`absolute h-[45px] w-[calc(100vw-90px)] ${search ? "-translate-x-10" : "translate-x-[calc(100vw+20px)]"} dark:text-white px-5 outline-none border-2 w-[280px] border-[#FFB500] rounded-lg absolutepy-1 bg-[#121212]/30 z-40 transition-all duration-300`}/>  
          
            


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
