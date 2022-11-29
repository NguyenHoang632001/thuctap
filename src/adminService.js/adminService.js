import { default as axios } from "../../src/utils/axios";
export const getUserService = async (page, size, roleId) => {
  try {
    let res = await axios.get(
      `/api/get-user-by-role?page=${page}&size=${size}&roleId=${roleId}`
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const updatePermissionService = async (data) => {
  try {
    let res = await axios.post(`/api/change-role-user`, data);
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const getStatiscicalService = async (date) => {
  try {
    let res = await axios.get(`/api/get-chart-data-admin?date=${date}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};
