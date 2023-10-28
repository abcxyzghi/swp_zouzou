import axiosClient from './axiosClient';

const staffApi = {
  getAllStaff: () => {
    return axiosClient.get('/api/v1/staff');
  },
  addStaff: (params) => {
    return axiosClient.post("/api/v1/staff", params)
  }
};
export default staffApi;
