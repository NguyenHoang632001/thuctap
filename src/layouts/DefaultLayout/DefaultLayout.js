import Header from "./Header";
import SideBar from "./SideBar";

function DefaultLayout({ children }) {
  return (
    <div className="w-full min-h-screen bg-[#eee] relative">
      <Header />
      <SideBar />
      <div className="w-[calc(100% - 16rem)] h-full  mt-16 ml-16">
        {children}
      </div>
    </div>
  );
}

export default DefaultLayout;
