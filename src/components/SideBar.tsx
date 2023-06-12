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
      className={`flex fixed flex-row h-full w-full justify-between top-0 transition-all duration-300 z-50  ${
        isVisible ? "-right-0" : "-right-full"
      }`}
    >
      <div
        onClick={() => handleVisible(!isVisible)}
        className="h-full md:w-full w-screen bg-slate-200/70 dark:brightness-0"
      />
      <div className="bg-white md:w-[300px] w-[800px] h-full justify-between right-0 flex flex-col p-8 dark:bg-[#111111]">
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
      </div>
    </div>
  );
}

export default SideBar;
