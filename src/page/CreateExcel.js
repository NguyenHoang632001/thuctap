import { useState } from "react";
import { readFileSync, utils, writeFileXLSX } from "xlsx";
import { bulkCreateOrderService } from "../services/userService";
function CreateExcel() {
  const [arrInfo, setArrInfo] = useState([]);
  const date = new Date().setHours(0, 0, 0, 0);
  const arrMAster = [
    {
      "Mã đơn hàng": "ssa3432kdsf34",
      "Email người gửi": "nguyenhoang632001@gmail.com",
      "Tên người nhận": "Phạm tới",
      "Số điện thoại người nhận": "0343255434242",
      "Địa chỉ người nhận": "Quảng NGãi",
      "Tên vật phẩm": "Điện thoại",
      "Số lượng vật phẩm": "1",
      "Trọng lượng vật phẩm": "200",
      "Giá trị vật phẩm": "6000000",
      "Người trả phí": "Người gửi",
      "Tiền thu hộ": "200000",
    },
  ];

  const handleFile = async (e) => {
    const file = e.target.files[0];
    const data = await file.arrayBuffer();
    const workbook = readFileSync(data);
    const workSheet = workbook.Sheets[workbook.SheetNames[0]];
    const objData = utils.sheet_to_json(workSheet);
    setArrInfo(objData);
  };
  const writeFileExcel = async () => {
    const wb = utils.book_new();
    const ws = utils.json_to_sheet(arrMAster);
    utils.book_append_sheet(wb, ws, "mysheet1");
    await writeFileXLSX(wb, "exportExcel.xlsx");
  };

  function unique(arr) {
    let arr1 = [];
    let arr2 = [];
    arrInfo.map((item) => {
      return arr1.includes(
        JSON.stringify([item["Mã đơn hàng"], item["Email người gửi"]])
      )
        ? ""
        : arr1.push(
            JSON.stringify([item["Mã đơn hàng"], item["Email người gửi"]])
          ) && arr2.push(item);
    });
    return arr2;
  }
  console.log("arrInfo", arrInfo);
  const orderData = unique(arrInfo);
  console.log("orderData", orderData);
  const data = {
    orderArr: orderData.map((item) => {
      return {
        senderEmail: item["Email người gửi"],
        fullName: item["Tên người nhận"],
        address: item["Địa chỉ người nhận"],
        orderCode: item["Mã đơn hàng"],
        collecMoney: item["Tiền thu hộ"],
        price: item["Cước phí"],
        statusId: "CREATE",
        date: date,
        receiverEmail: item["Email người nhận"],
      };
    }),
    commodityArr: arrInfo.map((item) => {
      return {
        orderCode: item["Mã đơn hàng"],
        name: item["Tên vật phẩm"],
        amount: item["Số lượng vật phẩm"],
        value: item["Giá trị vật phẩm"],
        weight: item["Trọng lượng vật phẩm"],
        senderEmail: item["Email người gửi"],
      };
    }),
  };
  const handleToPushOrder = () => {
    bulkCreateOrder(data);
  };
  const bulkCreateOrder = async (data) => {
    await bulkCreateOrderService(data);
  };
  return (
    <div className="w-[90%] mt-[0] mb-[0] ml-[auto] mr-[auto] bg-[#eeeeee]">
      <h2 className="text-xl">NHẬP ĐƠN HÀNG TỪ FILE</h2>
      <div className="flex  mt-8 w-[48%]  justify-between items-center">
        <button
          className="text-lg p-[5px]  border-[1px] border-black bg-neutral-300"
          onClick={() => writeFileExcel()}
        >
          Tải file mẫu
        </button>
        <input type="file" onChange={(e) => handleFile(e)} />
        <button
          className="bg-[#6124ed] p-[10px] text-white"
          onClick={() => handleToPushOrder()}
        >
          Đẩy đơn lên
        </button>
      </div>
    </div>
  );
}

export default CreateExcel;

{
  {
    /* <button className="text-lg p-2  border-[1px] border-black bg-neutral-300">
          Mở file
        </button> */
  }
  /* <button className="text-lg p-2  border-[1px] border-black bg-neutral-300">
  Lịch sử tải file
</button> */
}
{
  /* <button className="text-lg p-2  border-[1px] border-black bg-neutral-300">
  Nhập Excel cũ
</button> */
}
