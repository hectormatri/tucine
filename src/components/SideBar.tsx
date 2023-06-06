import { Link } from "react-router-dom";

interface Props {
  isVisible: boolean;
  handleVisible: (state: boolean) => void;
  theme: string | undefined;
  handleChangeTheme: () => void;
}

function SideBar({
  isVisible,
  handleVisible,
  theme,
  handleChangeTheme,
}: Props) {
  return (
    <div
      className={`flex fixed flex-row h-full md:w-full w-screen top-0 transition-all duration-300 z-50  ${
        isVisible ? "-right-0" : "-right-full"
      }`}
    >
      <div
        onClick={() => handleVisible(!isVisible)}
        className=" h-full md:w-full w-screen bg-slate-200/70 dark:brightness-0"
      />
      <div className="bg-white absolute w-[300px] h-full justify-between right-0 flex flex-col p-8 dark:bg-[#111111]">
        <div className="gap-5 flex flex-col">
          <h1 className="font-bold text-center text-2xl dark:text-white">
            MENÚ
          </h1>
          <Link
            to="/"
            onClick={() => handleVisible(!isVisible)}
            className="flex flex-row items-center gap-3 bg-white dark:bg-[#1e1d1d] dark:border-[#252424] border shadow-md rounded-md px-4 py-1 hover:scale-105 transition-transform duration-300"
          >
            <i className="iconoir-home text-lg dark:text-white" />
            <p className="text-lg dark:text-white">Home</p>
          </Link>
          <Link
            to="/explore-films"
            onClick={() => handleVisible(!isVisible)}
            className="flex flex-row items-center gap-3 bg-white dark:bg-[#1e1d1d] dark:border-[#252424] border shadow-md rounded-md px-4 py-1 hover:scale-105 transition-transform duration-300"
          >
            <i className="iconoir-safari text-lg dark:text-white" />
            <p className="text-lg dark:text-white">Explore</p>
          </Link>
          <button
            onClick={() => handleChangeTheme()}
            className="flex flex-row items-center gap-3 bg-white dark:bg-[#1e1d1d] dark:border-[#252424] border shadow-md rounded-md px-4 py-1 hover:scale-105 transition-transform duration-300"
          >
            <i
              className={`iconoir-${
                theme === "light" ? "half-moon" : "sun-light"
              } text-lg dark:text-white`}
            />
            <p className="text-lg dark:text-white">
              Cambiar a {theme === "light" ? "ocuro" : "claro"}
            </p>
          </button>
        </div>
        <div className="flex flex-col md:hidden">
          <div className="flex flex-row gap-1 hover:bg-slate-50/10 px-2 py-1 rounded-md">
            <i className="iconoir-translate text-2xl dark:text-white" />
            <p className="font-bold dark:text-white">ES</p>
          </div>
          <button className="bg-[#FFB500] px-3 py-1 rounded-lg font-bold w-32">
            Iniciar sesion
          </button>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
