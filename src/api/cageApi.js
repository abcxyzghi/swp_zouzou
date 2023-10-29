import axiosClient from "./axiosClient";

const cageApi = {
  getCageExpert: () => {
    const url = `/api/v2/cage/${localStorage.getItem("email")}`;
    return axiosClient.get(url);
  },
};
export default cageApi;
