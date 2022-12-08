import SidebarItem from "../../components/SidebarItems/SidebarItem";
import SidebarItemModifier from "../../components/SidebarItems/SidebarItemModifier";

function SideBar() {
  return (
    <div className="w-16 h-screen bg-[#f7dfdf] fixed">
      <SidebarItem title="Trang chủ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-10 h-10"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </SidebarItem>

      <SidebarItemModifier
        title="Quản lí"
        titleList={[
          {
            title: "Quản lí vận đơn",
            path: "/postman-blanket-order-management",
          },
          {
            title: "Thống kê tiền hàng",
            path: "/postman-statistical",
          },

          {
            title: "Đơn hàng trong kho",
            path: "/postman-order-in-storage",
          },
        ]}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-10 h-10"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3"
          />
        </svg>
      </SidebarItemModifier>

      <SidebarItemModifier
        title="Cài đặt tài khoản"
        titleList={[
          {
            title: "Thay đổi thông tin tài khoản",
            path: "/change-inforAccount",
          },
        ]}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-10 h-10"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
          />
        </svg>
      </SidebarItemModifier>
    </div>
  );
}

export default SideBar;
