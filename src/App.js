import { Provider } from "react-redux";
import { Route, Routes } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout/DefaultLayout";
import store from "./redux/store";
import { publicRoutes } from "./routes/route";
function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Routes>
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
    </Provider>
  );
}

export default App;
