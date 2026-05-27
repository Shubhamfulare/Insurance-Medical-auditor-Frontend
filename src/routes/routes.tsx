import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Upload from "../pages/Upload";
import List from "../pages/List";
import URL_MAPPING from "./constants";
// import Cookies from "js-cookie";
// import { getUserInfo } from "../utility";
// import { ROLE_GROUPS } from "./roleGroups";
// import DashboardAnalytics from "../pages/analytics/dashboardAnalytics";
// import ErrorPage from "../pages/errorPage";

// interface ProtectedRouteProps {
//   component: React.ComponentType<any>;
//   [key: string]: any; // To accept any additional props
// }

// const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
//   component: Component,
//   allowedRoles = [],
//   ...rest
// }) => {
//   const isAuthenticated = Cookies.get("token");
//   // const userRoles = getUserInfo();

//   if (!isAuthenticated) {
//     return <Navigate to="/auth/login" replace />;
//   }

//   if (userRoles) {
//     const user_info = getUserInfo();

//     if (user_info.role === "NWC") {
//       const hasAccess =
//         userRoles?.nwc_role &&
//         userRoles.nwc_role.some((role: any) => allowedRoles.includes(role));

//       if (!hasAccess) {
//         return <Navigate to="*" replace />;
//       }
//     }

//     return <Component {...rest} />;
//   } else {
//     const hasAccess = allowedRoles?.includes(userRoles?.role);

//     if (!hasAccess) {
//       return <Navigate to="*" replace />;
//     }
//   }
//   return <Component {...rest} />;
// };

const AllRoutes: React.FunctionComponent = () => {
  return (
    <Routes>
      <Route path={URL_MAPPING.start} element={<Upload />} />
      <Route path={URL_MAPPING.UPLOAD} element={<Upload />} />
      <Route path={URL_MAPPING.list} element={<List />} />
    

      {/* <Route path="*" element={<ErrorPage />} /> */}

      {/* protected routes */}
      {/* <Route
        path={URL_MAPPING.ANALYTICS}
        element={
          <ProtectedRoute
            component={DashboardAnalytics}
            allowedRoles={[...ROLE_GROUPS.PRESELLER_SALESMAN_SUPERVISOR]}
          />
        }
      /> */}


    </Routes>
  );
};

export default AllRoutes;
