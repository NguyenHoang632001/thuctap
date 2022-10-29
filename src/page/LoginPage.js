import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { handleUserLogin } from "../redux/actions/userAction";

export default function LoginPage() {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoggedIn) {
      navigate("../");
    }
  }, [isLoggedIn]);
  const handleLoginBtn = (e) => {
    e.preventDefault();
    dispatch(handleUserLogin(email, password));
  };
  const handleOnChangeInput = (e, type) => {
    switch (type) {
      case "EMAIL":
        setEmail(e.target.value);
        break;

      case "PASSWORD":
        setPassword(e.target.value);
        break;

      default:
        break;
    }
  };
  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-purple-700 underline">
          Sign in
        </h1>
        <form className="mt-6">
          <div className="mb-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-800"
            >
              Email
            </label>
            <input
              value={email}
              onChange={(e) => handleOnChangeInput(e, "EMAIL")}
              type="email"
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-800"
            >
              Password
            </label>
            <input
              value={password}
              onChange={(e) => handleOnChangeInput(e, "PASSWORD")}
              type="password"
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <Link className="text-xs text-purple-600 hover:underline" to="#">
            Forget Password?
          </Link>
          <Link to="/siginbyotp">Login with OTP</Link>
          <div className="mt-6">
            <button
              onClick={(e) => handleLoginBtn(e)}
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
            >
              Login
            </button>
          </div>
        </form>

        <p className="mt-8 text-xs font-light text-center text-gray-700">
          {" "}
          Don't have an account?{" "}
          <span className="font-medium text-purple-600 hover:underline">
            <Link to="/signup">Sign up</Link>
          </span>
        </p>
      </div>
    </div>
  );
}
