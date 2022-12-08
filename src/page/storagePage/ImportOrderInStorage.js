import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { matchPath } from "react-router-dom";
import storage from "redux-persist/lib/storage";
import {
  fetchDataFinished,
  fetchDataStart,
} from "../../redux/actions/appAction";
import {
  getOrderToImportStorage,
  searchByStorage,
} from "../../storageService.js/storageService";

import OrderByOtherStorage from "./OrderByOtherStorage";
import OrderByPostman from "./OrderByPostman";

function ImportOrderInStorage() {
  const [order, setOrder] = useState([]);
  const [orderByOtherStorage, setOrderByOtherStorage] = useState([]);
  const [aorder, setaoder] = useState([]);
  const [modi, setModi] = useState("TOOK");
  const [totalPagesByPostman, setTotalPagesByPostman] = useState(1);
  const [totalPagesByStorage, setTotalPagesByStorage] = useState(1);
  const [toggle, setToggle] = useState(true);
  const [word, setWord] = useState("");
  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    getOrder();
    // getOrderByOtherStorage();
  }, [toggle, modi]);
  const label = [
    { title: "Đơn hàng từ Postman chuyển đến", modi: "TOOK" },
    { title: "Đơn hàng gửi lên từ kho khác", modi: "TRANSPORT" },
  ];
  const getOrder = async () => {
    dispatch(fetchDataStart());
    const data = await getOrderToImportStorage(1, 8, modi);
    setOrder(data.data.rows);
    setTotalPagesByPostman(Math.ceil(data.data.count / 8));
    dispatch(fetchDataFinished());
  };
  const handleToSearch = () => {
    getSearchByStorage();
  };
  const getSearchByStorage = async () => {
    dispatch(fetchDataStart());
    const data = await searchByStorage(word, 1, 8, modi);
    setOrder(data.data.rows);
    setTotalPagesByPostman(Math.ceil(data.data.count / 8));
    dispatch(fetchDataFinished());
  };
  return (
    <div>
      <div className="pt-[20px] pl-[20px] font-bold">CHUYỂN HÀNG VÀO KHO</div>

      <div class="flex items-center justify-center ">
        <div class="flex border-2 border-gray-200 rounded ">
          <input
            type="text"
            class="px-4 py-2 w-80 bg-[#9cd6f7]"
            placeholder="Search..."
            onChange={(e) => setWord(e.target.value)}
          ></input>
          <button
            class="px-4 text-white bg-gray-600 border-l "
            onClick={() => handleToSearch()}
          >
            Search
          </button>
        </div>
      </div>
      <div className="text-center pt-[40px] ">
        {label.map((item, index) => {
          return (
            <button
              className="p-[20px]"
              onClick={() => setModi(item.modi)}
              key={index}
            >
              {modi == item.modi ? (
                <span className="text-[red]">{item.title}</span>
              ) : (
                <span>{item.title}</span>
              )}
            </button>
          );
        })}
      </div>
      <OrderByPostman
        status={modi}
        data={order}
        totalPagesByPostman={totalPagesByPostman}
        toggle={toggle}
        setToggle={setToggle}
      />
      {/* {modi == "TOOK" ? (
      ) : (
        <OrderByPostman
          data={orderByOtherStorage}
          totalPagesByPostman={totalPagesByPostman}
          toggle={toggle}
          setToggle={setToggle}
        />
      )} */}
    </div>
  );
}

export default ImportOrderInStorage;
