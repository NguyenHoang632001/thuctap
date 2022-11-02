function SidebarItem({ children, ...props }) {
  return (
    <div className="  group h-16 relative  border-solid   bg-[#decdcd] hover:bg-[#baa8a8] ">
      <div className="   w-16 h-16 absolute top-[calc(50%)]  left-[calc(50%)]  translate-x-[calc(-34%)] translate-y-[calc(-34%)] z-10">
        {children}
      </div>
      <div className=" hidden bg-[#baa8a8] h-full text-white absolute top-0 bottom-0 left-0 w-60 translate-x-[calc(26.5%)]  items-center pl-10  group-hover:block  ">
        <div className="w-full h-full flex items-center ">
          <span className="">{props.title}</span>
        </div>
      </div>
    </div>
  );
}

export default SidebarItem;
