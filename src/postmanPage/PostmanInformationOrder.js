import React from "react";
import { useState } from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";
import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";
import { updateOrderStatusService } from "../postmanService/postmanService";
import { getInformationCommodity } from "../services/userService";

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
Modal.setAppElement("#root");

function PostmanInformationOrder({ ...props }) {
  const [currentStatus, setCurrentStatus] = useState(props.status);
  const [currentComodityArr, setCurrentCommodityArr] = useState([]);
  const [sellectedItem, setSellectedItem] = useState("");
  console.log(props.status);

  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal(item) {
    setIsOpen(true);
    setSellectedItem(item);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
    getCommodity();
  }

  const verifierEmail = useSelector((state) => {
    return state.user.userInfo.email;
  });
  console.log("currentStatus", currentStatus);
  const updateOrder = async (item) => {
    let id = item.id;
    let collectMoney = item.collectMoney;
    let price = item.price;
    let statusId = "";
    switch (currentStatus) {
      case "CREATE":
        statusId = "WAIT";
        break;
      case "WAIT":
        statusId = "TOOK";
        break;
      case "DELIVERY":
        statusId = "SUCCESSFUL_DELIVERY";
        break;
      case "TRANSPORT":
        statusId = "DELIVERY";
        break;
      case "CONTINUE":
        statusId = "DELIVERY";
        break;
      case "CREATE":
        statusId = "WAIT";
        break;
      case "STORAGE":
        statusId = "DELIVERY";
        break;
      case "FURTHER_TRANSFER":
        statusId = "REFUND_APPROVED";
        break;

      default:
        break;
    }
    console.log("statusId", statusId);
    let data = await updateOrderStatusService({
      id,
      statusId,
      verifierEmail,
      collectMoney,
      price: "20",
    });
    if (data && data.errCode === 0) {
      props.setToggle(!props.toggle);
    }
  };
  const destroyOrder = async (id) => {
    let statusId = "";
    switch (currentStatus) {
      case "CREATE":
        statusId = "WAIT";
        break;
      case "WAIT":
        statusId = "TOOK";
        break;
      case "DELIVERY":
        statusId = "SUCCESSFUL_DELIVERY";
        break;
      case "TRANSPORT":
        statusId = "DELIVERY";
        break;
      case "CONTINUE":
        statusId = "DELIVERY";
        break;
      case "CREATE":
        statusId = "WAIT";
        break;
      case "STORAGE":
        statusId = "DELIVERY";
        break;
      case "FURTHER_TRANSFER":
        statusId = "REFUND_APPROVED";
        break;

      default:
        break;
    }
    let data = await updateOrderStatusService({
      id,
      statusId,
      verifierEmail,
    });
    if (data && data.errCode === 0) {
      props.setToggle(!props.toggle);
    }
  };
  const hanleUpdateOrder = (item) => {
    updateOrder(item);
  };
  const handleToDestroy = (id) => {
    destroyOrder(id);
  };
  const getCommodity = async () => {
    const data = await getInformationCommodity(
      sellectedItem.senderEmail,
      sellectedItem.orderCode
    );
    // sellectedItem.senderEmail,
    // sellectedItem.orderCode
    if (data && data.errCode === 0) {
      setCurrentCommodityArr(data.data);
    }
  };
  console.log("sellectedItem,sellectedItem", currentComodityArr);
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

                    {currentStatus == "WAIT" && (
                      <button
                        className="ml-2 border-black border-solid border-[1px] p-1"
                        onClick={() => hanleUpdateOrder(item)}
                      >
                        Xác nhận
                      </button>
                    )}
                    {currentStatus == "TRANSPORT" && (
                      <button
                        className="ml-2 border-black border-solid border-[1px] p-1"
                        onClick={() => hanleUpdateOrder(item)}
                      >
                        Xác nhận
                      </button>
                    )}
                    {currentStatus == "DELIVERY" && (
                      <button
                        className="ml-2 border-black border-solid border-[1px] p-1"
                        onClick={() => hanleUpdateOrder(item)}
                      >
                        Xác nhận
                      </button>
                    )}
                    {currentStatus == "CREATE" && (
                      <button
                        className="ml-2 border-black border-solid border-[1px] p-1"
                        onClick={() => hanleUpdateOrder(item)}
                      >
                        Xác nhận
                      </button>
                    )}
                    {currentStatus == "FURTHER_TRANSFER" && (
                      <button
                        className="ml-2 border-black border-solid border-[1px] p-1"
                        onClick={() => hanleUpdateOrder(item)}
                      >
                        Xác nhận
                      </button>
                    )}
                    {currentStatus == "CONTINUE" && (
                      <button
                        className="ml-2 border-black border-solid border-[1px] p-1"
                        onClick={() => hanleUpdateOrder(item)}
                      >
                        Xác nhận
                      </button>
                    )}
                    {currentStatus == "STORAGE" && (
                      <button
                        className="ml-2 border-black border-solid border-[1px] p-1"
                        onClick={() => hanleUpdateOrder(item)}
                      >
                        Xác nhận
                      </button>
                    )}
                    {currentStatus == "CONTINUE" && (
                      <button
                        className="ml-2 border-black border-solid border-[1px] p-1"
                        onClick={() => hanleUpdateOrder(item)}
                      >
                        Xác nhận
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
                        {/* <div className="mt-[20px]">
                          Email người nhận: {item.receiverEmail}
                        </div> */}
                        <div className="mt-[20px]">
                          Địa chỉ người nhận {item.address}
                        </div>
                        <div className="mt-[20px]">
                          Số điện thoại người Nhận {item.phoneNumber}
                        </div>
                        {/* <div className="mt-[20px]">
                          Nơi nhận hàng:{item.receivePlace}
                        </div> */}
                        <div className="mt-[20px]">
                          Thu hộ: {item.collectMoney}
                        </div>
                        <h2 className="text-[red]">
                          Thông tin thành phần đơn hàng
                        </h2>
                        {currentComodityArr.map((item, index) => {
                          return (
                            <div className="mt-[20px]" key={index}>
                              <h3>
                                Tên hàng {index}: {item.name}
                              </h3>
                              <h3>Trọng lượng đơn hàng : {item.weight}</h3>
                              <h3>Số lượng đơn hàng : {item.amount}</h3>
                              <h3>Giá trị đơn hàng : {item.value}</h3>
                            </div>
                          );
                        })}
                        {/* <div className="mt-[20px]">Giá: {item.price}</div> */}
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

export default PostmanInformationOrder;
