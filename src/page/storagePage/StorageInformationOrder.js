import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";
import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";
import {
  getAllStorage,
  updateOrderStatusService,
} from "../../postmanService/postmanService";
import { transferStorage } from "../../storageService.js/storageService";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
const customStylesToChange = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    height: "400px",
  },
};
Modal.setAppElement("#root");

function StorageInformationOrder({ ...props }) {
  const [currentStatus, setCurrentStatus] = useState(props.status);

  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [modalIsOpenToChange, setIsOpenToChange] = React.useState(false);
  const [allStotage, setAllStotage] = useState([]);
  const [chooseStorage, setChooseStorage] = useState("");
  const [idOrder, setIdOrder] = useState(0);
  const storageId = useSelector((state) => state.user.userInfo.storageId);
  const [toggle, setToggle] = useState(true);
  function openModal() {
    setIsOpen(true);
  }
  const openModalToChange = (id) => {
    setIsOpenToChange(true);
    setIdOrder(id);
  };

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }
  function closeModalToChange() {
    setIsOpenToChange(false);
  }

  const verifierEmail = useSelector((state) => {
    return state.user.userInfo.email;
  });

  useEffect(() => {
    allStorage();
  }, []);
  const allStorage = async () => {
    const data = await getAllStorage();
    setAllStotage(data.data);
  };

  const changeStorage = async (id, storageId) => {
    const changeStorageData = await transferStorage(id, storageId);
    if (changeStorageData && changeStorageData.errCode === 0) {
      props.setToggle(!props.toggle);
    }
  };
  const handletoSaveChangeStorage = (id, storageId) => {
    changeStorage({ id: id, storageId: storageId });
    closeModalToChange();
  };
  console.log("chooseStorage", chooseStorage);

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="py-3 px-6">
              Mã đơn hàng
            </th>
            <th scope="col" className="py-3 px-6">
              Người gửi
            </th>
            <th scope="col" className="py-3 px-6">
              Người nhận
            </th>
            <th scope="col" className="py-3 px-6">
              Tiền thu hộ
            </th>
            <th scope="col" className="py-3 px-6">
              Cước
            </th>
            <th scope="col" className="py-3 px-6">
              Thao tác
            </th>
          </tr>
        </thead>
        <tbody>
          {props.data.rows &&
            props.data.rows.map((item, index) => {
              return (
                <tr
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  key={index}
                >
                  <td className="py-4 px-6">
                    {item.orderCode ? item.orderCode : "trống"}
                  </td>
                  <td className="py-4 px-6">
                    {item.senderEmail ? item.senderEmail : "trống"}
                  </td>

                  <td className="py-4 px-6">
                    {item.fullName ? item.fullName : "trống"}
                  </td>
                  <td className="py-4 px-6">
                    {item.collectMoney ? item.collectMoney : "trống"}
                  </td>
                  <td className="py-4 px-6">
                    {item.price ? item.price : "trống"}
                  </td>

                  <td>
                    <button
                      onClick={openModal}
                      className="ml-2 border-black border-solid border-[1px] p-1"
                    >
                      {" "}
                      Xem chi tiết
                    </button>

                    {currentStatus == "STORAGE" && (
                      <button
                        className="ml-2 border-black border-solid border-[1px] p-1"
                        onClick={() => openModalToChange(item.id)}
                      >
                        Chuyển kho
                      </button>
                    )}

                    <Modal
                      isOpen={modalIsOpen}
                      onAfterOpen={afterOpenModal}
                      onRequestClose={closeModal}
                      style={customStyles}
                      contentLabel="Example Modal"
                    >
                      <div className="flex items-center justify-between w-[500px]">
                        <h2
                          ref={(_subtitle) => (subtitle = _subtitle)}
                          className="text-[red]"
                        >
                          THÔNG TIN ĐƠN HÀNG
                        </h2>
                        <button onClick={closeModal}>Close</button>
                      </div>
                      <div className="mt-[20px]">
                        <div className="mt-[20px]">
                          Mã đơn hàng {item.orderCode}
                        </div>

                        <div className="mt-[20px]">
                          Người gửi: {item.senderEmail}
                        </div>
                        <div className="mt-[20px]">
                          Người nhận: {item.fullName}
                        </div>
                        <div className="mt-[20px]">
                          Email người nhận: {item.receiverEmail}
                        </div>
                        <div className="mt-[20px]">
                          Địa chỉ người nhận {item.address}
                        </div>
                        <div className="mt-[20px]">
                          Nơi nhận hàng:{item.receivePlace}
                        </div>
                        <div className="mt-[20px]">
                          Thu hộ: {item.collectMoney}
                        </div>
                        <div className="mt-[20px]">Giá: {item.price}</div>
                      </div>
                    </Modal>
                  </td>
                  <td>
                    <Modal
                      isOpen={modalIsOpenToChange}
                      onAfterOpen={afterOpenModal}
                      onRequestClose={closeModal}
                      style={customStylesToChange}
                      contentLabel="Example Modal"
                    >
                      <div className="flex items-center justify-between w-[500px]">
                        <h2
                          ref={(_subtitle) => (subtitle = _subtitle)}
                          className="text-[red]"
                        >
                          Chuyển Tới
                        </h2>
                        <select
                          onChange={(e) => setChooseStorage(e.target.value)}
                        >
                          {allStotage.map((item, index) => {
                            return (
                              <option value={item.id} key={index}>
                                {" "}
                                <div className="">
                                  <span>{item.name}</span>
                                </div>
                              </option>
                            );
                          })}
                        </select>
                        <button
                          onClick={() => {
                            handletoSaveChangeStorage(item.id, chooseStorage);
                          }}
                        >
                          Lưu
                        </button>
                        <button onClick={closeModalToChange}>Close</button>
                      </div>
                    </Modal>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default StorageInformationOrder;
