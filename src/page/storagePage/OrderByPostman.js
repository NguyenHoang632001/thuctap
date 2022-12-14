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
        toast.success("Th??nh C??ng");
      } else {
        toast.error("Th???t b???i");
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
        toast.success("Th??nh C??ng");
      } else {
        toast.error("Th???t b???i");
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
                        onClick={() => openModal(item)}
                        className="ml-2 border-black border-solid border-[1px] p-1"
                      >
                        {" "}
                        Xem chi ti???t
                      </button>
                      <button
                        className="ml-2 border-black border-solid border-[1px] p-1"
                        onClick={() => openModalToUpdate(item)}
                      >
                        {" "}
                        X??c nh???n nh???p kho
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
                              sellectedItem.senderData.provinceData
                                .provinceName}
                            ,qu???n/huy???n{" "}
                            {sellectedItem &&
                              sellectedItem.senderData.districtData
                                .districtName}
                            ,x??/ph?????ng{" "}
                            {sellectedItem &&
                              sellectedItem.senderData.wardData.wardName}
                            ,{" "}
                            {sellectedItem && sellectedItem.senderData.address}
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
                            {sellectedItem &&
                              sellectedItem.province.provinceName}
                            ,qu???n/huy???n{" "}
                            {sellectedItem &&
                              sellectedItem.district.districtName}
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
                            Ti???n c?????c ph?? :{" "}
                            {sellectedItem && sellectedItem.price}
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
                      <Modal
                        isOpen={openModalUpdate}
                        onAfterOpen={afterOpenModal}
                        onRequestClose={closeModalUpdate}
                        style={customStyles}
                        contentLabel="Example Modal"
                      >
                        <h2>B???n c?? mu???n x??c nh???n ????n h??ng n??y kh??ng?</h2>
                        <div className="flex items-center justify-between ">
                          <button
                            onClick={() => {
                              handleToUpdate();
                              closeModalUpdate();
                            }}
                            className="border-black border-solid border-[1px] p-[8px] bg-[blue] text-[white]  rounded-[5px]"
                          >
                            X??c nh???n
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
            Kh??ng c?? ????n n??o
          </div>
        )}
      </div>
    </div>
  );
}

export default OrderByPostman;
