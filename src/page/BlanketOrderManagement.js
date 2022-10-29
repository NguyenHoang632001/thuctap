import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";

import { getAction, getOder } from "../services/userService";
import "react-datepicker/dist/react-datepicker.css";
import getStorage from "redux-persist/es/storage/getStorage";
import { useSelector } from "react-redux";
import InformationOrder from "../components/InformationOrder";
function BlanketOrderManagement() {
  const [status, setStatus] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [currentStatus, setCurrentStatus] = useState("WAIT");

  const [orderData, setOrderData] = useState([]);
  useEffect(() => {
    getaction();
  }, []);
  const getaction = async () => {
    const data = await getAction("STATUS");
    setStatus(data);
  };
  const data = status ? status.data : [];

  const [active, setActive] = useState(0);
  const handleonclick = (index, statusId) => {
    setActive(index);

    setCurrentStatus(statusId);
  };
  const email = useSelector((state) => state.user.userInfo.email);

  useEffect(() => {
    oder();
  }, [currentStatus]);
  const oder = async () => {
    const orderData = await getOder(
      "SENDER",
      1,
      3,
      1666656000,
      currentStatus,
      email
    );

    setOrderData(orderData.data);
  };
  console.log("status", status);
  return (
    <div className="w-[90%] mt-[0] mb-[0] ml-[auto] mr-[auto] pb-8">
      <h2 className="text-xl">QUẢN LÍ VẬN ĐƠN</h2>
      <div className=" mt-8 ">
        <div className="flex items-center justify-between pt-8">
          <div className="flex items-center">
            <input
              className=" border-[1px] border-black w-[150px] h-[30px]"
              placeholder="Tìm đơn hàng"
            ></input>
            <FontAwesomeIcon icon={faSearch} className=" ml-[10px]" />
          </div>
          <div className="flex items-center justify-between border-[1px] border-black w-[150px] h-[30px]">
            <FontAwesomeIcon
              icon={faCalendarDays}
              className="text-orange-500 mr-2"
            />
            <DatePicker
              selected={startDate}
              onSelect={new Date()} //when day is clicked
              onChange={(date) => {
                setStartDate(date);
              }}
              className="decoration-emerald-300 border-[1px] border-black w-[150px] h-[30px]"
            />
          </div>
          <div>
            <select className=" border-[1px] border-black w-[150px] h-[30px]">
              <option>Tất cả kho hàng</option>
              <option>{/* <input></input> */}</option>
            </select>
          </div>
          <div>
            <select className=" border-[1px] border-black w-[150px] h-[30px]">
              <option>Người trả cước</option>
              <option>Tất cả</option>
              <option>Người nhận </option>
              <option>Người gửi</option>
            </select>
          </div>
        </div>
        <div className="mt-6">
          <button className="border-[1px] border-black  w-[150px] h-[30px] mr-4">
            In đơn
          </button>
          <button className="border-[1px] border-black  w-[150px] h-[30px] mr-4">
            Xuất Excel
          </button>
          <button className="border-[1px] border-black w-[150px] h-[30px] mr-4">
            Nhập Excel
          </button>
        </div>
        <hr className="mt-4 h-[3px] w-full bg-red-700 "></hr>
        <div className="flex items-center justify-between mt-4">
          {data.map((action, index) => {
            return (
              <div
                onClick={() => {
                  handleonclick(index, action.keyMap ? action.keyMap : "");
                }}
                className={
                  active == index
                    ? "text-[red] border-[red] border-solid  border-b-2 pb-1 "
                    : ""
                }
                key={index}
              >
                <div className="hover:cursor-pointer">{action.value}</div>
              </div>
            );
          })}
        </div>

        <InformationOrder data={orderData}></InformationOrder>
      </div>
    </div>
  );
}

export default BlanketOrderManagement;
