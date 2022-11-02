import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { handleUserLogout } from "../../redux/actions/userAction";

function Header() {
  const [searchInput, setSearchInput] = useState("");
  const searchInputRef = useRef();
  const navigate = useNavigate();
  const id = useSelector((state) => state.user.userInfo.id);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const dispatch = useDispatch();
  const handleOnchangInput = (e) => {
    setSearchInput(e.target.value);
  };
  const handleClear = () => {
    setSearchInput("");
    searchInputRef.current.focus();
  };
  const handleOnclick = async () => {
    await dispatch(handleUserLogout(id));
    navigate("../login", { replace: true });
  };
  useEffect(() => {
    if (isLoggedIn == false) {
      navigate("../login");
    }
  }, [isLoggedIn]);
  return (
    <div className="w-full h-16  flex items-center  fixed top-0 text-center bg-white">
      <div className="w-16 h-16 bg-black">
        <img
          className="w-16 h-16 "
          src="https://viettelpost.vn/assets/images/logo-icon.jpg "
        ></img>
      </div>
      <div className="w-[calc(100%-4rem)]  flex flex-col items-center">
        <div className="flex w-[calc(100%-4rem)] justify-between ">
          <div className=" flex items-center w-full ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-10 h-10 bg-[#ee0033] p-2.5 mr-2 rounded text-white "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z"
              />
            </svg>
            <div className="flex items-center   w-[calc(50%)] h-[calc(40px)] p-2 rounded bg-[#c6d1dc] ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
              <input
                className="ml-2 bg-transparent  w-[calc(100%)] h-[calc(20px)] focus-visible:outline-none"
                value={searchInput}
                ref={searchInputRef}
                onChange={(e) => {
                  handleOnchangInput(e);
                }}
              ></input>
              {searchInput && (
                <span
                  className="w-4 h-4"
                  onClick={() => {
                    handleClear();
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </span>
              )}
            </div>
            <button></button>
          </div>
          <div className="flex items-center 0 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5"
              />
            </svg>
            <img
              className="w-10 h-10 rounded-full object-cover"
              src="https://pixsector.com/cache/50fcb576/av874b0535be604ef535c.png"
            ></img>
            <button
              onClick={() => {
                handleOnclick();
              }}
            >
              log out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
