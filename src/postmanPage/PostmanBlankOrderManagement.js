import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import Pagination from "@atlaskit/pagination";

import { getAction, getOder } from "../services/userService";
import "react-datepicker/dist/react-datepicker.css";

import { useSelector } from "react-redux";
import InformationOrder from "../components/InformationOrder";

function PostmanBlankOrderManagement() {
  const [status, setStatus] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [currentStatus, setCurrentStatus] = useState("WAIT");

  const [orderData, setOrderData] = useState([]);
  const [isLoadingPagination, setIsLoadingPagination] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  useEffect(() => {
    getaction();
  }, []);
  useEffect(() => {
    oder();
  }, [currentStatus, currentPage]);
  const getaction = async () => {
    const data = await getAction("STATUS");
    setStatus(data);
  };

  const data = status ? status.data : [];

  const [active, setActive] = useState(0);
  const handleonclick = (index, statusId) => {
    setCurrentPage(1);
    setActive(index);
    setIsLoadingPagination(false);
    setCurrentStatus(statusId);
  };
  const email = useSelector((state) => state.user.userInfo.email);

  const oder = async () => {
    const pageSize = 8;
    const orderData = await getOder(
      "SENDER",
      currentPage,
      pageSize,
      1666656000,
      currentStatus,
      email
    );

    setIsLoadingPagination(true);
    setOrderData(orderData.data);
    setTotalPages(Math.ceil(orderData.data.count / pageSize));
  };

  const createPageArr = (pages) => {
    let pageArr = [];
    for (let i = 1; i <= pages; i++) {
      pageArr.push(i);
    }
    return pageArr;
  };
  console.log("data", data);
  return (
    <div className="w-[90%] mt-[0] mb-[0] ml-[auto] mr-[auto] pb-8 ">
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
                key={index}
                onClick={() => {
                  handleonclick(index, action.keyMap ? action.keyMap : "");
                }}
                className={
                  active == index
                    ? "text-[red] border-[red] border-solid  border-b-2 pb-1 "
                    : ""
                }
              >
                <div className="hover:cursor-pointer" key={index}>
                  {action.value}
                </div>
              </div>
            );
          })}
        </div>

        {totalPages > 0 ? (
          <div>
            <InformationOrder
              data={orderData}
              className="relative "
            ></InformationOrder>
            <div className="showPage mt-[0] mb-[0] ml-[auto] mf-[auto] text-center">
              <span>
                Trang {currentPage}/{totalPages}
              </span>
            </div>
            {isLoadingPagination && (
              <div className="buttonChangePage bg-black ">
                <Pagination
                  pages={[...createPageArr(totalPages)]}
                  max={totalPages >= 10 ? 8 : totalPages}
                  value={currentPage}
                  onChange={(e, page) => setCurrentPage(page)}
                  style={{ fontSize: "16px" }}
                  className="text-center"
                />
              </div>
            )}
          </div>
        ) : (
          <div className="mt-4 text-[20px] text-[#ef4444] text-center">
            Không có đơn nào
          </div>
        )}
      </div>
    </div>
  );
}

export default PostmanBlankOrderManagement;
