import { Link } from "react-router-dom";

function SidebarItemModifier({ children, ...props }) {
  return (
    <div className="  group h-16 relative  border-solid   bg-[#decdcd] hover:bg-[#baa8a8]  ">
      <div className="  w-16 h-16 absolute top-[calc(50%)]  left-[calc(50%)]  translate-x-[calc(-34%)] translate-y-[calc(-34%)]">
        {children}
      </div>
      <div className=" hidden bg-[#baa8a8] h-full text-white absolute top-0 bottom-0 left-0 w-60 translate-x-[calc(26.5%)]  items-center pl-10  group-hover:block  ">
        <div className="w-full h-full flex items-center  ">
          <span className="flex items-center  group ">
            {props.title}

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-10 h-10 absolute top-[calc(50%)] translate-y-[calc(-50%)]  right-0 pr-3 z-[999]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
            <div className="hidden group-hover:block bg-orange-800 absolute  left-0 bottom-0 right-0  translate-y-[calc(100%)]  ">
              {props.titleList.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="h-[50px] pl-10 border-b-[1px] border-solid border-blue-500 flex items-center hover:cursor-pointer"
                  >
                    {item.path && <Link to={item.path}> {item.title}</Link>}
                  </div>
                );
              })}
            </div>
          </span>
        </div>
      </div>
    </div>
  );
}

export default SidebarItemModifier;
