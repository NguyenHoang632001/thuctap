import { ExcelRenderer, OutTable } from "react-excel-renderer";
function CreateExcel() {
  return (
    <div className="w-[90%] mt-[0] mb-[0] ml-[auto] mr-[auto] bg-[#eeeeee]">
      <h2 className="text-xl">NHẬP ĐƠN HÀNG TỪ FILE</h2>
      <div className="flex  mt-8 w-[48%] ml-[50%] justify-between">
        <button className="text-lg p-2  border-[1px] border-black bg-neutral-300">
          Mở file
        </button>
        <button className="text-lg p-2  border-[1px] border-black bg-neutral-300">
          Tải file mẫu
        </button>
        <button className="text-lg p-2  border-[1px] border-black bg-neutral-300">
          Lịch sử tải file
        </button>
        <button className="text-lg p-2  border-[1px] border-black bg-neutral-300">
          Nhập Excel cũ
        </button>
      </div>
      fdsf
    </div>
  );
}

export default CreateExcel;
