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
              M?? ????n h??ng
            </th>
            <th scope="col" className="py-3 px-6">
              Ng?????i g???i
            </th>
            <th scope="col" className="py-3 px-6">
              Ng?????i nh???n
            </th>
            <th scope="col" className="py-3 px-6">
              Ti???n thu h???
            </th>
            <th scope="col" className="py-3 px-6">
              C?????c
            </th>
            <th scope="col" className="py-3 px-6">
              Thao t??c
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
                    {item.orderCode ? item.orderCode : "tr???ng"}
                  </td>
                  <td className="py-4 px-6">
                    {item.senderEmail ? item.senderEmail : "tr???ng"}
                  </td>

                  <td className="py-4 px-6">
                    {item.fullName ? item.fullName : "tr???ng"}
                  </td>
                  <td className="py-4 px-6">
                    {item.collectMoney ? item.collectMoney : "tr???ng"}
                  </td>
                  <td className="py-4 px-6">
                    {item.price ? item.price : "tr???ng"}
                  </td>

                  <td>
                    <button
                      onClick={() => openModal(item)}
                      className="ml-2 border-black border-solid border-[1px] p-1"
                    >
                      {" "}
                      Xem chi ti???t
                    </button>

                    <button
                      className="ml-2 border-black border-solid border-[1px] p-1"
                      onClick={() => openModalToChange(item.id)}
                    >
                      Chuy???n kho
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
                          TH??NG TIN ????N H??NG
                        </h2>
                        <button onClick={closeModal} className="">
                          Close
                        </button>
                      </div>
                      <div className="mt-[20px]">
                        <h2 className="text-[red] font-bold">
                          {" "}
                          Th??ng tin ng?????i g???i
                        </h2>
                        {console.log("sellectedItem,", sellectedItem)}
                        <div className="mt-[20px]">
                          T??n ng?????i g???i:{" "}
                          {sellectedItem && sellectedItem.senderData.name}
                        </div>
                        <div className="mt-[20px]">
                          Email ng?????i g???i:{" "}
                          {sellectedItem && sellectedItem.senderData.email}
                        </div>
                        <div className="mt-[20px]">
                          SDT ng?????i g???i:{" "}
                          {sellectedItem &&
                            sellectedItem.senderData.phoneNumber}
                        </div>
                        <div className="mt-[20px]">
                          ?????a ch??? ng?????i g???i: T???nh/th??nh ph???{" "}
                          {sellectedItem &&
                            sellectedItem.senderData.provinceData.provinceName}
                          ,qu???n/huy???n{" "}
                          {sellectedItem &&
                            sellectedItem.senderData.districtData.districtName}
                          ,x??/ph?????ng{" "}
                          {sellectedItem &&
                            sellectedItem.senderData.wardData.wardName}
                          , {sellectedItem && sellectedItem.senderData.address}
                        </div>

                        <h2 className="text-[red] font-bold mt-[20px]">
                          {" "}
                          Th??ng tin ng?????i nh???n
                        </h2>
                        <div className="mt-[20px]">
                          M?? ????n h??ng :{" "}
                          {sellectedItem && sellectedItem.orderCode}
                        </div>
                        <div className="mt-[20px]">
                          T??n ng?????i nh???n :{" "}
                          {sellectedItem && sellectedItem.fullName}
                        </div>
                        <div className="mt-[20px]">
                          S??T ng?????i nh???n :{" "}
                          {sellectedItem && sellectedItem.phoneNumber}
                        </div>
                        <div className="mt-[20px]">
                          ?????a ch??? ng?????i nh???n : T???nh/th??nh ph???{" "}
                          {sellectedItem && sellectedItem.province.provinceName}
                          ,qu???n/huy???n{" "}
                          {sellectedItem && sellectedItem.district.districtName}
                          ,x??/ph?????ng{" "}
                          {sellectedItem && sellectedItem.ward.wardName},
                          {sellectedItem && sellectedItem.address}
                        </div>
                        <div className="mt-[20px]">
                          Ti???n thu h??? :{" "}
                          {sellectedItem &&
                            sellectedItem.collectMoney.replace(
                              /\B(?=(\d{3})+(?!\d))/g,
                              ","
                            )}{" "}
                          VND
                        </div>
                        <div className="mt-[20px]">
                          Ti???n c?????c ph?? : {sellectedItem && sellectedItem.price}
                          /Ng?????i tr??? ph??:{" "}
                          {sellectedItem && sellectedItem.freightPayer}
                        </div>

                        <h2 className="text-[red] mt-[10px]">
                          Th??ng tin ????n h??ng
                        </h2>
                        {sellectedItem &&
                          sellectedItem.commodityData.map((item, index) => {
                            return (
                              <div className="mt-[20px]" key={index}>
                                <h3>
                                  T??n h??ng {index}: {item.name}
                                </h3>
                                <h3>Tr???ng l?????ng ????n h??ng : {item.weight}</h3>
                                <h3>S??? l?????ng ????n h??ng : {item.amount}</h3>
                                <h3>
                                  Gi?? tr??? ????n h??ng : {item.value}
                                  VN??
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
                          Chuy???n T???i
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
                          L??u
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
