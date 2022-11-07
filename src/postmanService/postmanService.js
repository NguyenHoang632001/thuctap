import { default as axios } from "../../src/utils/axios";

export const updateOrderStatusService = async (data) => {
  try {
    let res = await axios.post(`/api/update-order-status`, data);
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const getOder = async (page, size, date, statusId, email) => {
  try {
    let res = await axios.get(
      `/api/get-order?&page=${page}&size=${size}&date=${date}&statusId=${statusId}&email=${email}`
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const getOderAll = async (page, size, date, statusId) => {
  try {
    let res = await axios.get(
      `/api/get-order?&page=${page}&size=${size}&date=${date}&statusId=${statusId}`
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getOderPostman = async (page, size, date, statusId, email) => {
  try {
    let res = await axios.get(
      `/api/get-order-postman?&page=${page}&size=${size}&date=${date}&statusId=${statusId}&postmanEmail=${email}`
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const getAllStorage = async () => {
  try {
    let res = await axios.get(`/api/get-all-storage`);
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const getOrderByStorage = async (page, size, storageId) => {
  try {
    let res = await axios.get(
      `/api/get-order-by-storage?page=${page}&size=${size}&storageId=${storageId}`
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};
