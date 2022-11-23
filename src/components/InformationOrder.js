import React from "react";
import { useEffect } from "react";
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

function InformationOrder({ ...props }) {
  const [sellectedItem, setSellectedItem] = useState("");
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [currentComodityArr, setCurrentCommodityArr] = useState([]);

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
  }

  useEffect(() => {
    if (sellectedItem.senderEmail && sellectedItem.orderCode) {
      getCommodity();
    }
  }, [sellectedItem.senderEmail, sellectedItem.orderCode]);
  const getCommodity = async () => {
    const data = await getInformationCommodity(
      sellectedItem.senderEmail,
      sellectedItem.orderCode
    );
    if (data && data.errCode === 0) {
      setCurrentCommodityArr(data.data);
    }
  };

  const handleToCancle = (item) => {
    updateOrder(item);
  };
  const verifierEmail = useSelector((state) => state.user.userInfo.email);

  const updateOrder = async (item) => {
    let id = item.id;
    let collectMoney = item.collectMoney;
    let price = "0";
    let statusId = "";
    switch (props.currentStatus) {
      case "CREATE":
        statusId = "CANCLE";
        break;

      default:
        break;
    }

    let data = await updateOrderStatusService({
      id,
      statusId: "CANCLE",
      verifierEmail,
      collectMoney,
      price,
    });
    if (data && data.errCode === 0) {
      props.setToggle(!props.toggle);
    }
  };

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
                    <button onClick={() => openModal(item)}>
                      {" "}
                      Xem chi tiết
                    </button>
                    {props.currentStatus === "CREATE" ? (
                      <button
                        className="ml-[10px]"
                        onClick={() => {
                          handleToCancle(item);
                        }}
                      >
                        {" "}
                        Hủy đơn
                      </button>
                    ) : (
                      <span></span>
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
                          Mã đơn hàng {sellectedItem && sellectedItem.orderCode}
                        </div>

                        <div className="mt-[20px]">
                          Người gửi:{" "}
                          {sellectedItem && sellectedItem.senderEmail}
                        </div>
                        <div className="mt-[20px]">
                          Người nhận: {sellectedItem && sellectedItem.fullName}
                        </div>
                        {/* <div className="mt-[20px]">
                          Email người nhận:{" "}
                          {sellectedItem && sellectedItem.receiverEmail}
                        </div> */}

                        <div className="mt-[20px]">
                          Địa chỉ người nhận:{" "}
                          {sellectedItem && sellectedItem.address}
                        </div>

                        <div className="mt-[20px]">
                          Thu hộ: {sellectedItem && sellectedItem.collectMoney}
                        </div>
                        <div className="mt-[20px]">
                          Tiền Cước Phí: 20.000 VND
                        </div>
                        <h2 className="text-[red]">Thông tin mỗi đơn hàng </h2>
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

export default InformationOrder;
