import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import PostmanInformationOrder from "../../postmanPage/PostmanInformationOrder";
import {
  getAllStorage,
  getOrderByStorage,
} from "../../postmanService/postmanService";
import { getDetailStorage } from "../../storageService.js/storageService";
import Pagination from "@atlaskit/pagination";
import StorageInformationOrder from "./StorageInformationOrder";
function StorageBlankOrderManagement() {
  const [storageName, setStorageName] = useState("HỒ CHÍ MINH");
  const [addressStorage, setAddStorage] = useState("");
  const [detailDataStorage, setDeltailDataStorage] = useState("");
  // const [status, setStatus] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  // const [currentStatus, setCurrentStatus] = useState("STORAGE");

  // const [orderData, setOrderData] = useState([]);
  const [isLoadingPagination, setIsLoadingPagination] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [currentData, setCurrentData] = useState([]);

  const [storageOrder, setStorageOrder] = useState([]);
  const [toggle, setToggle] = useState(false);
  const storageId = useSelector((state) => state.user.userInfo.storageId);
  console.log(storageId);
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

  //   console.log(storageId);
  useEffect(() => {
    detailStorage(storageId);
  }, []);
  const detailStorage = async (id) => {
    const data = await getDetailStorage(id);
    console.log(data);
    setDeltailDataStorage(data);
    setStorageName(data.data.name);
    setAddStorage(data.data.address);
  };
  return (
    <div>
      <div className="pt-[20px] pl-[20px] font-bold">
        {`QUAN LI DON HANG TRONG KHO  `}
      </div>
      <div className="pt-[20px] pl-[20px] font-bold text-[blue]">
        <div>{storageName}</div>
        <div>Địa chỉ :{addressStorage}</div>
      </div>
      <div className="w-[90%] mt-[0] mb-[0] ml-[auto] mr-[auto] pb-8 pt-[20px] ">
        <div className="flex item-center ">
          <h2 className="text-xl relative z-[-5]">QUẢN LÍ KHO</h2>
        </div>

        <div className=" mt-8 ">
          <hr className="mt-4 h-[3px] w-full bg-red-700 "></hr>

          {totalPages > 0 ? (
            <div>
              <StorageInformationOrder
                data={storageOrder}
                status="STORAGE"
                toggle={toggle}
                setToggle={setToggle}
              ></StorageInformationOrder>
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
    </div>
  );
}

export default StorageBlankOrderManagement;
