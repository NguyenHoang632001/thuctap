import { useState } from "react";
import Modal from "react-modal";
import { useSelector } from "react-redux";
import { updateOrderStatusService } from "../../postmanService/postmanService";
import Pagination from "@atlaskit/pagination";

function OrderByOtherStorage(props) {
  function closeModalToChange() {
    setIsOpenToChange(false);
  }
  const [modalIsOpenToChange, setIsOpenToChange] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [isLoadingPagination, setIsLoadingPagination] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPagesByStorage = props.totalPagesByStorage;

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
  let subtitle;
  function closeModal() {
    setIsOpen(false);
  }
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }
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
  function openModal() {
    setIsOpen(true);
  }
  const verifierEmail = useSelector((state) => state.user.userInfo.email);
  const update = async (item) => {
    const data = await updateOrderStatusService({
      collectMoney: item.collectMoney,
      id: item.id,
      price: item.price,
      statusId: "STORAGE",
      verifierEmail: verifierEmail,
    });
  };
  const handleToUpdate = async (item) => {
    await update(item);
    props.setToggle(!props.toggle);
  };
  const createPageArr = (pages) => {
    let pageArr = [];
    for (let i = 1; i <= pages; i++) {
      pageArr.push(i);
    }
    return pageArr;
  };
  return (
    <div>
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
            {props.data &&
              props.data.map((item, index) => {
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
                        onClick={openModal}
                        className="ml-2 border-black border-solid border-[1px] p-1"
                      >
                        {" "}
                        Xem chi ti???t
                      </button>
                      <button
                        className="ml-2 border-black border-solid border-[1px] p-1"
                        onClick={() => handleToUpdate(item)}
                      >
                        {" "}
                        X??c nh???n nh???p kho
                      </button>

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
                            TH??NG TIN ????N H??NG
                          </h2>
                          <button onClick={closeModal}>Close</button>
                        </div>
                        <div className="mt-[20px]">
                          <div className="mt-[20px]">
                            M?? ????n h??ng {item.orderCode}
                          </div>

                          <div className="mt-[20px]">
                            Ng?????i g???i: {item.senderEmail}
                          </div>
                          <div className="mt-[20px]">
                            Ng?????i nh???n: {item.fullName}
                          </div>
                          <div className="mt-[20px]">
                            Email ng?????i nh???n: {item.receiverEmail}
                          </div>
                          <div className="mt-[20px]">
                            ?????a ch??? ng?????i nh???n {item.address}
                          </div>
                          <div className="mt-[20px]">
                            N??i nh???n h??ng:{item.receivePlace}
                          </div>
                          <div className="mt-[20px]">
                            Thu h???: {item.collectMoney}
                          </div>
                          <div className="mt-[20px]">Gi??: {item.price}</div>
                        </div>
                      </Modal>
                    </td>
                    <td key={index}>
                      <Modal
                        isOpen={modalIsOpenToChange}
                        onAfterOpen={afterOpenModal}
                        onRequestClose={closeModal}
                        style={customStylesToChange}
                        contentLabel="Example Modal"
                      ></Modal>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <div className="showPage mt-[20px] mb-[20px] ml-[auto] mf-[auto] text-center">
          <span>
            Trang {totalPagesByStorage === 0 ? 0 : currentPage}/
            {totalPagesByStorage}
          </span>
        </div>
        {isLoadingPagination && (
          <div className="buttonChangePage text-[center]">
            <Pagination
              pages={[...createPageArr(totalPagesByStorage)]}
              max={totalPagesByStorage >= 10 ? 8 : totalPagesByStorage}
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
    </div>
  );
}

export default OrderByOtherStorage;
