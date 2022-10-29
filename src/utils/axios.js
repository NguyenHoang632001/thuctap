import axios from "axios";
const instance = axios.create({
  baseURL: "https://backend-parcel-delivery.herokuapp.com",
});
instance.interceptors.response.use((res) => {
  return res.data;
});

export default instance;
