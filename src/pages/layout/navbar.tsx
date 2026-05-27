import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import URL_MAPPING from "../../routes/constants";
import Home from "../assets/icons/home-icon.svg";
import Dashboard from "../../assets/dashboard.svg";
import DashboardDark from "../../assets/dashboard-dark.svg";
import VisitReport from "../assets/icons/visit-report.svg";
// import VisitReportDark from "../assets/icons/visit-report-dark.svg";
// import { useTranslation } from "react-i18next";
import DownArrow from "../../assets/down-arrow.svg";
import UpArrow from "../../assets/up-arrow.svg";
import Rfp from "../../assets/rfp-icon.svg"
import RfpDark from "../../assets/rfp-icon-dark.svg"
import Award from "../../assets/award.svg"
import AwardDark from "../../assets/award-dark.svg"
import Proposal from "../../assets/proposal.svg"
import ProposalDark from "../../assets/proposal-dark.svg"
import Vendor from "../../assets/vendor.svg"
import VendorDark from "../../assets/vendor-dark.svg"
import Clarification from "../../assets/clarification.svg"
import ClarificationDark from "../../assets/clarification-dark.svg"

interface NavbarProps {
  open: boolean;
  setOpen: any;
}
const Navbar: React.FC<NavbarProps> = ({ open, setOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  // const { t } = useTranslation();
  const [navItems, setNavItems] = useState<any>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null); // Track the hovered item
  const navRef = useRef<HTMLDivElement>(null);
  const isActive = (route: string) => location.pathname.includes(route);
  const [isRTL, setIsRTL] = useState(false);
  const [isReportsOpen, setIsReportsOpen] = useState(false);
  const [isSupervisorOpen, setIsSupervisorOpen] = useState(false);
  const activeMenu = useRef('');
  // const [role, setRole] = useState<string>(getUserInfo()?.role);

  // const newObj = {
  //   route: URL_MAPPING.TARGETKPI,
  //   label: t("Nav.analytics"),
  //   icon: Icon11,
  //   iconDark: Icon11s,
  // }

  useEffect(() => {


  }, [navItems])

  const handleSubMenuClick = (route: string, item: any) => {
    activeMenu.current = item.label
    navigate(route);
    setIsReportsOpen(false);
    setIsSupervisorOpen(false);
    setOpen(false);
  };

  const handleSection = async (section: any) => {
    // const accessibleReports = await getAccessibleReports();
    // const accessibleReportNames = accessibleReports.data.map((report:any) => report.report_type);
    const accessibleReportNames = ['VISIT_REPORT', 'ACTIVITY_REPORT']

    //  todo:need to verify and implement 
    switch (section) {
      case "Arasco_Team":
        setNavItems([

          {
            label: 'Upload Copy',
            route: URL_MAPPING.UPLOAD,
            icon: Dashboard,
            iconDark: DashboardDark,
            isCollapsible: false,
          },
          // role !== 'DD Supervisor' && {
          //   label: t("Nav.supervisor"),
          //   icon: Reportsdark,
          //   iconDark: Reports,
          //   isCollapsible: true,
          //   subItems: [
          //                     {
          //       route: URL_MAPPING.SUPERVISORDASHBOARD,
          //       label: t("Nav.dashboard"),
          //       icon: Dashboard,
          //       iconDark: DashboardDark,
          //     },
          //     {
          //       route: URL_MAPPING.SUPERVISORACTIVITYREPORT,
          //       label: t("Nav.activityReport"),
          //       icon: VisitReport,
          //       iconDark: VisitReportDark,
          //     },
          //     {
          //       route: URL_MAPPING.SUPERVISORCOLLECTIONAUDIT,
          //       label: t("Nav.collectionAudit"),
          //       icon: EmpList,
          //       iconDark: EmpListDark
          //     },
          //     {
          //       route: URL_MAPPING.SUPERVISORVISITREPORT,
          //       label: t("Nav.supervisorVisitReport"),
          //       icon: EmpList,
          //       iconDark: EmpListDark
          //     },
          //     {
          //       route: URL_MAPPING.SUPERVISORMAP,
          //       label: t("Nav.mapView"),
          //       icon: MapView,
          //       iconDark: MapViewDark,
          //     }
          //   ],
          // },
        ])
        break
      case "Vendor":
        setNavItems([{
          label: 'Upload Copy',
          route: URL_MAPPING.UPLOAD,
          icon: Dashboard,
          iconDark: DashboardDark,
          isCollapsible: false,
        },{
          label: 'Insurance List',
          route: URL_MAPPING.list,
          icon: Award,
          iconDark: AwardDark,
          isCollapsible: false,
        },
       
       ]);
        break;
      case "Territory":
        setNavItems([
        ]);
        break;
      case "Delivery_My_Team":
        setNavItems([

        ]);
        break;
      case "Delivery_Planogram":
        setNavItems([

        ]);
        break;
      case "Delivery_Print":
        setNavItems([

        ]);
        break;
      case "B2B":
        setNavItems([

        ]);
        break;
      case "SDR":
        setNavItems([


        ]);
        break;

      default:
        setNavItems([

        ]);
        break;
    }
  };

  const dir = document.documentElement.getAttribute("dir");
  useEffect(() => {
    const section = localStorage.getItem("section");
    // if (!section) {
    //   navigate(URL_MAPPING.LANDING);
    // }
    handleSection('Vendor');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dir]);

  // useEffect(() => {
  //   let isRtl = false;
  //   isRtl = dir === "rtl";
  //   setIsRTL(isRtl);
  // }, [dir]);

  const handleClickOutside = (event: MouseEvent) => {
    if (navRef.current && !navRef.current.contains(event.target as Node)) {
      setOpen(false); // Close the Navbar when clicking outside
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getActiveItem = (items: { route: string }[]): boolean => {
    return items?.some(item => location.pathname === item.route);
  };

  return (
    <div
      ref={navRef}
      className={`m-2 rounded-lg md:flex xl:h-[calc(100%-61px)] md:h-[calc(100%-51px)]  bg-greendark flex flex-col justify-start items-center absolute ${isRTL ? "right-0" : "left-0"
        } gap-0 z-30 top-0 md:top-[48px] ${open ? "w-[251px] md:w-[220px]" : "hidden w-[56px] delay-150"} transition-all duration-300`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => {
        setOpen(false);
        setIsReportsOpen(false);
        setIsSupervisorOpen(false);
      }}
    >
      <ul className={`flex flex-col items-center justify-start gap-1 mt-4 w-full overflow-hidden min-h-[500px] h-auto  px-2 `}>
        {navItems.map((item: any, index: number) => {
          return (
            <li
              key={index}
              className={`relative  w-full items-center h-[40px] rounded-[8px] px-2 flex ${location.pathname.includes(item.route)
                ? "hover:bg-[#FFFFFF] hover:text-purple relative"
                : ""
                } group cursor-pointer ${isActive(item.route) || getActiveItem(item.subItems)
                  ? "bg-white"
                  : "bg-greendark"
                }`}
            >
              <button
                className="pl-0.5 flex gap-2 cursor-pointer items-center w-full justify-between"
                onClick={() => {
                  if (item.isCollapsible) {
                    if (item.label === t("Nav.reports")) {
                      setIsReportsOpen((prev) => !prev);
                      setIsSupervisorOpen(false);
                    } else if (item.label === t("Nav.supervisor")) {
                      setIsSupervisorOpen((prev) => !prev);
                      setIsReportsOpen(false);
                    }
                    activeMenu.current = item.label;
                  } else {
                    navigate(item.route);
                  }
                }}
              >
                <div className="flex gap-2 items-center min-w-0">
                  <img
                    src={
                      isActive(item.route) ||
                        hoveredIndex === index || getActiveItem(item.subItems)
                        ? item.iconDark
                        : item.icon
                    }
                    alt={item.label}
                    className="max-w-[50px]"
                  />
                  <p
                    className={`transition-opacity duration-200 delay-150 ${open ? "opacity-100" : "opacity-0"
                      } group-hover:opacity-100 group-hover:text-black ${isActive(item.route) || getActiveItem(item.subItems)
                        ? "text-greendark"
                        : "text-white"
                      } text-sm truncate flex-1`}
                  >
                    {item.label}
                  </p>
                </div>

                {/* Add down arrow for collapsible items */}
                {item.isCollapsible && (
                  <span>
                    <img src={((isReportsOpen && item.label === t("Nav.reports")) || (isSupervisorOpen && item.label === t("Nav.supervisor"))) ? UpArrow : DownArrow} alt="" />
                  </span>
                )}
              </button>
              {((isReportsOpen && item.label === t("Nav.reports")) || (isSupervisorOpen && item.label === t("Nav.supervisor"))) && (
                <ul
                  className={`absolute border-b-2 bg-white overflow-y-auto flex flex-col gap-2 z-50 submenu transition-opacity duration-200 delay-150 ${isRTL ? "right-[25px]" : ""}`}
                  style={{
                    top: "100%",
                    minWidth: "210px",
                    maxHeight: item.label === t("Nav.reports") ? "250px" : "200px",
                    overflowY: "auto",
                    position: "absolute",
                    zIndex: 50,
                  }}
                >
                  {item?.subItems?.map((subItem: any, subIndex: number) => (
                    <li
                      key={subIndex}
                      onClick={() => handleSubMenuClick(subItem.route, item)}
                      className={` w-full  items-center h-[54px] p-2 flex group cursor-pointer ${isActive(subItem.route) ? " bg-[#B0F7F5]" : "group-hover:text-black"
                        }`}
                    >
                      <button className="p-2 flex gap-2 items-center min-w-0 w-full">
                        <img
                          src={
                            isActive(subItem.route) ? subItem.iconDark : subItem.icon
                          }
                          alt={subItem.label}
                          className="max-w-[50px]"
                        />
                        <p
                          className={`transition-opacity duration-200 delay-150 text-sm ${open ? "opacity-100" : "opacity-0"
                            } group-hover:opacity-100 hover:text-black ${isActive(subItem.route) ? "text-white " : "text-grey"
                            } truncate flex-1`}
                        >
                          {subItem.label}
                        </p>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>

      {/* Submenu */}

    </div>




  );
};

export default Navbar;
