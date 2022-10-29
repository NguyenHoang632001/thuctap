import { default as axios } from "../utils/axios";
export const login = async (data) => {
  try {
    let res = await axios.post("/api/login", data);
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const Signup = async (data) => {
  try {
    let res = await axios.post("/api/create-new-user", data);
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const LogOut = async (data) => {
  console.log(data);
  try {
    let res = await axios.post("/api/logout", data);
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const sendOTP = async (data) => {
  console.log(data);
  try {
    let res = await axios.post("/api/send-otp", data);
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const loginWithOTP = async (data) => {
  console.log(data);
  try {
    let res = await axios.post("/api/login-with-otp", data);
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const getAction = async (type) => {
  try {
    let res = await axios.get(`/api/get-allcode?type=${type}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const getChart = async (email) => {
  try {
    let res = await axios.get(`/api/get-chart-data?senderEmail=${email}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const createOderService = async (data) => {
  try {
    let res = await axios.post(`/api/create-order`, data);
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const getOder = async (type, page, size, date, statusId, email) => {
  try {
    let res = await axios.get(
      `/api/get-order-by-status?type=${type}&page=${page}&size=${size}&date=${date}&statusId=${statusId}&email=${email}`
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};
