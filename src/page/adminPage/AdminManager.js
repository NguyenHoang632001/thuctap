import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import Modal from "react-modal";
import {
  getUserService,
  updatePermissionService,
} from "../../adminService.js/adminService";
import { getAllStorage } from "../../postmanService/postmanService";

function AdminManager() {
  const [modi, setModi] = useState("R4");
  const [dataUser, setDataUser] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [permission, setPermission] = useState("R3");
  const [takeallStorage, setTakeAllStorage] = useState([]);
  const [storageId, setStorageId] = useState(1);
  const [selectedItem, setSelectedItem] = useState({});
  const status = [
    { name: "User", modi: "R4" },
    { name: "Postman", modi: "R3" },
    { name: "Storage Manager", modi: "R2" },
  ];
  //   const roleId = useSelector((state) => console.log(state.user));
  useEffect(() => {
    getUser();
  }, [modi]);
  let subtitle;
  const getUser = async () => {
    const data = await getUserService(1, 8, modi);
    if (data && data.errCode === 0) {
      setDataUser(data.data.rows);
    }
  };
  function openModal(item) {
    setSelectedItem(item);
    setIsOpen(true);
  }
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }
  function closeModal() {
    setIsOpen(false);
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
  const role = [
    { name: "Postman", value: "R3" },
    { name: "Storage manager", value: "R2" },
    { name: "User", value: "R4" },
  ];
  console.log("permission", permission);
  useEffect(() => {
    allStorage();
  }, []);
  const allStorage = async () => {
    const allStorage = await getAllStorage();
    if (allStorage && allStorage.errCode === 0) {
      setTakeAllStorage(allStorage.data);
    }
  };
  console.log("takeallStorage", takeallStorage);
  console.log("storageId", storageId);
  const updatePermission = async () => {
    if (permission === "R2") {
      const data = await updatePermissionService({
        id: selectedItem.id,
        roleId: permission,
        storageId: storageId,
      });
    } else {
      const data = await updatePermissionService({
        id: selectedItem.id,
        roleId: permission,
      });
    }
  };
  const handleToUpdate = (id) => {
    updatePermission(id);
  };
  return (
    <div>
      <div>Quản lí User, Postmain, Storage Manager</div>
      <div className="text-center">
        {" "}
        {status.map((item, index) => {
          return (
            <button
              className="p-[20px]"
              onClick={() => setModi(item.modi)}
              key={index}
            >
              {modi == item.modi ? (
                <span className="text-[red]">{item.name}</span>
              ) : (
                <span>{item.name}</span>
              )}
            </button>
          );
        })}
      </div>
      <div className="text-center flex items-center justify-center">
        <table className="p-[50px] ">
          <tr className="p-[40px]">
            <th className="p-[40px]">Name</th>
            <th className="p-[40px]">Email</th>
            <th className="p-[40px]">phoneNumber</th>
            <th className="p-[40px]">Thao tác</th>
          </tr>
          {dataUser &&
            dataUser.map((item, index) => {
              console.log(dataUser);
              return (
                <tr className="p-[40px]" key={item.id}>
                  <td className="p-[40px]">{item.name}</td>
                  <td className="p-[40px]">{item.email}</td>
                  <td className="p-[40px]"> {item.phoneNumber}</td>
                  <td>
                    {" "}
                    <button
                      onClick={() => openModal(item)}
                      className="ml-2 border-black border-solid border-[1px] p-1"
                    >
                      {" "}
                      Chuyển quyền
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
                          THÔNG TIN
                        </h2>
                        <button onClick={() => closeModal()}>Close</button>
                      </div>
                      <div className="mt-[20px]  flex items-center justify-evenly">
                        <select onChange={(e) => setPermission(e.target.value)}>
                          {role.map((item, index) => {
                            return (
                              <option value={item.value} key={index}>
                                {item.name}
                              </option>
                            );
                          })}
                        </select>
                        {permission == "R2" ? (
                          <select
                            onChange={(e) => setStorageId(e.target.value)}
                          >
                            {takeallStorage.map((item, index) => {
                              return (
                                <option value={item.id} key={index}>
                                  {item.name}
                                </option>
                              );
                            })}
                          </select>
                        ) : (
                          <span></span>
                        )}
                        <button
                          className="bg-[green] p-[6px] pl-[12px] pr-[12px]"
                          onClick={() => {
                            handleToUpdate();
                          }}
                        >
                          Lưu
                        </button>
                      </div>
                    </Modal>
                  </td>
                </tr>
              );
            })}
        </table>
      </div>
    </div>
  );
}

export default AdminManager;
