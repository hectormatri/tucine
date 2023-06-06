import { useState } from "react";

function useVisible() {
  const [visible, setVisible] = useState<boolean>(false);

  const toogleVisible = () => {
    setVisible(!visible)
  }

  return {visible, toogleVisible}  
}

export default useVisible;
