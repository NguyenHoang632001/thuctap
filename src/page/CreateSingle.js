import CreateSingleBody from "../components/CreateSingleBody";
import "./CreateSingle.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faPlus, faFileExcel } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

function CreateSingle() {
  const [itemNav, setItemNav] = useState([
    { font: faGear, title: "Cài đặt" },
    {
      font: faPlus,
      title: "Tạo đơn theo mẫu",
    },
    {
      font: faFileExcel,
      title: "Nhập excel",
    },
  ]);
  const [active, setActive] = useState(0);
  const handleClick = (index) => {
    setActive(index);
  };
  return (
    <div className="containerCreateSingle">
      <div className="createOrder">
        <span className="itemCreateOrder">Tạo đơn </span>
      </div>
      <div className="navCreateSingle">
        {itemNav.map((item, index) => {
          return (
            <div
              onClick={() => handleClick(index)}
              className={active == index && "text-[red]"}
            >
              <div className="ml-[20px] bg-slate-400 p-4">
                {" "}
                <FontAwesomeIcon icon={item.font} className="pr-2" />
                <span className="titleItemCreateSingle">{item.title}</span>
              </div>
            </div>
          );
        })}
      </div>
      <CreateSingleBody />
    </div>
  );
}

export default CreateSingle;
