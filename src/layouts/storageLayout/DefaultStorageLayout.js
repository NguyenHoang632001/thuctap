import Header from "../../../src/layouts/DefaultLayout/Header";
import SideBar from "./SideBar";
import { ToastContainer } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";
import { useSelector } from "react-redux";

function DefaultStorageLayout({ children }) {
  const isLoading = useSelector((state) => state.app.isLoading);
  return (
    <div className="w-full min-h-screen bg-[#eee]  z-[0] relative">
      <Header />
      <SideBar />
      <div className="w-[calc(100% - 16rem)] h-full  mt-16 ml-16">
        <ToastContainer />
        <ClipLoader
          className="absolute top-[50%] left-[50%]"
          color={"blue"}
          loading={isLoading}
          size={40}
        />
        {children}
      </div>
    </div>
  );
}

export default DefaultStorageLayout;
