import { useState } from "react";

function usePlatform() {
  const [platform, setPlatform] = useState<string>("");

  const getMobileOperatingSystem = () => {
    const userAgent = navigator.userAgent;

    // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent)) {
      setPlatform("Windows Phone");
      return
    }

    if (/android/i.test(userAgent)) {
      setPlatform("Android");
      return
    }

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent)) {
      setPlatform("iOS");
      return
    }

    setPlatform("unknown");
  };

  return { platform, getMobileOperatingSystem };
}

export default usePlatform;
