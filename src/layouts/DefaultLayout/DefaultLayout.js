import Header from "./Header";
import SideBar from "./SideBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ClipLoader } from "react-spinners";
import { useSelector } from "react-redux";

function DefaultLayout({ children }) {
  let isLoading = useSelector((state) => state.app.isLoading);
  return (
    <div className="w-full min-h-screen bg-[#eee]  z-[0] relative">
      <Header />
      <SideBar />
      <div className="w-[calc(100% - 16rem)] h-full  mt-16 ml-16">
        <ToastContainer />
        <ClipLoader
          color={"blue"}
          loading={isLoading}
          // cssOverride={override}
          className="absolute top-[50%] left-[50%]"
          size={30}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
        {children}
      </div>
    </div>
  );
}

export default DefaultLayout;
