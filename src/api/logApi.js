import axiosClient from "./axiosClient";

const logApi = {
  getLogExpert: () => {
    const email = localStorage.getItem("email");
    const url = `api/v2/log/${email}`;
    return axiosClient.get(url);
  },
};
export default logApi;
