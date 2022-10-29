import React from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";
import ReactPaginate from "react-paginate";

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
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }
  return (
    <div className="overflow-x-auto relative">
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
              console.log(item);
              return (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
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

                  <div>
                    <button onClick={openModal}> Xem chi tiết</button>
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
                  </div>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default InformationOrder;
