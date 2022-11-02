import { Provider, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout/DefaultLayout";
import DefaultPostmanLayout from "./layouts/PostmanLayout/DefaultPostmanLayout";

import {
  adminRoutes,
  postmanRoutes,
  publicRoutes,
  userRoutes,
} from "./routes/route";
function App() {
  const routeId = useSelector((state) => {
    return state.user.userInfo.roleId;
  });

  return (
    <div className="App">
      <Routes>
        {routeId == "R3" &&
          userRoutes.map((route, index) => {
            const Page = route.component;
            if (route.deafaultLayout === null) {
              return <Route key={index} path={route.path} element={<Page />} />;
            } else
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <DefaultLayout>
                      <Page />
                    </DefaultLayout>
                  }
                />
              );
          })}
        {routeId == "R2" &&
          postmanRoutes.map((route, index) => {
            const Page = route.component;
            if (route.deafaultLayout === null) {
              return <Route key={index} path={route.path} element={<Page />} />;
            } else
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <DefaultPostmanLayout>
                      <Page />
                    </DefaultPostmanLayout>
                  }
                />
              );
          })}
        {routeId == "R1" &&
          adminRoutes.map((route, index) => {
            const Page = route.component;
            if (route.deafaultLayout === null) {
              return <Route key={index} path={route.path} element={<Page />} />;
            } else
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <DefaultLayout>
                      <Page />
                    </DefaultLayout>
                  }
                />
              );
          })}
        {publicRoutes.map((route, index) => {
          const Page = route.component;
          if (route.deafaultLayout === null) {
            return <Route key={index} path={route.path} element={<Page />} />;
          } else
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <DefaultLayout>
                    <Page />
                  </DefaultLayout>
                }
              />
            );
        })}
      </Routes>
    </div>
  );
}

export default App;
