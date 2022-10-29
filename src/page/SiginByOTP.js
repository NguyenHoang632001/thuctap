import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleUserLoginWithOTP } from "../redux/actions/userAction";
import { sendOTP } from "../services/userService";
import "./SiginByOTP.scss";

function SiginByOTP() {
  const [email, setEmail] = useState("");
  const [send, setSend] = useState("Send");
  const [number1, setNumber1] = useState(null);
  const [number2, setNumber2] = useState(null);
  const [number3, setNumber3] = useState(null);
  const [number4, setNumber4] = useState(null);
  const [number5, setNumber5] = useState(null);
  const [number6, setNumber6] = useState(null);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoggedIn) {
      navigate("../");
    }
  }, [isLoggedIn]);
  const handleOnchang = (e) => {
    setEmail(e.target.value);
  };
  const handleOnclick = async () => {
    await sendOTP({ email });
    setSend("Resend");
  };
  const handleOnchange = (e, value) => {
    switch (value) {
      case "number1":
        setNumber1(e.target.value);
        break;
      case "number2":
        setNumber2(e.target.value);
        break;
      case "number3":
        setNumber3(e.target.value);
        break;
      case "number4":
        setNumber4(e.target.value);
        break;
      case "number5":
        setNumber5(e.target.value);
        break;
      case "number6":
        setNumber6(e.target.value);
        break;

      default:
        break;
    }
  };
  const OTP = number1 + number2 + number3 + number4 + number5 + number6;
  const handleOnclickConfirm = () => {
    dispatch(handleUserLoginWithOTP(email, OTP));
  };

  return (
    <div className="h-screen bg-blue-500 py-20 px-3">
      <div className="container mx-auto">
        <div className="max-w-sm mx-auto md:max-w-lg">
          <div className="w-full">
            <div className="bg-white h-64 py-3 rounded text-center">
              <h1 className="text-2xl font-bold">OTP Verification</h1>
              <div className="flex flex-col mt-4">
                <span>Enter the OTP you received at</span>
                <div>
                  <input
                    type="email"
                    placeholder="Nhập email"
                    className="w-[400px]  p-[6px] border-[1px] border-black border-solid mt-[20px]"
                    onChange={(e) => {
                      handleOnchang(e);
                    }}
                  />
                  <button
                    className="ml-[20px]  border-[1px] border-black border-solid mt-[20px]  p-[6px]"
                    onClick={() => {
                      handleOnclick();
                    }}
                  >
                    {send}
                  </button>
                </div>
              </div>

              <div
                id="otp"
                className="flex flex-row justify-center text-center px-2 mt-5"
              >
                <input
                  className="m-2 border h-10 w-10 text-center form-control rounded"
                  type="text"
                  id="first"
                  maxlength="1"
                  onChange={(e) => {
                    handleOnchange(e, "number1");
                  }}
                />
                <input
                  className="m-2 border h-10 w-10 text-center form-control rounded"
                  type="text"
                  id="second"
                  maxlength="1"
                  onChange={(e) => {
                    handleOnchange(e, "number2");
                  }}
                />
                <input
                  className="m-2 border h-10 w-10 text-center form-control rounded"
                  type="text"
                  id="third"
                  maxlength="1"
                  onChange={(e) => {
                    handleOnchange(e, "number3");
                  }}
                />
                <input
                  className="m-2 border h-10 w-10 text-center form-control rounded"
                  type="text"
                  id="fourth"
                  maxlength="1"
                  onChange={(e) => {
                    handleOnchange(e, "number4");
                  }}
                />
                <input
                  className="m-2 border h-10 w-10 text-center form-control rounded"
                  type="text"
                  id="fourth"
                  maxlength="1"
                  onChange={(e) => {
                    handleOnchange(e, "number5");
                  }}
                />
                <input
                  className="m-2 border h-10 w-10 text-center form-control rounded"
                  type="text"
                  id="fourth"
                  maxlength="1"
                  onChange={(e) => {
                    handleOnchange(e, "number6");
                  }}
                />
              </div>

              <div className="flex justify-center text-center mt-5">
                <a className="flex items-center text-blue-700 hover:text-blue-900 cursor-pointer">
                  <span
                    className="font-bold"
                    onClick={() => {
                      handleOnclickConfirm();
                    }}
                  >
                    Xác thực
                  </span>
                  <i className="bx bx-caret-right ml-1"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SiginByOTP;
