import { useState } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { updateOrderStatusService } from "../../postmanService/postmanService";
import Pagination from "@atlaskit/pagination";
import {
  fetchDataFinished,
  fetchDataStart,
} from "../../redux/actions/appAction";
import { toast } from "react-toastify";

function OrderByPostman(props) {
  function closeModalToChange() {
    setIsOpenToChange(false);
  }
  const [modalIsOpenToChange, setIsOpenToChange] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [isLoadingPagination, setIsLoadingPagination] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPagesByPostman = props.totalPagesByPostman;
  const storageId = useSelector((state) => state.user.userInfo.storageId);
  const [sellectedItem, setSellectedItem] = useState("");
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const dispatch = useDispatch();

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
  function openModal(item) {
    setIsOpen(true);
    setSellectedItem(item);
  }
  const closeModalUpdate = () => {
    setOpenModalUpdate(false);
  };
  const openModalToUpdate = (item) => {
    setOpenModalUpdate(true);
    setSellectedItem(item);
  };
  const verifierEmail = useSelector((state) => state.user.userInfo.email);
  const update = async (item) => {
    dispatch(fetchDataStart());
    if (!item.isResend) {
      const data = await updateOrderStatusService({
        collectMoney: item.collectMoney,
        id: item.id,
        price: item.price,
        statusId: "STORAGE",
        verifierEmail: verifierEmail,
        storageId: storageId,
      });
      if (data && data.errCode == 0) {
        props.setToggle(!props.toggle);
        toast.success("Thành Công");
      } else {
        toast.error("Thất bại");
      }
    } else {
      const data = await updateOrderStatusService({
        collectMoney: item.collectMoney,
        id: item.id,
        price: item.price,
        statusId: "RESEND",
        verifierEmail: verifierEmail,
        storageId: storageId,
      });
      if (data && data.errCode == 0) {
        props.setToggle(!props.toggle);
        toast.success("Thành Công");
      } else {
        toast.error("Thất bại");
      }
    }
    dispatch(fetchDataFinished());
  };
  const handleToUpdate = async () => {
    await update(sellectedItem);
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
            {props.data &&
              props.data.map((item, index) => {
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
                        onClick={() => openModalToUpdate(item)}
                      >
                        {" "}
                        Xác nhận nhập kho
                      </button>
                      {console.log(item, sellectedItem)}
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
                              sellectedItem.senderData.provinceData
                                .provinceName}
                            ,quận/huyện{" "}
                            {sellectedItem &&
                              sellectedItem.senderData.districtData
                                .districtName}
                            ,xã/phường{" "}
                            {sellectedItem &&
                              sellectedItem.senderData.wardData.wardName}
                            ,{" "}
                            {sellectedItem && sellectedItem.senderData.address}
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
                            {sellectedItem &&
                              sellectedItem.province.provinceName}
                            ,quận/huyện{" "}
                            {sellectedItem &&
                              sellectedItem.district.districtName}
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
                            Tiền cước phí :{" "}
                            {sellectedItem && sellectedItem.price}
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
                      <Modal
                        isOpen={openModalUpdate}
                        onAfterOpen={afterOpenModal}
                        onRequestClose={closeModalUpdate}
                        style={customStyles}
                        contentLabel="Example Modal"
                      >
                        <h2>Bạn có muốn xác nhận đơn hàng này không?</h2>
                        <div className="flex items-center justify-between ">
                          <button
                            onClick={() => {
                              handleToUpdate();
                              closeModalUpdate();
                            }}
                            className="border-black border-solid border-[1px] p-[8px] bg-[blue] text-[white]  rounded-[5px]"
                          >
                            Xác nhận
                          </button>
                          <button
                            className=" top-[20px] right-[20px]  p-[8px] bg-[red]  rounded-[5px] text-[white]"
                            onClick={closeModalUpdate}
                          >
                            Cancle
                          </button>
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
        {totalPagesByPostman > 0 && (
          <div className="showPage mt-[20px] mb-[20px] ml-[auto] mf-[auto] text-center">
            <span>
              Trang {totalPagesByPostman === 0 ? 0 : currentPage}/
              {totalPagesByPostman}
            </span>
          </div>
        )}
        {totalPagesByPostman ? (
          <div className="buttonChangePage text-[center]">
            <Pagination
              pages={[...createPageArr(totalPagesByPostman)]}
              max={totalPagesByPostman >= 10 ? 8 : totalPagesByPostman}
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
        ) : (
          <div className="mt-4 text-[20px] text-[#ef4444] text-center">
            Không có đơn nào
          </div>
        )}
      </div>
    </div>
  );
}

export default OrderByPostman;
