import { data } from "autoprefixer";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { readFileSync, utils, writeFileXLSX } from "xlsx";
import { fetchDataFinished, fetchDataStart } from "../redux/actions/appAction";
import { bulkCreateOrderService } from "../services/userService";
function CreateExcel() {
  const [arrInfo, setArrInfo] = useState([]);
  const date = new Date().setHours(0, 0, 0, 0) / 1000;
  const senderEmail = useSelector((state) => state.user.userInfo.email);
  const arrMAster = [
    {
      "Mã đơn hàng": "ssa3432kdsf34",
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
  const userInfo = useSelector((state) => state.user.userInfo);

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
      return arr1.includes(JSON.stringify([item["Mã đơn hàng"]]))
        ? ""
        : arr1.push(JSON.stringify([item["Mã đơn hàng"]])) && arr2.push(item);
    });
    return arr2;
  }
  const orderData = unique(arrInfo);

  let commodityArr = arrInfo.map((item) => {
    return {
      orderCode: item["Mã đơn hàng"],
      name: item["Tên vật phẩm"],
      amount: item["Số lượng vật phẩm"],
      value: item["Giá trị vật phẩm"],
      weight: item["Trọng lượng vật phẩm"],
      senderEmail: senderEmail,
    };
  });
  const data = {
    orderArr: orderData.map((item) => {
      let comArr = commodityArr.filter((etem) => {
        return item["Mã đơn hàng"] === etem.orderCode;
      });
      const addressArr = item["Địa chỉ người nhận"].split(", ", 3);
      const char =
        addressArr[0] + ", " + addressArr[1] + ", " + addressArr[2] + ", ";
      let lengthModify = item["Địa chỉ người nhận"].length - char.length;
      let end = item["Địa chỉ người nhận"].length;
      const address = item["Địa chỉ người nhận"].slice(-lengthModify, end);

      return {
        senderEmail: senderEmail,
        fullName: item["Tên người nhận"],
        address: address,
        orderCode: item["Mã đơn hàng"],
        collectMoney: item["Tiền thu hộ"],
        phoneNumber: item["Số điện thoại người nhận"],
        statusId: "CREATE",
        date: date,
        receiverEmail: item["Email người nhận"],
        freightPayer: item["Người trả phí"],
        provinceId: addressArr[0],
        wardId: addressArr[2],
        districtId: addressArr[1],
        senderWardid: userInfo.wardData && userInfo.wardData.id,
        commodityValue: comArr.reduce((total, com) => {
          return total + Number(com.value) * Number(com.amount);
        }, 0),
        totalWeight: comArr.reduce((total, com) => {
          return total + Number(com.weight) * Number(com.amount);
        }, 0),
      };
    }),
    commodityArr: commodityArr,
    senderEmail: senderEmail,
  };
  const dispatch = useDispatch();
  const handleToPushOrder = () => {
    bulkCreateOrder(data);
  };
  const bulkCreateOrder = async (data) => {
    if (!userInfo.wardData) {
      toast.info("Vui lòng cập nhật thông tin người dùng");
    } else {
      dispatch(fetchDataStart());
      let res = await bulkCreateOrderService(data);
      if (res && res.errCode === 0) {
        toast.success("Đẩy đơn thành công!");
      } else {
        toast.error("Đẩy đơn thất bại!");
      }
      dispatch(fetchDataFinished());
    }
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
      <div className="mt-[20px]">
        Chú ý format trong file Excel:
        <h2 className="pt-[10px] pb-[10px]">
          Tỉnh thì T.Tên Tỉnh, ví dụ T.Bình Định
        </h2>
        <h2 className="pt-[10px] pb-[10px]">
          Thành phố thì TP.Tên Thành Phố, ví dụ TP.Hồ Chí Minh
        </h2>
        <h2 className="pt-[10px] pb-[10px]">
          Quận thì Q.Tên Quận, ví dụ Q.Bình Thạnh
        </h2>
        <h2 className="pt-[10px] pb-[10px]">
          Huyện thì H.Tên Huyện, ví dụ H.phù Mỹ
        </h2>
        <h2 className="pt-[10px] pb-[10px]">Xã thì X.Tên Xã, ví dụ X.Mỹ Lộc</h2>
        <h2 className="pt-[10px] pb-[10px]">
          Phường thì P.Tên Phường, ví dụ P.26c
        </h2>
        <h2 className="text-[red]">Ghi vào file excel theo quy chuẩn sau:</h2>
        <h2 className="pt-[10px] pb-[10px]">
          Tỉnh/Thành Phố, Quận/Huyện, Xã/Phường, Đường,{" "}
          <p className="font-bold pt-[10px] pb-[10px]">
            ví dụ: TP.Hồ Chí Minh, Q.Bình Thạnh, P.26, Số 43 đường số 7 Bạch
            Đằng
          </p>
        </h2>
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
