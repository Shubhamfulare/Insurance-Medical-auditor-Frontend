import React, { ReactNode, useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import URL_MAPPING from "../../routes/constants";

interface AutoLogoutProps {
  children: ReactNode;
}
const AutoLogout: React.FC<AutoLogoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const LOGOUT_EVENT = "user-activity";

  const handleLogout = () => {
  
  };

  const resetTimer = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    const timeoutDuration = process.env.REACT_APP_STAGING_ENV === "staging" ? 59 * 60 * 1000 : 15 * 60 * 1000;
    timeoutRef.current = setTimeout(() => {
      // if (Cookies.get("token")) {
      //   setShowPopup(true);
      //   handleLogout();
      // }
    }, timeoutDuration);
  };

  const broadcastActivity = () => {
    localStorage.setItem(LOGOUT_EVENT, Date.now().toString());
  };


  // const handleUserActivity = () => {
  //   if (showPopup)  return; 
  //   resetTimer();
  // };

  // useEffect(() => {
  //   resetTimer();

  //   window.addEventListener("mousemove", handleUserActivity);
  //   window.addEventListener("keydown", handleUserActivity);
  //   window.addEventListener("click", handleUserActivity);

  //   return () => {
  //     if (timeoutRef.current) clearTimeout(timeoutRef.current);
  //     window.removeEventListener("mousemove", handleUserActivity);
  //     window.removeEventListener("keydown", handleUserActivity);
  //     window.removeEventListener("click", handleUserActivity);
  //   };
  // }, [showPopup]);

  useEffect(() => {
    resetTimer();

    const activityHandler = () => {
      broadcastActivity(); // Broadcast activity to other tabs
      resetTimer();
    };

    const storageListener = (e: StorageEvent) => {
      if (e.key === LOGOUT_EVENT) {
        resetTimer(); // Reset timer in all tabs if activity is detected in one tab
      }
    };

    // Event Listeners
    window.addEventListener("mousemove", activityHandler);
    window.addEventListener("keydown", activityHandler);
    window.addEventListener("storage", storageListener);

    return () => {
      window.removeEventListener("mousemove", activityHandler);
      window.removeEventListener("keydown", activityHandler);
      window.removeEventListener("storage", storageListener);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleOkButtonClick = () => {

    setShowPopup(false);
  };
  return (
    <>
      {children}
      {/* <Popup
        isOpen={showPopup}
        title={t("popup.sessiontimeout")}
        setShowPopup={setShowPopup}
      >
        <p>{t("popup.sessionexpirymessage")}</p>
        <div onClick={handleOkButtonClick} />
      </Popup> */}
    </>
  );
};

export default AutoLogout;