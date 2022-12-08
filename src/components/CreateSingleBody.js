import "./CreateSingleBody.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightFromBracket,
  faArrowRight,
  faCloudArrowUp,
  faSitemap,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";
import {
  countPriceService,
  createOderService,
  getDistrictService,
  getProvinceService,
  getWardService,
} from "../services/userService";
import Select from "react-select";
import { builDataSelect } from "../utils/comomUtil";
import { useDebounce } from "use-debounce";
import { toast } from "react-toastify";
import _ from "lodash";
import { fetchDataFinished, fetchDataStart } from "../redux/actions/appAction";
import { Link } from "react-router-dom";

function CreateSingleBody() {
  const [nameMommodity, setNameMommodity] = useState("");
  const [kg, setKg] = useState("");
  const [price, setPrice] = useState("");
  const [coute, setCoute] = useState("");
  const [product, setProduct] = useState([]);
  const [index, setIndex] = useState(null);
  const [status, setStatus] = useState("Thêm hàng hóa");
  const [codeMommodity, setCodeMommodity] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const emailUser = useSelector((state) => state.user.userInfo.email);
  const [collectMoney, setCollectMoney] = useState(0);
  const [provinceArr, setProvinceArr] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState({});
  const [districtArr, setDistrictArr] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState({});
  const [wardArr, setWardArr] = useState([]);
  const [selectedWard, setSelectedWard] = useState({});
  const userInfo = useSelector((state) => state.user.userInfo);
  const [countprice, setCountPrice] = useState(0);
  const totalWeight = product.reduce((total, pro) => {
    return total + Number(pro.weight) * Number(pro.amount);
  }, 0);
  const totalValue = product.reduce((total, pro) => {
    return total + Number(pro.value) * Number(pro.amount);
  }, 0);

  const [provinceIdDebounce] = useDebounce(selectedProvince.value, 1000);
  const [totalWeightDebounce] = useDebounce(totalWeight, 1000);
  const [totalValueDebounce] = useDebounce(totalValue, 1000);
  const [collectMoneyDebounce] = useDebounce(collectMoney, 1000);
  const [isPriceLoading, setIsPriceLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [check, setCheck] = useState(false);
  const dispatch = useDispatch();
  const [onchangwward, setonchangewward] = useState("");
  const [freightPayer, setFreightPayer] = useState("Người nhận");
  const [note, setNote] = useState("");

  const data = {
    senderEmail: emailUser,
    fullName: fullName,
    phoneNumber: phoneNumber,
    address: address,
    date: new Date().setHours(0, 0, 0, 0) / 1000,
    orderCode: codeMommodity,
    commodities: product,
    collectMoney: collectMoney,
    provinceId: selectedProvince.value,
    districtId: selectedDistrict.value,
    wardId: selectedWard.value,
    price: countprice,
    senderWardId: userInfo.wardData && userInfo.wardData.id,
    freightPayer: freightPayer,
    note: note,
  };

  const createOder = async () => {
    dispatch(fetchDataStart());
    let res = await createOderService(data);
    if (res && res.errCode === 0) {
      toast.success("Tạo đơn thành công!");
    } else {
      toast.error("Tạo đơn thất bại!");
    }
    dispatch(fetchDataFinished());
  };
  const handleToSendOder = () => {
    setCheck(true);
    if (
      check === true &&
      phoneNumber !== "" &&
      fullName !== "" &&
      address !== "" &&
      Object.keys(selectedProvince).length !== 0 &&
      Object.keys(selectedDistrict).length !== 0 &&
      Object.keys(selectedWard).length !== 0 &&
      codeMommodity !== "" &&
      collectMoney !== "" &&
      product.length !== 0
    ) {
      createOder();
    } else {
      alert("Hoàn thành form tạo đơn trước khi gửi");
    }
  };

  const handleOnchangNameMommodity = (e) => {
    setNameMommodity(e.target.value);
  };

  const handleClick = () => {
    if (
      kg !== "" &&
      kg >= 0.1 &&
      coute !== "" &&
      coute >= 0.1 &&
      price !== "" &&
      price >= 0.1 &&
      nameMommodity !== ""
    ) {
      if (index != null) {
        handleDelte(index);
        setIndex(null);
      }

      setProduct((pre) => [
        ...pre,
        {
          name: nameMommodity,
          amount: coute,
          weight: kg,
          value: price,
        },
      ]);
      setStatus("Thêm hàng hóa");

      setNameMommodity("");
      setCoute("");
      setKg("");
      setPrice("");
    } else {
      alert("Thiếu hoặc sai thông tin");
    }
  };

  const handleOnchangCoute = (e) => {
    setCoute(e.target.value);
  };
  const handleOnchangKg = (e) => {
    setKg(e.target.value);
  };
  const handleOnchangPrice = (e) => {
    setPrice(e.target.value);
  };
  const handleDelte = (index) => {
    const newProduct1 = product.slice(0, index);
    const newProduct2 = product.slice(index + 1);
    const newProduct = newProduct1.concat(newProduct2);
    setProduct(newProduct);
  };
  const handleFix = (index) => {
    const objectProduct = product[index];
    setNameMommodity(objectProduct.name);
    setKg(objectProduct.weight);
    setCoute(objectProduct.amount);
    setPrice(objectProduct.value);
    setStatus("Update");
    setIndex(index);
  };
  const handleCodeMommodity = (e) => {
    setCodeMommodity(e.target.value);
  };

  const handlePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
  };
  const handleFullName = (e) => {
    setFullName(e.target.value);
  };
  const handleAddress = (e) => {
    setAddress(e.target.value);
  };
  useEffect(() => {
    getProvince();
  }, []);
  const getProvince = async () => {
    const dataProvince = await getProvinceService();
    if (dataProvince && dataProvince.errCode === 0) {
      setProvinceArr(builDataSelect(dataProvince.data, "PROVINCE"));
    }
  };

  useEffect(() => {
    if (selectedProvince) {
      getDistrict();
    }
  }, [selectedProvince]);

  const getDistrict = async () => {
    const dataDistrict = await getDistrictService(selectedProvince.value);

    if (dataDistrict && dataDistrict.errCode === 0) {
      setDistrictArr(builDataSelect(dataDistrict.data, "DISTRICT"));
    }
  };

  useEffect(() => {
    if (selectedDistrict) {
      getWard();
    }
  }, [selectedDistrict]);

  useEffect(() => {
    handleCountPrice();
  }, [
    provinceIdDebounce,
    totalValueDebounce,
    totalWeightDebounce,
    collectMoneyDebounce,
  ]);

  const getWard = async () => {
    const dataWard = await getWardService(selectedDistrict.value);
    if (dataWard && dataWard.errCode === 0) {
      setWardArr(builDataSelect(dataWard.data, "WARD"));
    }
  };

  const handleCountPrice = async () => {
    if (!userInfo.provinceData || !userInfo.wardData) {
      toast.info("Cần cập nhật địa chỉ người dùng!");
    } else {
      console.log(userInfo.provinceData);
      if (totalValue && totalWeight && !_.isEmpty(selectedProvince)) {
        setIsPriceLoading(true);
        let res =
          collectMoneyDebounce <= 0
            ? await countPriceService({
                fromProvinceId: userInfo.provinceData.id,
                toProvinceId: provinceIdDebounce,
                weight: totalWeightDebounce,
                commodityValue: totalValueDebounce,
              })
            : await countPriceService({
                fromProvinceId: userInfo.provinceData.id,
                toProvinceId: provinceIdDebounce,
                weight: totalWeightDebounce,
                commodityValue: totalValueDebounce,
                cod: "COD",
                collectMoney: collectMoneyDebounce,
              });
        if (res && res.errCode === 0) {
          setCountPrice(res.totalPrice.toFixed(0));
        }
        setIsPriceLoading(false);
      }
    }
  };
  let subtitle;
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
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }
  const email = useSelector((state) => state.user.userInfo.email);
  // const openToSendOrder = () => {
  //   setOpenModal(true);
  // };
  const closeModal = () => {
    setOpenModal(false);
  };
  const openModalToSend = () => {
    setOpenModal(true);
  };
  const freightPayerArr = ["Người nhận", "Người gửi"];
  return (
    <>
      <div className="containerCreateSingleBody">
        <div className="createSingleBodyLeft">
          <div className="sender">
            <div className="headerSender">
              <div className="itemHeaderSenders">
                {" "}
                <FontAwesomeIcon icon={faRightFromBracket} />
                <span className="itemHeaderSender">NGƯỜI GỬI</span>
              </div>
              <div>
                <div>
                  <Link to="/change-inforAccount">
                    {" "}
                    Quản lí thông tin người gửi{" "}
                  </Link>
                  <FontAwesomeIcon icon={faArrowRight} />
                </div>
              </div>
            </div>

            <h2 className="text-[red] font-bold"> Thông tin người gửi</h2>
            <div className="mt-[20px]">Email người gửi: {userInfo.email}</div>
          </div>
          <div className="receive pl-[15%] pr-[10%]">
            <div className="  flex items-center justify-center mt-[20px] mb-[20px]">
              <div className="itemHeaderReceives ">
                {" "}
                <FontAwesomeIcon icon={faCloudArrowUp} />
                <span className="itemHeaderReceive">NGƯỜI NHẬN</span>
              </div>
              {/* <div>
                <div>
                  <input type="checkbox"></input>
                  <span>Nhận hàng tại bưu cục</span>
                </div>
              </div> */}
            </div>
            <div className="bodyReceive mb-[20px]">
              <div className="itemBodyReceive ">
                <span className="ItemReceiveTitle"> Điện thoại</span>
                <input
                  placeholder="Nhập số điện thoại "
                  className="inputReceive"
                  onChange={(e) => handlePhoneNumber(e)}
                  type="number"
                ></input>
                {(phoneNumber === "" || phoneNumber.length !== 10) &&
                check === true ? (
                  <div className=" pl-[10px] text-[red]">
                    Số điện thoại không đúng
                  </div>
                ) : (
                  ""
                )}
              </div>

              <div className="itemBodyReceive">
                <span className="ItemReceiveTitle">Họ tên</span>
                <input
                  placeholder="Nhập họ tên"
                  className="inputReceive"
                  onChange={(e) => handleFullName(e)}
                ></input>
                {fullName === "" && check === true ? (
                  <div className=" pl-[10px] text-[red]">
                    Họ tên không được để trống
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="itemBodyReceive">
                <span className="ItemReceiveTitle">Địa chỉ</span>
                <input
                  placeholder="Nhập địa chỉ"
                  className="inputReceive"
                  onChange={(e) => handleAddress(e)}
                ></input>
                {address === "" && check === true ? (
                  <div className=" pl-[10px] text-[red]">
                    Địa chỉ không được để trống
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className=" ">
              <div className="flex items-center justify-start mb-[20px]">
                {" "}
                <h2 className="w-[80px]">Tỉnh</h2>
                <Select
                  value={selectedProvince}
                  options={provinceArr}
                  className="w-[200px] relative z-[1]"
                  onChange={(e) => {
                    setSelectedProvince(e);
                    setSelectedWard({});
                    setSelectedDistrict({});
                  }}
                />
                {Object.keys(selectedProvince).length === 0 &&
                check === true ? (
                  <div className=" pl-[10px] text-[red]">
                    Tỉnh không được để trống
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="flex items-center justify-start mb-[20px]">
                {" "}
                <h2 className="w-[80px]">Huyện</h2>
                <Select
                  value={selectedDistrict}
                  options={districtArr}
                  className="w-[200px]"
                  onChange={(e) => {
                    setSelectedDistrict(e);
                    setSelectedWard({});
                  }}
                />
                {Object.keys(selectedDistrict).length === 0 &&
                check === true ? (
                  <div className=" pl-[10px] text-[red]">
                    Quận/huyện không được để trống
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="flex items-center justify-start mb-[20px]">
                {" "}
                <h2 className="w-[80px]">Xã</h2>
                <Select
                  value={selectedWard}
                  options={wardArr}
                  className="w-[200px]"
                  onChange={(e) => {
                    setSelectedWard(e);
                  }}
                />
                {Object.keys(selectedWard).length === 0 && check === true ? (
                  <div className=" pl-[10px] text-[red]">
                    Xã/phường không được để trống
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="createSingleBodyRight">
          <div className="commodity">
            <div>
              <FontAwesomeIcon icon={faSitemap} />
              <span className="titleCommodity">THÔNG TIN HÀNG HÓA</span>
            </div>
          </div>
          <div className="inputMommodity">
            <div className="itemInputMommodity">
              <span className="itemTitleMommodity">Mã đơn hàng</span>
              <input
                placeholder="Nhập mã đơn hàng"
                className="inputMommodity p-4"
                onChange={(e) => handleCodeMommodity(e)}
              ></input>
            </div>
            <div>
              {codeMommodity === "" && check === true ? (
                <div className="pl-[45%] mt-[20px] text-[red]">
                  Mã không được để trống
                </div>
              ) : (
                ""
              )}
            </div>

            <div className="">
              {/* <h2>Hàng hóa đã thêm</h2> */}
              {product.map((productItem, index) => {
                return (
                  <div key={index} className="bg-slate-300 mb-2 mt-2">
                    <span>Tên hàng hóa: {productItem.name}</span>

                    <ul>
                      <li>Số lượng: {productItem.amount}</li>
                      <li>Trọng lượng: {productItem.weight}</li>
                      <li>Giá trị hàng hóa: {productItem.value}</li>
                    </ul>
                    <button
                      className="border-black border-[2px] border-solid p-2 mr-4 mt-4 mb-4"
                      onClick={() => handleFix(index, handleDelte)}
                    >
                      Sửa
                    </button>
                    <button
                      className="border-black border-[2px] border-solid p-2 mr-4 bg-[red]"
                      onClick={() => handleDelte(index)}
                    >
                      Xóa
                    </button>
                  </div>
                );
              })}
            </div>

            <form>
              <div className="itemInputMommodity">
                <span className="itemTitleMommodity">Tên hàng hóa</span>
                <input
                  value={nameMommodity}
                  placeholder="Nhập tên hàng hóa"
                  className="inputMommodity "
                  onChange={(e) => handleOnchangNameMommodity(e)}
                ></input>
              </div>
              {/* <div>
                {nameMommodity === "" && check === true ? (
                  <div className="pl-[45%] mt-[20px] text-[red]">
                    Tên hàng hóa không được để trống
                  </div>
                ) : (
                  ""
                )}
              </div> */}
              <div className="flex items-center justify-between mt-[20px] w-[100%] ">
                <input
                  value={coute}
                  placeholder="Số lượng"
                  className="border-black border-[1px] border-solid mr-2 w-[30%] p-2"
                  onChange={(e) => handleOnchangCoute(e)}
                ></input>

                <input
                  value={kg}
                  placeholder="Trọng lượng gram"
                  className="border-black border-[1px] border-solid mr-2 w-[30%] p-2"
                  onChange={(e) => handleOnchangKg(e)}
                ></input>

                <input
                  value={price}
                  placeholder="Giá trị hàng hóa"
                  className="border-black border-[1px] border-solid mr-2 w-[30%] p-2"
                  onChange={(e) => handleOnchangPrice(e)}
                ></input>
              </div>

              <div
                className="addMommodity mt-[20px]"
                onClick={() => {
                  handleClick();
                }}
              >
                <FontAwesomeIcon icon={faPlus} className="iconMommodityItem" />
                <span className="addMommodityItem">{status}</span>
              </div>
            </form>
          </div>
          <div className="payMoney">
            <div className="containerPayMoney">
              <div>
                <span>TIỀN THU HỘ</span>
                <h4 className="typePayMoney mt-4">
                  ! Hình thức thanh toán tiền Cod
                </h4>
              </div>
              <div>
                <span>NGƯỜI TRẢ CƯỚC</span>
                <div className="flex mt-4">
                  <select onChange={(e) => setFreightPayer(e.target.value)}>
                    {freightPayerArr.map((item) => {
                      return <option value={item}>{item}</option>;
                    })}
                  </select>
                </div>
              </div>
            </div>
            <div className="mt-4 ml-4">
              <span>Tiền thu hộ</span>
              <input
                className="border-[1px] border-black ml-4"
                onChange={(e) => setCollectMoney(e.target.value)}
                type="number"
              ></input>{" "}
              (VND)
            </div>

            <div>
              {collectMoney < 0 && check === true ? (
                <div className=" mt-[20px] text-[red]">
                  Tiền thu hộ không đúng
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="mt-4 ml-4">
              <span>Note</span>
              <textarea
                className="border-[1px] border-black ml-14"
                onChange={(e) => setNote(e.target.value)}
              ></textarea>
            </div>
            <div className="mt-4 ml-4 flex justify-evenly">
              {/* <div>
                <div>GHI CHÚ</div>
                <textarea className="mt-4 w-50 h-20 border-[1px] border-black"></textarea>
              </div> */}
              <div className="mr-4 ml-10"></div>
            </div>
            <div className="ml-4 mt-10 mb-4">
              {/* <input type="checkbox" className="hover:cursor-pointer"></input> */}
              {/* <span>Lưu thông tin đơn hàng</span> */}
            </div>
          </div>
        </div>
      </div>
      <div className="container-footer-createSingleBdy flex justify-center ">
        <div className="item-footer-createSingleBody flex flex-col relative">
          Tổng cước
          <span className="mt-5">{countprice} VNĐ</span>
          <ClipLoader
            color={"blue"}
            loading={isPriceLoading}
            // cssOverride={override}
            className="absolute top-[70%] left-[40%]"
            size={15}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
        <div className="item-footer-createSingleBody flex flex-col ">
          Tiền thu hộ
          <span className="mt-5">{collectMoney} VNĐ</span>
        </div>

        <div className="item-footer-createSingleBody-Agree flex-col pt-4">
          <div></div>
          <div className="mt-2">
            <button
              className="border-[1px] border-black ml-[40%] p-2"
              // onClick={() => {
              //   handleToSendOder();
              // }}
              onClick={() => {
                openModalToSend();
              }}
            >
              Gửi ngay
            </button>
            <Modal
              isOpen={openModal}
              onAfterOpen={afterOpenModal}
              onRequestClose={closeModal}
              style={customStyles}
              contentLabel="Example Modal"
            >
              <h2>Bạn có muốn hủy đơn hàng này không?</h2>
              <div className="flex items-center justify-between ">
                <button
                  onClick={() => {
                    handleToSendOder();
                    closeModal();
                  }}
                  className="border-black border-solid border-[1px] p-[8px] bg-[blue] text-[white]  rounded-[5px]"
                >
                  Gửi đơn
                </button>
                <button
                  className=" top-[20px] right-[20px]  p-[8px] bg-[red]  rounded-[5px] text-[white]"
                  onClick={closeModal}
                >
                  Cancle
                </button>
              </div>
            </Modal>
            {/* <button className="border-[1px] border-black ml-4 p-2">
              Lưu nháp
            </button>
            <button className="border-[1px] border-black ml-4 p-2">
              làm mới
            </button> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateSingleBody;
