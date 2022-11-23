import React, { useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getChart } from "../services/userService";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getChartPostman } from "../postmanService/postmanService";

ChartJS.register(ArcElement, Tooltip, Legend);

function PostmanStatistical() {
  const [dataChart, setDataChart] = useState("");
  const emailUser = useSelector((state) => state.user.userInfo.email);
  const [arrChart, setArrChart] = useState("");
  const [arrToLoadTable, setArrToLoadTable] = useState([]);
  const [startDate, setStartDate] = useState(new Date());

  let totalOrder = 0;
  let totalPrice = 0;
  let totalCollectMoney = 0;

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
    if (startDate) {
      getDataChart();
    }
  }, [startDate]);
  const getDataChart = async () => {
    const data = await getChartPostman(
      emailUser,
      new Date(startDate).setHours(0, 0, 0, 0) / 1000
    );

    setDataChart(data);
    setArrChart([data.successfullDelivery.length, data.took.length]);

    setArrToLoadTable([
      {
        title: "Đã lấy",
        length: data.took.length,
        collectMoney: data.took.collectMoney,
        price: data.took.price,
      },

      {
        title: "Giao thành công",
        length: data.successfullDelivery.length,
        collectMoney: data.successfullDelivery.collectMoney,
        price: data.successfullDelivery.price,
      },
    ]);
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
    labels: ["Đã lấy", "Giao thành công"],
    datasets: [
      {
        label: "# of Votes",
        data: arrChart,
        backgroundColor: ["rgba(0, 0, 0, 1);", " rgba(24, 65, 0, 1)"],
        borderColor: ["rgba(0, 0, 0, 1);", "rgba(24, 65, 0, 1)"],
        borderWidth: 1,
      },
    ],
  };
  console.log("1231321313", startDate);
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
            onChange={(date) => {
              setStartDate(date);
            }} //when day is clicked
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
                      //   const order = 0;

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

export default PostmanStatistical;
