import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import Pagination from "@atlaskit/pagination";

import { getAction, getOder } from "../services/userService";
import "react-datepicker/dist/react-datepicker.css";

import { useSelector } from "react-redux";

import PostmanInformationOrder from "./PostmanInformationOrder";
import {
  getAllStorage,
  getOderAll,
  getOderPostman,
  getOrderByStorage,
} from "../postmanService/postmanService";
import getStorage from "redux-persist/es/storage/getStorage";

function PostmanBlankOrderManagement() {
  // const [status, setStatus] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  // const [currentStatus, setCurrentStatus] = useState("STORAGE");

  // const [orderData, setOrderData] = useState([]);
  const [isLoadingPagination, setIsLoadingPagination] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [currentData, setCurrentData] = useState([]);
  const [storageId, setStorageId] = useState(1);
  const [storageOrder, setStorageOrder] = useState([]);
  const [toggle, setToggle] = useState(false);

  console.log(toggle);
  const createPageArr = (pages) => {
    let pageArr = [];
    for (let i = 1; i <= pages; i++) {
      pageArr.push(i);
    }
    return pageArr;
  };
  useEffect(() => {
    allStorage();
  }, []);
  const allStorage = async () => {
    const data = await getAllStorage();
    setCurrentData(data.data);
  };
  let storage = currentData.map((item) => {
    return { label: item.name, value: item.id };
  });
  useEffect(() => {
    if (storageId) {
      orderStorage();
    }
  }, [storageId, currentPage, toggle]);
  let orderStorage = async () => {
    const pageSize = 8;
    const data = await getOrderByStorage(currentPage, pageSize, storageId);
    setStorageOrder(data.data);
    setIsLoadingPagination(true);
    setTotalPages(Math.ceil(data.data.count / pageSize));
  };

  return (
    <div className="w-[90%] mt-[0] mb-[0] ml-[auto] mr-[auto] pb-8 pt-[20px] ">
      <div className="flex item-center ">
        <h2 className="text-xl relative z-[-5]">QUẢN LÍ KHO</h2>
        <select
          className=" ml-[200px] w-[300px] bg-slate-500 text-[white]"
          onChange={(e) => setStorageId(e.target.value)}
          value={storageId}
        >
          {storage.map((item, index) => (
            <option value={item.value} key={index}>
              {item.label}
            </option>
          ))}
        </select>
      </div>

      <div className=" mt-8 ">
        <hr className="mt-4 h-[3px] w-full bg-red-700 "></hr>

        {totalPages > 0 ? (
          <div>
            <PostmanInformationOrder
              data={storageOrder}
              status="STORAGE"
              toggle={toggle}
              setToggle={setToggle}
            ></PostmanInformationOrder>
            <div className="showPage mt-[20px] mb-[20px] ml-[auto] mf-[auto] text-center">
              <span>
                Trang {currentPage}/{totalPages}
              </span>
            </div>
            {isLoadingPagination && (
              <div className="buttonChangePage text-[center]">
                <Pagination
                  pages={[...createPageArr(totalPages)]}
                  max={totalPages >= 10 ? 8 : totalPages}
                  value={currentPage}
                  onChange={(e, page) => setCurrentPage(page)}
                  style={{
                    fontSize: "16px",
                    display: "flex",

                    alignItems: "center",
                    justifyContent: "center",
                  }}
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
