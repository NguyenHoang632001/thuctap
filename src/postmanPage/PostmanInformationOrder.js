import React from "react";
import { useState } from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateOrderStatusService } from "../postmanService/postmanService";
import { fetchDataFinished, fetchDataStart } from "../redux/actions/appAction";
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
  const currentStatus = props.status;

  const [currentComodityArr, setCurrentCommodityArr] = useState([]);
  const [sellectedItem, setSellectedItem] = useState("");
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [itemToClick, setItemToClick] = useState("");
  const [openOpenModalToNoSucess, setOpenOpenModalToNoSucess] = useState(false);
  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);
  const [itemToNoSucess, setItemToNoSucess] = useState("");
  const [openModalToFurtherTransfer, setOpenModalToFurtherTransfer] =
    useState(false);
  const [itemToFurther, setItemToFurther] = useState("");
  const dispatch = useDispatch();

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

  const updateOrder = async (item) => {
    dispatch(fetchDataStart());
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

    let data = await updateOrderStatusService({
      id,
      statusId,
      verifierEmail,
      collectMoney,
      price: "20",
    });
    if (data && data.errCode === 0) {
      toast.success("C???p nh???t th??nh c??ng!");
      props.setToggle(!props.toggle);
    } else {
      toast.error("C???p nh???t th???t b???i");
    }
    dispatch(fetchDataFinished());
  };

  const destroyOrder = async (id) => {
    dispatch(fetchDataStart());
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
      toast.success("C???p nh???t th??nh c??ng!");
    } else {
      toast.error("C???p nh???t th???t b???i");
    }
    dispatch(fetchDataFinished());
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
  const NameForSender = useSelector((state) => state.user.userInfo.name);
  const EmailForSender = useSelector((state) => state.user.userInfo.email);
  const phoneForSender = useSelector(
    (state) => state.user.userInfo.phoneNumber
  );
  const provinceForSender = useSelector(
    (state) => state.user.userInfo.provinceData.provinceName
  );
  const districtForSender = useSelector(
    (state) => state.user.userInfo.districtData.districtName
  );
  const wardForSender = useSelector(
    (state) => state.user.userInfo.wardData.wardName
  );
  const addressForSender = useSelector((state) => state.user.userInfo.address);

  const closeModalUpdate = () => {
    setOpenModalUpdate(false);
  };
  const handleToOpenModal = (item) => {
    setOpenModalUpdate(true);
    setItemToClick(item);
  };
  const handleToOpenModalToNotSucess = (item) => {
    setOpenOpenModalToNoSucess(true);
    setItemToNoSucess(item);
  };
  const updateOrderToNoSucess = async (item) => {
    let id = item.id;
    let collectMoney = item.collectMoney;
    let price = item.price;
    let statusId = "";
    switch (currentStatus) {
      case "DELIVERY":
        statusId = "HANDLING";
        break;

      default:
        break;
    }

    let data = await updateOrderStatusService({
      id,
      statusId,
      verifierEmail,
      collectMoney,
      price: "20",
    });
    if (data && data.errCode === 0) {
      props.setToggle(!props.toggle);
      toast.success("C???p nh???t th??nh c??ng!");
    } else {
      toast.error("C???p nh???t th???t b???i");
    }
    dispatch(fetchDataFinished());
  };
  const closeModalToNoSucess = () => {
    setOpenOpenModalToNoSucess(false);
  };
  const handleUpdateOrderToNoSucess = (item) => {
    updateOrderToNoSucess(item);
  };
  const handleOpenModalToFutherTransfer = (item) => {
    setOpenModalToFurtherTransfer(true);
    setItemToFurther(item);
  };
  const closeModalToFurtherTransfer = () => {
    setOpenModalToFurtherTransfer(false);
  };
  const hanleUpdateOrderToFurthertransfer = (item) => {
    updateOrderToFurthertransfer(item);
  };

  const updateOrderToFurthertransfer = async (item) => {
    dispatch(fetchDataStart());
    let id = item.id;
    let collectMoney = item.collectMoney;
    let price = item.price;
    let statusId = "FURTHER_TRANSFER";
    // switch (currentStatus) {
    //   case "HANDLING":
    //     statusId = "RESEND";
    //     break;

    //   default:
    //     break;
    // }

    let data = await updateOrderStatusService({
      id,
      statusId,
      verifierEmail,
      collectMoney,
      price: "20",
    });
    if (data && data.errCode === 0) {
      toast.success("C???p nh???t th??nh c??ng!");
      props.setToggle(!props.toggle);
    } else {
      toast.error("C???p nh???t th???t b???i");
    }
    dispatch(fetchDataFinished());
  };

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
            <th scope="col" className="py-3 px-6 pl-[100px]">
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

                  <td className="flex items-center justify-center">
                    <button
                      onClick={() => openModal(item)}
                      className="ml-2 border-black border-solid border-[1px] p-1"
                    >
                      {" "}
                      Xem chi ti???t
                    </button>

                    {currentStatus === "WAIT" && (
                      <button
                        className="ml-2 border-black border-solid border-[1px] p-1"
                        // onClick={() => hanleUpdateOrder(item)}
                        onClick={() => handleToOpenModal(item)}
                      >
                        X??c nh???n
                      </button>
                    )}

                    {currentStatus === "TRANSPORT" && (
                      <button
                        className="ml-2 border-black border-solid border-[1px] p-1"
                        // onClick={() => hanleUpdateOrder(item)}
                        onClick={() => handleToOpenModal(item)}
                      >
                        X??c nh???n
                      </button>
                    )}
                    {currentStatus === "DELIVERY" && (
                      <div>
                        {" "}
                        <button
                          className="ml-2 border-black border-solid border-[1px] p-1"
                          // onClick={() => hanleUpdateOrder(item)}
                          onClick={() => handleToOpenModal(item)}
                        >
                          X??c nh???n
                        </button>
                        <button
                          className="ml-2 border-black border-solid border-[1px] p-1"
                          // onClick={() => hanleUpdateOrder(item)}
                          onClick={() => handleToOpenModalToNotSucess(item)}
                        >
                          Giao kh??ng th??nh c??ng
                        </button>
                      </div>
                    )}
                    {currentStatus === "CREATE" && (
                      <button
                        className="ml-2 border-black border-solid border-[1px] p-1"
                        // onClick={() => hanleUpdateOrder(item)}
                        onClick={() => handleToOpenModal(item)}
                      >
                        X??c nh???n
                      </button>
                    )}
                    {currentStatus === "FURTHER_TRANSFER" && (
                      <button
                        className="ml-2 border-black border-solid border-[1px] p-1"
                        // onClick={() => hanleUpdateOrder(item)}
                        onClick={() => handleToOpenModal(item)}
                      >
                        X??c nh???n
                      </button>
                    )}
                    {currentStatus === "CONTINUE" && (
                      <button
                        className="ml-2 border-black border-solid border-[1px] p-1"
                        // onClick={() => hanleUpdateOrder(item)}
                        onClick={() => handleToOpenModal(item)}
                      >
                        X??c nh???n
                      </button>
                    )}
                    {currentStatus === "STORAGE" && (
                      <button
                        className="ml-2 border-black border-solid border-[1px] p-1"
                        // onClick={() => hanleUpdateOrder(item)}
                        onClick={() => handleToOpenModal(item)}
                      >
                        X??c nh???n
                      </button>
                    )}
                    {currentStatus === "RESEND" && (
                      <button
                        className="ml-2 border-black border-solid border-[1px] p-1"
                        // onClick={() => hanleUpdateOrder(item)}
                        onClick={() => handleOpenModalToFutherTransfer(item)}
                      >
                        X??c nh???n chuy???n ho??n
                      </button>
                    )}

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
                            console.log("sellectedItem", sellectedItem);
                            hanleUpdateOrder(itemToClick);
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
                    <Modal
                      isOpen={openModalToFurtherTransfer}
                      onAfterOpen={afterOpenModal}
                      onRequestClose={closeModalUpdate}
                      style={customStyles}
                      contentLabel="Example Modal"
                    >
                      <h2>B???n c?? mu???n x??c nh???n ????n h??ng n??y kh??ng?</h2>
                      <div className="flex items-center justify-between ">
                        <button
                          onClick={() => {
                            hanleUpdateOrderToFurthertransfer(itemToFurther);
                            closeModalToFurtherTransfer();
                          }}
                          className="border-black border-solid border-[1px] p-[8px] bg-[blue] text-[white]  rounded-[5px]"
                        >
                          X??c nh???n chuy???n ho??n
                        </button>
                        <button
                          className=" top-[20px] right-[20px]  p-[8px] bg-[red]  rounded-[5px] text-[white]"
                          onClick={closeModalToFurtherTransfer}
                        >
                          Cancle
                        </button>
                      </div>
                    </Modal>
                    <Modal
                      isOpen={openOpenModalToNoSucess}
                      onAfterOpen={afterOpenModal}
                      onRequestClose={closeModalUpdate}
                      style={customStyles}
                      contentLabel="Example Modal"
                    >
                      <h2>
                        B???n c?? mu???n x??c nh???n ????n h??ng giao kh??ng th??nh c??ng?
                      </h2>
                      <div className="flex items-center justify-between ">
                        <button
                          onClick={() => {
                            // hanleUpdateOrder(itemToClick);
                            handleUpdateOrderToNoSucess(itemToNoSucess);
                            closeModalToNoSucess();
                          }}
                          className="border-black border-solid border-[1px] p-[8px] bg-[blue] text-[white]  rounded-[5px]"
                        >
                          X??c nh???n giao kh??ng th??nh c??ng
                        </button>
                        <button
                          className=" top-[20px] right-[20px]  p-[8px] bg-[red]  rounded-[5px] text-[white]"
                          onClick={closeModalToNoSucess}
                        >
                          Cancle
                        </button>
                      </div>
                    </Modal>

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
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default PostmanInformationOrder;
