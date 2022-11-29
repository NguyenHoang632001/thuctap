import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import Pagination from "@atlaskit/pagination";
import Select from "react-select";
import { getAction, getOder } from "../services/userService";
import "react-datepicker/dist/react-datepicker.css";

import { useDispatch, useSelector } from "react-redux";
import InformationOrder from "../components/InformationOrder";
import { Link } from "react-router-dom";
import { utils, writeFileXLSX } from "xlsx";
import { fetchDataFinished, fetchDataStart } from "../redux/actions/appAction";

function BlanketOrderManagement() {
  const [status, setStatus] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [currentStatus, setCurrentStatus] = useState("");

  const [orderData, setOrderData] = useState([]);
  const [isLoadingPagination, setIsLoadingPagination] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [toggle, setToggle] = useState(false);
  const dispatch = useDispatch();
  const arrMAster = [];

  orderData.rows &&
    orderData.rows.length > 0 &&
    orderData.rows.forEach((item) => {
      if (item.commodityData) {
        item.commodityData.forEach((element) => {
          arrMAster.push({
            "Mã đơn hàng": item.orderCode,
            "Tên người nhận": item.fullName,
            "Số điện thoại người nhận": item.phoneNumber,
            "Địa chỉ người nhận": `${item.province.provinceName}, ${item.district.districtName}, ${item.ward.wardName}, ${item.address}`,
            "Tên vật phẩm": element.name,
            "Số lượng vật phẩm": element.amount,
            "Trọng lượng vật phẩm": element.weight,
            "Giá trị vật phẩm": element.value,
            "Người trả phí": item.freightPayer,
            "Tiền thu hộ": item.collectMoney,
          });
        });
      }
    });
  console.log(arrMAster);

  useEffect(() => {
    getaction();
  }, []);
  useEffect(() => {
    if (currentStatus) {
      oder();
    }
  }, [currentStatus, currentPage, startDate, toggle]);
  const getaction = async () => {
    dispatch(fetchDataStart());
    const data = await getAction("STATUS");
    if (data && data.errCode === 0) {
      setStatus(data);
      setCurrentStatus(data.data[0] && data.data[0].keyMap);
    }
    dispatch(fetchDataFinished());
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
    dispatch(fetchDataStart());
    const date = new Date(startDate).setHours(0, 0, 0, 0) / 1000;
    const pageSize = 8;
    const orderData = await getOder(
      "SENDER",
      currentPage,
      pageSize,
      date,
      currentStatus,
      email
    );

    setIsLoadingPagination(true);
    setOrderData(orderData.data);
    setTotalPages(Math.ceil(orderData.data.count / pageSize));
    dispatch(fetchDataFinished());
  };

  const createPageArr = (pages) => {
    let pageArr = [];
    for (let i = 1; i <= pages; i++) {
      pageArr.push(i);
    }
    return pageArr;
  };

  console.log("sfdsfdsfdsf", orderData);
  const writeFileExcel = async () => {
    const wb = utils.book_new();
    const ws = utils.json_to_sheet(arrMAster);
    utils.book_append_sheet(wb, ws, "mysheet1");
    await writeFileXLSX(wb, "exportExcel.xlsx");
  };
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
          <button
            onClick={() => {
              if (orderData && orderData.rows.length > 0) {
                writeFileExcel();
              }
            }}
            className="border-[1px] border-black  w-[150px] h-[30px] mr-4"
          >
            Xuất Excel
          </button>
          <button className="border-[1px] border-black w-[150px] h-[30px] mr-4">
            Nhập Excel
          </button>
          <Link
            to="/create-excel"
            className="border-[1px] border-black w-[150px] h-[30px] mr-4"
          >
            Nhập Excel
          </Link>
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
                <div className="hover:cursor-pointer">{action.value}</div>
              </div>
            );
          })}
        </div>

        {totalPages > 0 ? (
          <div>
            <InformationOrder
              data={orderData}
              currentStatus={currentStatus}
              toggle={toggle}
              setToggle={setToggle}
              className="relative"
            ></InformationOrder>
            <div className="showPage mt-[0] mb-[0] ml-[auto] mf-[auto] text-center">
              <span>
                Trang {currentPage}/{totalPages}
              </span>
            </div>
            {isLoadingPagination && (
              <div className="buttonChangePage bg-black flex items-center justify-center">
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

export default BlanketOrderManagement;
