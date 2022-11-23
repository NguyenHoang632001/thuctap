import { default as axios } from "../../src/utils/axios";
export const getDetailStorage = async (id) => {
  try {
    let res = await axios.get(`/api/get-detail-storage?id=${id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const transferStorage = async (data) => {
  try {
    let res = await axios.post(`/api/order-storage-transfer`, data);
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const getOrderToImportStorage = async (page, size, statusId) => {
  try {
    let res = await axios.get(
      `/api/get-order-storage?page=${page}&size=${size}&statusId=${statusId}`
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const searchByStorage = async (word, page, size, statusId) => {
  try {
    let res = await axios.get(
      `/api/search-order-by-storage?word=${word}&page=${page}&size=${size}&statusId=${statusId}`
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};
