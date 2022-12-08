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
  const [sellectedItem, setSellectedItem] = useState("");
  const [allStotage, setAllStotage] = useState([]);
  const [chooseStorage, setChooseStorage] = useState("");
  const [idOrder, setIdOrder] = useState(0);
  const storageId = useSelector((state) => state.user.userInfo.storageId);
  const [toggle, setToggle] = useState(true);
  function openModal(item) {
    setSellectedItem(item);
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
                      onClick={() => openModal(item)}
                      className="ml-2 border-black border-solid border-[1px] p-1"
                    >
                      {" "}
                      Xem chi tiết
                    </button>

                    <button
                      className="ml-2 border-black border-solid border-[1px] p-1"
                      onClick={() => openModalToChange(item.id)}
                    >
                      Chuyển kho
                    </button>

                    <Modal
                      isOpen={modalIsOpen}
                      onAfterOpen={afterOpenModal}
                      onRequestClose={closeModal}
                      style={customStyles}
                      contentLabel="Example Modal"
                    >
                      <div className="flex items-center justify-between w-full] ">
                        <h2
                          ref={(_subtitle) => (subtitle = _subtitle)}
                          className="text-[red]"
                        >
                          THÔNG TIN ĐƠN HÀNG
                        </h2>
                        <button onClick={closeModal} className="">
                          Close
                        </button>
                      </div>
                      <div className="mt-[20px]">
                        <h2 className="text-[red] font-bold">
                          {" "}
                          Thông tin người gửi
                        </h2>
                        {console.log("sellectedItem,", sellectedItem)}
                        <div className="mt-[20px]">
                          Tên người gửi:{" "}
                          {sellectedItem && sellectedItem.senderData.name}
                        </div>
                        <div className="mt-[20px]">
                          Email người gửi:{" "}
                          {sellectedItem && sellectedItem.senderData.email}
                        </div>
                        <div className="mt-[20px]">
                          SDT người gửi:{" "}
                          {sellectedItem &&
                            sellectedItem.senderData.phoneNumber}
                        </div>
                        <div className="mt-[20px]">
                          Địa chỉ người gửi: Tỉnh/thành phố{" "}
                          {sellectedItem &&
                            sellectedItem.senderData.provinceData.provinceName}
                          ,quận/huyện{" "}
                          {sellectedItem &&
                            sellectedItem.senderData.districtData.districtName}
                          ,xã/phường{" "}
                          {sellectedItem &&
                            sellectedItem.senderData.wardData.wardName}
                          , {sellectedItem && sellectedItem.senderData.address}
                        </div>

                        <h2 className="text-[red] font-bold mt-[20px]">
                          {" "}
                          Thông tin người nhận
                        </h2>
                        <div className="mt-[20px]">
                          Mã đơn hàng :{" "}
                          {sellectedItem && sellectedItem.orderCode}
                        </div>
                        <div className="mt-[20px]">
                          Tên người nhận :{" "}
                          {sellectedItem && sellectedItem.fullName}
                        </div>
                        <div className="mt-[20px]">
                          SĐT người nhận :{" "}
                          {sellectedItem && sellectedItem.phoneNumber}
                        </div>
                        <div className="mt-[20px]">
                          Địa chỉ người nhận : Tỉnh/thành phố{" "}
                          {sellectedItem && sellectedItem.province.provinceName}
                          ,quận/huyện{" "}
                          {sellectedItem && sellectedItem.district.districtName}
                          ,xã/phường{" "}
                          {sellectedItem && sellectedItem.ward.wardName},
                          {sellectedItem && sellectedItem.address}
                        </div>
                        <div className="mt-[20px]">
                          Tiền thu hộ :{" "}
                          {sellectedItem &&
                            sellectedItem.collectMoney.replace(
                              /\B(?=(\d{3})+(?!\d))/g,
                              ","
                            )}{" "}
                          VND
                        </div>
                        <div className="mt-[20px]">
                          Tiền cước phí : {sellectedItem && sellectedItem.price}
                          /Người trả phí:{" "}
                          {sellectedItem && sellectedItem.freightPayer}
                        </div>

                        <h2 className="text-[red] mt-[10px]">
                          Thông tin đơn hàng
                        </h2>
                        {sellectedItem &&
                          sellectedItem.commodityData.map((item, index) => {
                            return (
                              <div className="mt-[20px]" key={index}>
                                <h3>
                                  Tên hàng {index}: {item.name}
                                </h3>
                                <h3>Trọng lượng đơn hàng : {item.weight}</h3>
                                <h3>Số lượng đơn hàng : {item.amount}</h3>
                                <h3>
                                  Giá trị đơn hàng : {item.value}
                                  VNĐ
                                </h3>
                              </div>
                            );
                          })}
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
                            handletoSaveChangeStorage(idOrder, chooseStorage);
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
