import React, { useState, useEffect } from "react";
import logo from "../../assets/aventior-logo.svg";
import Humberger from "../../assets/humberger.svg";
import { useNavigate } from "react-router-dom";
import URL_MAPPING from "../../routes/constants";
// import { useNotifications } from "../notification";
import Close from "../../assets/cross.svg";
import { useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";

interface HeaderProps {
  openClose?: any;
  hide?: boolean;
}

const Header: React.FC<HeaderProps> = ({ openClose, hide }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [isRTL, setIsRTL] = useState(false);
  // const {
  //   notifications,
  //   approveNotification,
  //   hasNewNotifications,
  //   setHasNewNotifications,
  //   notif,
  //   setNotif,
  //   count,
  //   DisconnectingSseEvent,
  // } = useNotifications();
  const location = useLocation();

  const handleToggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleLogout = () => {
    // logout();
    Cookies.remove("token");
    Cookies.remove("refresh_token");
    localStorage.clear();
  };

  const dir = document.documentElement.getAttribute("dir");
  useEffect(() => {
    let isRtl = false;
    isRtl = dir === "rtl";
    setIsRTL(isRtl);
  }, [dir]);

  const [showDropdown, setShowDropdown] = useState(false);

  const handleClick = () => {
    // Toggle the dropdown visibility
    // setShowDropdown(!showDropdown);
    // if (showDropdown) {
    // }
    // setHasNewNotifications(false);
    navigate("/notifications");
  };

  // const handleApprove = async (id: number) => {
  //   await approveRequest(id, {
  //     action: "APPROVE",
  //   })
  //     .then((res) => {
  //       approveNotification(id);
  //       toast.success("Approved");
  //       if (notifications.length > 0) {
  //         setShowDropdown(false);
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       approveNotification(id);
  //       toast.error("Approval request is expired");
  //     });
  // };
  // const handleReject = async (id: number) => {
  //   await approveRequest(id, {
  //     action: "REJECT",
  //   })
  //     .then((res) => {
  //       approveNotification(id);
  //       toast.success("Rejected");
  //       if (notifications.length > 0) {
  //         setShowDropdown(false);
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       approveNotification(id);
  //       toast.error("Request is expired");
  //     });
  // };

  const handleUserMapToRoute = (roles: string[]): void => {
    if (!Array.isArray(roles)) return;

    if (
      roles.includes("NWC_Admin") ||
      roles.includes("NWC_Inventory") ||
      roles.includes("NWC_LH_Driver")
    ) {
      navigate(URL_MAPPING.INVENTORY);
    } else if (roles.includes("NWC_Finance")) {
      navigate(URL_MAPPING.FINANCE);
    } else if (roles.includes("NWC_Address")) {
      navigate(URL_MAPPING.MANAGEADDR);
    } else if (
      roles.includes("NWC_C_Order") ||
      roles.includes("NWC_U_Order") ||
      roles.includes("NWC_D_Order")
    ) {
      navigate(URL_MAPPING.CREATEORDER);
    } else if (roles.includes("NWC_R_Order")) {
      navigate(URL_MAPPING.ORDERHISTORY);
    }
  };

 const  handleLogoRoute=()=>{
  const storedRoles = JSON.parse(
    localStorage.getItem("nwc_role") || "[]"
  );
  }

  return (
    <>
      <Toaster />

      <div className="flex justify-between items-center py-4 bg-white border-b-2 h-[48px] realtive">
        {/* {notif && (
          <div
            className={`${
              location.pathname === "/home"
                ? "w-full ml-0"
                : "ml-14 w-[calc(100vw-60px)]"
            } absolute  top-12 font-bold flex z-50 items-center text-13 p-1 text-[#FF4D68] justify-center bg-culightred`}
          >
            <div
              onClick={() => navigate(URL_MAPPING.NOTIFICATIONS)}
              className="cursor-pointer w-full flex items-center justify-center"
            >
              <p>You have {count} pending request</p>
            </div>
            <button
              className=" absolute right-10"
              onClick={() => setNotif(false)}
            >
              <img src={Close} alt="close"/>
            </button>
          </div>
        )} */}
        <div className="flex items-center  gap-4">
          <img
            src={logo}
            alt="Logo"
            className="h-8 hidden md:block cursor-pointer pl-6"
            onClick={() =>handleLogoRoute()}
        
          />
            {/* { getUserInfo()?.role ==="NWC_Admin" && <img
            src={nwc}
            alt="Logo"
            className="h-10 hidden md:block cursor-pointer pl-0"
            onClick={() => handleLogoRoute()}
            />} */}
          <img
            src={Humberger}
            alt="Logo"
            className={`cursor-pointer h-8 md:hidden p-1 px-4 ${
              hide ? "hidden" : ""
            }`}
            onClick={() => openClose()}
          />
        </div>
        <div className="flex relatvie items-center gap-4  px-4">
        

          <div>
            <div className="flex align-center">
                {/* {(getUserInfo()?.role !== "NWC" && getUserInfo()?.allow_notification ) && (
                <button className="relative" onClick={handleClick}>
                
                  <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405C18.21 14.79 18 13.45 18 12V8a6 6 0 00-9.33-5.223M5 8v4c0 1.45-.21 2.79-.595 4.395L3 17h5m6 0a3 3 0 11-6 0"
                  />
                  </svg>
                </button>
                )} */}

              {/* Notification dropdown */}
              {showDropdown && (
                <div className="absolute w-full md:w-[600px] h-auto max-h-[calc(100vh-50px)] overflow-auto right-0  mt-2 w-48 bg-white  shadow-lg border border-gray-200 z-[999]">
                  {/* {notifications?.length ? (
                    notifications
                      ?.slice()
                      .reverse()
                      .map((notification: any) => {
                        return (
                          <div
                            key={notification?.id}
                            className="px-4 py-4 text-gray-700 hover:bg-gray-100 border-t-2 flex flex-col gap-2"
                          >
                            <div className="flex justify-between">
                              <div>
                               
                              </div>
                            </div>
                            <div className="flex justify-between">
                              <div>
                                You have a new check-in request awaiting review.
                              </div>
                              <div className="flex justify-between">
                                <button
                                  onClick={() => handleReject(notification?.id)}
                                  className="bg-[#FF4D68] py-1 rounded px-6 text-black"
                                >
                                  Reject
                                </button>
                                <button
                                  onClick={() =>
                                    handleApprove(notification?.id)
                                  }
                                  className="bg-[#00C48C] py-1 rounded px-6 text-black"
                                >
                                  Accept
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })
                  ) : (
                    <div className="px-4 py-2 text-gray-700 flex items-center justify-center">
                      No new notifications
                    </div>
                  )} */}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4 pr-4 ">
            <span className="hidden sm:inline-block font-semibold border-x-2 px-3">
              {/* {currentLang() === "Arabic"
                ? getUserInfo()?.name_arabic
                : getUserInfo()?.name_eng} */}
            </span>
            <div
              className="h-8 w-8 sm:h-10 sm:w-10 border-2  rounded-full object-cover cursor-pointer bg-cyan flex items-center justify-center font-bold text-l"
              onClick={handleToggleDropdown}
            >
              {/* {getUserInfo()?.name_eng?.charAt(0)} */}
            </div>
          </div>
          {isOpen && (
            <div
              className={`absolute  ${
                isRTL ? "left-0" : "right-0"
              }  mt-24 w-36 bg-white border rounded-lg shadow-lg z-50`}
            >
              <ul className="py-1 text-sm">
                <li
                  onClick={handleLogout}
                  className="block px-4 py-2 text-gray-700 font-bold hover:bg-gray-100 cursor-pointer"
                >
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
