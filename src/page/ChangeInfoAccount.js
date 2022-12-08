import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import {
  getDistrictService,
  getProvinceService,
  getWardService,
  updateUserInfoService,
} from "../services/userService";
import { builDataSelect } from "../utils/comomUtil";
import { toast } from "react-toastify";

function ChangeInfoAccount() {
  const userInfo = useSelector((state) => state.user.userInfo);
  const email = userInfo.email ? userInfo.email : "";
  const [name, setName] = useState(userInfo.name ? userInfo.name : "");
  const [wardArr, setWardArr] = useState([]);
  const [districtArr, setDistrictArr] = useState([]);
  const [provinceArr, setProvinceArr] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState(
    userInfo.phoneNumber ? userInfo.phoneNumber : ""
  );
  const [birthDay, setBirthDay] = useState(
    userInfo.birthDay ? userInfo.birthDay : ""
  );
  const [address, setAddress] = useState(
    userInfo.address ? userInfo.address : ""
  );
  const [selectedProvince, setSellectedProvince] = useState(
    userInfo.provinceData &&
      userInfo.provinceData.id &&
      userInfo.provinceData.provinceName
      ? {
          value: userInfo.provinceData.id,
          label: userInfo.provinceData.provinceName,
        }
      : {}
  );
  const [selectedDistrict, setSellectedDistrict] = useState(
    userInfo.districtData &&
      userInfo.districtData.id &&
      userInfo.districtData.districtName
      ? {
          value: userInfo.districtData.id,
          label: userInfo.districtData.districtName,
        }
      : {}
  );
  const [selectedWard, setSellectedWard] = useState(
    userInfo.wardData && userInfo.wardData.id && userInfo.wardData.wardName
      ? {
          value: userInfo.wardData.id,
          label: userInfo.wardData.wardName,
        }
      : {}
  );

  useEffect(() => {
    getProvince();
    return () => true;
  }, []);
  useEffect(() => {
    if (selectedProvince) {
      getDistrict();
      return () => true;
    }
  }, [selectedProvince]);
  useEffect(() => {
    if (selectedDistrict) {
      getWard();
    }
    return () => true;
  }, [selectedDistrict]);

  const getWard = async () => {
    const dataWard = await getWardService(selectedDistrict.value);
    if (dataWard && dataWard.errCode === 0) {
      setWardArr(builDataSelect(dataWard.data, "WARD"));
    }
  };

  const getDistrict = async () => {
    const dataDistrict = await getDistrictService(selectedProvince.value);

    if (dataDistrict && dataDistrict.errCode === 0) {
      setDistrictArr(builDataSelect(dataDistrict.data, "DISTRICT"));
    }
  };
  const getProvince = async () => {
    const dataProvince = await getProvinceService();
    if (dataProvince && dataProvince.errCode === 0) {
      setProvinceArr(builDataSelect(dataProvince.data, "PROVINCE"));
    }
  };
  let dispatch = useDispatch();
  const handleUpdateUserInfo = async () => {
    let res = await updateUserInfoService({
      id: userInfo.id,
      name: name,
      address: address,
      birthDay: birthDay,
      phoneNumber: phoneNumber,
      provinceId: selectedProvince.value,
      districtId: selectedDistrict.value,
      wardId: selectedWard.value,
    });
    if (res && res.errCode === 0) {
      toast.success("Cập nhật thông tin thành công, vui lòng đăng nhập lại!");
    } else {
      toast.error("Cập nhật thất bại");
    }
  };
  return (
    <div className="p-[50px] text-[18px] ">
      <h2 className="font-bold pb-[20px]">THÔNG TIN TÀI KHOẢN</h2>
      <div>
        <div className="font-bold pb-[20px]">Tên khách hàng hoặc công ty</div>
        <input
          className="w-[50%] h-[30px] border-[0.8px] border-solid border-[black] rounded-[5px]  mb-[20px]"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        ></input>
        <div className="font-bold pb-[20px]">Email</div>
        <input
          className="w-[50%] h-[30px] border-[1px] border-solid border-[black] rounded-[5px]  mb-[20px]"
          value={email}
          readOnly
        ></input>
        <div className="font-bold pb-[20px]">Số điện thoại</div>
        <input
          className="w-[50%] h-[30px] border-[1px] border-solid border-[black] rounded-[5px]  mb-[20px]"
          value={phoneNumber}
          onChange={(e) => {
            setPhoneNumber(e.target.value);
          }}
        ></input>
        <div className="font-bold pb-[20px]">Ngày sinh</div>
        <input
          className="w-[50%] h-[30px] border-[1px] border-solid border-[black] rounded-[5px]  mb-[20px]"
          value={birthDay}
          onChange={(e) => {
            setBirthDay(e.target.value);
          }}
        ></input>
        <h2 className="font-bold pb-[20px]">Địa chỉ</h2>
        <div className="flex gap-9 justify-start items-center">
          <div className=" pb-[20px]">
            <h3 className="mb-[10px]">Tỉnh/Thành phố</h3>
            <Select
              value={selectedProvince}
              options={provinceArr}
              className="w-[200px] relative z-[1]"
              onChange={(e) => {
                setSellectedProvince(e);
                setSellectedDistrict({});
                setSellectedWard({});
              }}
            />
          </div>
          <div className=" pb-[20px]">
            <h3 className="mb-[10px]">Quận/Huyện</h3>
            <Select
              value={selectedDistrict}
              options={districtArr}
              className="w-[200px] relative z-[1]"
              onChange={(e) => {
                setSellectedDistrict(e);
                setSellectedWard({});
              }}
            />
          </div>
          <div className=" pb-[20px]">
            <h3 className="mb-[10px]">Phường xã</h3>
            <Select
              value={selectedWard}
              options={wardArr}
              className="w-[200px] relative z-[1]"
              onChange={(e) => {
                setSellectedWard(e);
              }}
            />
          </div>
        </div>
        <div className=" pb-[20px]">
          <input
            className="w-[50%] h-[30px] border-[1px] border-solid border-[black] rounded-[5px]  mb-[20px]"
            placeholder="Nhập địa chỉ Đường/Thôn/Xóm, số nhà/ngõ ngách"
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
            }}
          />
        </div>
      </div>
      <div>
        <button
          onClick={() => handleUpdateUserInfo()}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        >
          Lưu thông tin
        </button>
      </div>
    </div>
  );
}

export default ChangeInfoAccount;
