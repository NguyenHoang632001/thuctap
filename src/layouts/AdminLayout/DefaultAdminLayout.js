import Header from "../../../src/layouts/DefaultLayout/Header";
import SideBar from "./SideBar";

function DefaultAdminLayout({ children }) {
  return (
    <div className="w-full min-h-screen bg-[#eee]  z-[0] relative">
      <Header />
      <SideBar />
      <div className="w-[calc(100% - 16rem)] h-full  mt-16 ml-16">
        {children}
      </div>
    </div>
  );
}

export default DefaultAdminLayout;
