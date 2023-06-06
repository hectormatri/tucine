import { useState, useEffect } from "react"

function useTheme() {

  const [theme, setTheme] = useState<string>();

  useEffect(() => {
    if (localStorage.getItem("theme") == "dark") {
        document.documentElement.classList.add("dark");
        setTheme("dark")
    } else {
        document.documentElement.classList.remove("dark");
        setTheme("light")
    }
  },[])

  const handleToogleTheme = () => {
    if (localStorage.getItem("theme") == "dark") {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
        setTheme("light")
    } else {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
        setTheme("dark");
    }
  }  

  return { theme, handleToogleTheme};
}

export default useTheme