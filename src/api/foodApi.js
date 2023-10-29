import axiosClient from "./axiosClient";

const foodApi = {
  getFoodStore: (foodType) => {
    const url = `/api/v1/food-storage/${foodType}`;
    return axiosClient.get(url);
  },
  createFoodTemp: (name, weight) => {
    const params = {
      name,
      weight,
    };
    const url = "/api/v1/food";
    return axiosClient.post(url, params);
  },
  getFoodsTemp: () => {
    const url = "/api/v1/food";
    return axiosClient.get(url);
  },
  deleteFoodTemp: (name) => {
    const params = {
      name,
    };
    const url = "/api/v1/food";
    return axiosClient.delete(url);
  },
};
export default foodApi;
