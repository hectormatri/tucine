import { useEffect, useState } from "react";
import { Link } from "react-router-dom"

//Hooks
import useVisible from "../../hooks/useVisible";
import useTheme from "../../hooks/useTheme";

//Componentes
import SideBar from "./SideBar";

interface Props {
  getFixed: (state: boolean) => void
}

const NavBar = ({getFixed} : Props) => {

  const [scroll, setScroll] = useState<boolean>(true);
  const { visible, toogleVisible } = useVisible();
  const { theme, handleToogleTheme } = useTheme();

  const handleChangeState = () => {
    toogleVisible();
  };

  const handleChangeTheme = () => {
    handleToogleTheme();
  };

  useEffect(() => {
    getFixed(visible)
  },[visible])

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
        }  w-full py-[15px] flex flex-row items-center fixed z-50 transition-all duration-300`}
      >
        <Link to="/" className="h-[35px] w-full">
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
          <i
            onClick={() => {toogleVisible()}}
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
