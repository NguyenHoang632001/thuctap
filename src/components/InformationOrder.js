import React, { useRef } from "react";
import { useState } from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";
import { toast } from "react-toastify";
import { updateOrderStatusService } from "../postmanService/postmanService";
import { fetchDataFinished, fetchDataStart } from "../redux/actions/appAction";

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
  const [openToDetroy, setOpenToDetroy] = useState(false);
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [itemToDetroy, setItemToDetroy] = useState("");
  const [openToResend, setOpenToResend] = useState(false);
  const [itemToReSend, setItemToResend] = useState("");
  const [openModalContinu, setOpenModalContinu] = useState(false);
  let dispatch = useDispatch();
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

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

  const handleToCancle = (item) => {
    updateOrder(item);
  };
  const verifierEmail = useSelector((state) => state.user.userInfo.email);

  const updateOrder = async (item) => {
    dispatch(fetchDataStart());
    let id = item.id;
    let collectMoney = item.collectMoney;
    let price = item.price;
    let statusId = "";
    let toastSuccess = "";
    let toastFailed = "";
    switch (props.currentStatus) {
      case "CREATE":
        statusId = "CANCLE";
        toastSuccess = "H???y th??nh c??ng!";
        toastFailed = "H???y th???t b???i!";
        break;

      default:
        break;
    }

    let data = await updateOrderStatusService({
      id,
      statusId: statusId,
      verifierEmail,
      collectMoney,
      price,
    });
    if (data && data.errCode === 0) {
      props.setToggle(!props.toggle);
      toast.success(toastSuccess);
    } else {
      toast.error(toastFailed);
      dispatch(fetchDataFinished());
    }
  };
  const closeModalDetroy = () => {
    setOpenToDetroy(false);
  };
  const openModalToDetroy = (item) => {
    setItemToDetroy(item);
    setOpenToDetroy(true);
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
  const openModalToResend = (item) => {
    setOpenToResend(true);
    setItemToResend(item);
  };
  const closeModelToResend = () => {
    setOpenToResend(false);
  };
  const updateOrderToResend = async (item, status) => {
    let id = item.id;
    let collectMoney = item.collectMoney;
    let price = item.price;
    // switch (currentStatus) {
    //   case "HANDLING":
    //     statusId = "RESEND";
    //     break;

    //   default:
    //     break;
    // }
    console.log(status);

    let data = await updateOrderStatusService({
      id,
      statusId: status,
      verifierEmail,
      collectMoney,
      price: "20",
    });
    if (data && data.errCode === 0) {
      props.setToggle(!props.toggle);
    }
  };
  const handleUpdateOrderToReSend = (item, status) => {
    updateOrderToResend(item, status);
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
                    <button onClick={() => openModal(item)}>
                      {" "}
                      Xem chi ti???t
                    </button>
                    {props.currentStatus === "CREATE" ? (
                      <button
                        className="ml-[10px]"
                        // onClick={() => {
                        //   handleToCancle(item);
                        // }}
                        onClick={() => openModalToDetroy(item)}
                      >
                        {" "}
                        H???y ????n
                      </button>
                    ) : (
                      <span></span>
                    )}
                    {props.currentStatus === "HANDLING" ? (
                      <div>
                        <button
                          className="ml-[10px]"
                          // onClick={() => {
                          //   handleToCancle(item);
                          // }}
                          // onClick={() => openModalToDetroy(item)}
                          onClick={() => {
                            setOpenModalContinu(true);
                            setItemToResend(item);
                          }}
                        >
                          {" "}
                          Ph??t Ti???p
                        </button>
                        <button
                          className="ml-[10px]"
                          // onClick={() => {
                          //   handleToCancle(item);
                          // }}
                          onClick={() => openModalToResend(item)}
                        >
                          {" "}
                          Chuy???n Ho??n
                        </button>
                      </div>
                    ) : (
                      <span></span>
                    )}
                    <Modal
                      isOpen={openToDetroy}
                      onAfterOpen={afterOpenModal}
                      onRequestClose={closeModal}
                      style={customStyles}
                      contentLabel="Example Modal"
                    >
                      <h2>B???n c?? mu???n h???y ????n h??ng n??y kh??ng?</h2>
                      <div className="flex items-center justify-between ">
                        <button
                          onClick={() => {
                            handleToCancle(itemToDetroy);
                            closeModalDetroy();
                          }}
                          className="border-black border-solid border-[1px] p-[8px] bg-[blue] text-[white]  rounded-[5px]"
                        >
                          H???y ????n
                        </button>
                        <button
                          className=" top-[20px] right-[20px]  p-[8px] bg-[red]  rounded-[5px] text-[white]"
                          onClick={closeModalDetroy}
                        >
                          Cancle
                        </button>
                      </div>
                    </Modal>
                    <Modal
                      isOpen={openToResend}
                      onAfterOpen={afterOpenModal}
                      onRequestClose={closeModal}
                      style={customStyles}
                      contentLabel="Example Modal"
                    >
                      <h2>B???n c?? mu???n chuy???n ho??n h??ng n??y kh??ng?</h2>
                      <div className="flex items-center justify-between ">
                        <button
                          onClick={() => {
                            // handleToCancle(itemToDetroy);
                            handleUpdateOrderToReSend(itemToReSend, "RESEND");
                            closeModelToResend();
                          }}
                          className="border-black border-solid border-[1px] p-[8px] bg-[blue] text-[white]  rounded-[5px]"
                        >
                          Chuy???n ho??n
                        </button>
                        <button
                          className=" top-[20px] right-[20px]  p-[8px] bg-[red]  rounded-[5px] text-[white]"
                          onClick={closeModelToResend}
                        >
                          Cancle
                        </button>
                      </div>
                    </Modal>
                    <Modal
                      isOpen={openModalContinu}
                      onAfterOpen={afterOpenModal}
                      onRequestClose={() => setOpenModalContinu(false)}
                      style={customStyles}
                      contentLabel="Example Modal"
                    >
                      <h2>B???n c?? mu???n ph??t ti???p h??ng n??y kh??ng?</h2>
                      <div className="flex items-center justify-between ">
                        <button
                          onClick={() => {
                            // handleToCancle(itemToDetroy);
                            handleUpdateOrderToReSend(itemToReSend, "STORAGE");
                            closeModelToResend();
                          }}
                          className="border-black border-solid border-[1px] p-[8px] bg-[blue] text-[white]  rounded-[5px]"
                        >
                          Ph??t ti???p
                        </button>
                        <button
                          className=" top-[20px] right-[20px]  p-[8px] bg-[red]  rounded-[5px] text-[white]"
                          onClick={() => setOpenModalContinu(false)}
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
                      <button
                        className="absolute top-[20px] right-[20px]  p-[8px] bg-[red]  rounded-[5px] text-[white]"
                        onClick={closeModal}
                      >
                        Close
                      </button>
                      <div ref={componentRef} className="pl-[50px] pt-[50px]">
                        <div className="flex items-center justify-between w-[500px] ">
                          <h2
                            ref={(_subtitle) => (subtitle = _subtitle)}
                            className="text-[blue]"
                          >
                            TH??NG TIN ????N H??NG
                          </h2>
                        </div>
                        <div className="mt-[20px]">
                          <h2 className="text-[red] font-bold">
                            {" "}
                            Th??ng tin ng?????i g???i
                          </h2>
                          <div className="mt-[20px]">
                            T??n ng?????i g???i: {NameForSender}
                          </div>
                          <div className="mt-[20px]">
                            Email ng?????i g???i: {EmailForSender}
                          </div>
                          <div className="mt-[20px]">
                            SDT ng?????i g???i: {phoneForSender}
                          </div>
                          <div className="mt-[20px]">
                            ?????a ch??? ng?????i g???i: T???nh/th??nh ph???{" "}
                            {provinceForSender},qu???n/huy???n {districtForSender}
                            ,x??/ph?????ng {wardForSender}, {addressForSender}
                          </div>

                          <h2 className="text-[red] font-bold mt-[20px]">
                            {" "}
                            Th??ng tin ng?????i nh???n
                          </h2>
                          <div className="mt-[20px]">
                            M?? ????n h??ng{" "}
                            {sellectedItem && sellectedItem.orderCode}
                          </div>

                          <div className="mt-[20px] mb-[20px]">
                            T??n ng?????i nh???n:{" "}
                            {sellectedItem && sellectedItem.fullName}
                          </div>
                          <div className="mt-[20px] mb-[20px]">
                            SDT ng?????i nh???n:{" "}
                            {sellectedItem && sellectedItem.phoneNumber}
                          </div>
                          <h2>
                            ?????a ch??? ng?????i nh???n :{" "}
                            {sellectedItem &&
                              sellectedItem.province.provinceName}
                            ,
                            {sellectedItem &&
                              sellectedItem.district.districtName}
                            , {sellectedItem && sellectedItem.ward.wardName},{" "}
                            {sellectedItem && sellectedItem.address}
                          </h2>

                          {/* <div className="mt-[20px]">
                          Email ng?????i nh???n:{" "}
                          {sellectedItem && sellectedItem.receiverEmail}
                        </div> */}

                          <div className="mt-[20px]">
                            Thu h???:{" "}
                            {sellectedItem &&
                              sellectedItem.collectMoney.replace(
                                /\B(?=(\d{3})+(?!\d))/g,
                                ","
                              )}{" "}
                            VN??
                          </div>
                          <div className="mt-[20px]">
                            Ti???n C?????c Ph??:{" "}
                            {sellectedItem &&
                              sellectedItem.price.replace(
                                /\B(?=(\d{3})+(?!\d))/g,
                                ","
                              )}{" "}
                            VN?? / Ng?????i tr??? ph?? :{" "}
                            {sellectedItem && sellectedItem.freightPayer}
                          </div>
                          <div className="mt-[20px]">
                            Ch?? th??ch ng?????i g???i h??ng:{" "}
                            {sellectedItem && sellectedItem.note}
                          </div>
                          <h2 className="text-[red] mt-[20px]">
                            Th??ng tin m???i ????n h??ng{" "}
                          </h2>
                          {sellectedItem.commodityData &&
                            sellectedItem.commodityData.map((item, index) => {
                              return (
                                <div className="mt-[20px]" key={index}>
                                  <h3>
                                    T??n h??ng {index}: {item.name}
                                  </h3>
                                  <h3>Tr???ng l?????ng ????n h??ng : {item.weight}</h3>
                                  <h3>S??? l?????ng ????n h??ng : {item.amount}</h3>
                                  <h3>
                                    Gi?? tr??? ????n h??ng :{" "}
                                    {item.value.replace(
                                      /\B(?=(\d{3})+(?!\d))/g,
                                      ","
                                    )}{" "}
                                    VN??
                                  </h3>
                                </div>
                              );
                            })}
                        </div>
                      </div>
                      <button
                        onClick={handlePrint}
                        className="border-black border-solid border-[1px] p-[8px] bg-[blue] text-[white]  rounded-[5px] mt-[20px] ml-[200px]"
                      >
                        Print this out!
                      </button>
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
