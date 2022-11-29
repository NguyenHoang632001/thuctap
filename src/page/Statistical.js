import React, { useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getChart } from "../services/userService";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataFinished, fetchDataStart } from "../redux/actions/appAction";
import { toast } from "react-toastify";

ChartJS.register(ArcElement, Tooltip, Legend);

function Statistical() {
  const [dataChart, setDataChart] = useState("");
  const emailUser = useSelector((state) => state.user.userInfo.email);
  const [arrChart, setArrChart] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [arrToLoadTable, setArrToLoadTable] = useState([]);

  let totalOrder = 0;
  let totalPrice = 0;
  let totalCollectMoney = 0;
  const dispatch = useDispatch();

  arrToLoadTable.map((item, index) => {
    totalOrder = totalOrder + item.length;

    return totalOrder;
  });
  arrToLoadTable.map((item, index) => {
    totalPrice = totalPrice + item.price;

    return totalPrice;
  });
  arrToLoadTable.map((item, index) => {
    totalCollectMoney = totalCollectMoney + item.collectMoney;

    return totalCollectMoney;
  });

  useEffect(() => {
    getDataChart();
  }, [startDate]);
  const getDataChart = async () => {
    dispatch(fetchDataStart());
    let date = new Date(startDate).setHours(0, 0, 0, 0) / 1000;
    const data = await getChart(emailUser, date);

    setDataChart(data);
    setArrChart([
      data.cancelled.length,
      data.continu.length,
      data.create.length,
      data.delivery.length,
      data.furtherTransfer.length,
      data.handling.length,
      data.refundApproved.length,
      data.successDelivery.length,
      data.transporting.length,
      data.wait.length,
    ]);
    setArrToLoadTable([
      {
        title: "Đã hủy",
        length: data.cancelled.length,
        collectMoney: data.cancelled.collectMoney,
        price: data.cancelled.price,
      },
      {
        title: "Phát tiếp",
        length: data.continu.length,
        collectMoney: data.continu.collectMoney,
        price: data.continu.price,
      },
      {
        title: "Tạo mới",
        length: data.create.length,
        collectMoney: data.create.collectMoney,
        price: data.create.price,
      },
      {
        title: "Đang giao",
        length: data.delivery.length,
        collectMoney: data.delivery.collectMoney,
        price: data.delivery.price,
      },
      {
        title: "Đang chuyển hoàn",
        length: data.furtherTransfer.length,
        collectMoney: data.furtherTransfer.collectMoney,
        price: data.furtherTransfer.price,
      },
      {
        title: "Đang xử lí",
        length: data.handling.length,
        collectMoney: data.handling.collectMoney,
        price: data.handling.price,
      },
      {
        title: "Đã duyệt hoàn",
        length: data.refundApproved.length,
        collectMoney: data.refundApproved.collectMoney,
        price: data.refundApproved.price,
      },
      {
        title: "Giao thành công",
        length: data.successDelivery.length,
        collectMoney: data.successDelivery.collectMoney,
        price: data.successDelivery.price,
      },
      {
        title: "Đang vận chuyển",
        length: data.transporting.length,
        collectMoney: data.transporting.collectMoney,
        price: data.transporting.price,
      },
      {
        title: "Chờ lấy",
        length: data.wait.length,
        collectMoney: data.wait.collectMoney,
        price: data.wait.price,
      },
    ]);

    dispatch(fetchDataFinished());
  };
  const [itemNav, setItemNav] = useState([
    { title: "Thống kê" },
    { title: "Dòng tiền" },
  ]);
  const [active, setActive] = useState(0);
  const handleLick = (index) => {
    setActive(index);
  };

  const data = {
    labels: [
      "Đã hủy",
      "Phát tiếp",
      "Tạo mới",
      "Đang giao",
      "Đang chuyển hoàn",
      "Đang xử lí",
      "Đã duyệt hoàn",
      "Giao thành công",
      "Đang vận chuyển",
      "Chờ lấy",
    ],
    datasets: [
      {
        label: "# of Votes",
        data: arrChart,
        backgroundColor: [
          "rgba(0, 0, 0, 1);",
          " rgba(24, 65, 0, 1)",
          "rgba(96, 65, 0, 1)",
          "rgba(96, 65, 97, 1)",
          "rgba(96, 129, 97, 1)",
          "rgba(152, 129, 97, 1)",
          " rgba(226, 129, 97, 1)",
          "rgba(226, 231, 97, 1",
          "rgba(226, 41, 230, 1)",
          "rgba(16, 41, 230, 1)",
        ],
        borderColor: [
          "rgba(0, 0, 0, 1);",
          "rgba(24, 65, 0, 1)",
          "rgba(96, 65, 0, 1)",
          "rgba(96, 65, 97, 1)",
          "rgba(96, 129, 97, 1)",
          "rgba(152, 129, 97, 1)",
          " rgba(226, 129, 97, 1)",
          "rgba(226, 231, 97, 1",
          "rgba(226, 41, 230, 1)",
          "rgba(16, 41, 230, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="">
      <div className="flex justify-start items-center ml-8 ">
        {itemNav.map((item, index) => {
          return (
            <div
              key={index}
              className="border-black border-[2px] border-solid p-2 mr-8 font hover:cursor-pointer"
            >
              <div
                onClick={() => handleLick(index)}
                className={active == index ? "text-[red]" : ""}
              >
                {" "}
                {item.title}
              </div>
            </div>
          );
        })}
      </div>
      <div className="ml-8 flex justify-between items-center ">
        <div className="ml-8 text-[25px] font-extrabold mt-8 mb-8">
          {" "}
          Tiền hàng theo trạng thái
        </div>
        <div className="mr-8 flex justify-between items-center">
          <select className="h-8">
            <option>COD cước người nhận trả</option>
          </select>
          <DatePicker
            selected={startDate}
            onSelect={new Date()} //when day is clicked
            onChange={(date) => {
              setStartDate(date);
            }}
            className="decoration-emerald-300 border-[1px] border-black w-[150px] ml-[20px] h-8 "
          />
        </div>
      </div>
      <div className="flex justify-evenly items-center  h-[80px] mb-8">
        <div className="w-[200px] border-solid border-black border-[2px] p-8">
          <div>Số lượng đơn hàng</div>
          <div className="text-center mt-2 text-[green]">
            {totalOrder} <span className="text-[black]">(đơn)</span>
          </div>
        </div>
        <div className="w-[200px] border-solid border-black border-[2px] p-8">
          <div>Tổng tiền thu hộ</div>
          <div className="text-center mt-2 text-[green]">
            {totalCollectMoney} <span className="text-[black]">(VND)</span>
          </div>
        </div>
        <div className="w-[200px] border-solid border-black border-[2px] p-8">
          <div>Tổng tiền cước</div>
          <div className="text-center mt-2 text-[green]">
            {totalPrice} <span className="text-[black]">(VND)</span>
          </div>
        </div>
      </div>
      <div className="w-full flex items-center justify-between mt-[100px]">
        <div className="w-[40%]">
          <Pie
            className=""
            data={data}
            options={{
              title: {
                display: true,
                text: "Average Rainfall per month",
                fontSize: 20,
              },
              legend: {
                display: true,
                position: "right",
              },
            }}
          />
        </div>
        <div className="flex flex-col   w-[800px] mt-[0] mb-[0] ml-[auto] mr-[auto] text-center ">
          <div className="">
            <div className=" inline-block  ">
              <div className="">
                <table className="w-full border text-center">
                  <thead className="border-b ">
                    <tr className=" w-full">
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 border-r w-[100px]"
                      >
                        Trạng thái
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 border-r w-[200px]"
                      >
                        Số đơn
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 border-r w-[100px]w-[200px]"
                      >
                        Tiền thu hộ (VND)
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 w-[200px]"
                      >
                        Tiền cước
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {arrToLoadTable.map((item, index) => {
                      const order = 0;

                      return (
                        <tr className=" border-b" key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r">
                            {item.title}
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r">
                            {item.length}
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r">
                            {item.collectMoney}
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {item.price}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Statistical;
