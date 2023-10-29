import axiosClient from "./axiosClient";

const mealApi = {
  createDailyMealByCageId: (cageId) => {
    const url = `/api/v1/meal/daily/${cageId}`;
    return axiosClient.post(url);
  },
  saveMeal: () => {
    const url = "/api/v1/meal";
    return axiosClient.get(url);
  },
  saveMealAll: () => {
    const email = localStorage.getItem("email");
    const url = `/api/v1/meal/all/${email}`;
    return axiosClient.post(url);
  },
};
export default mealApi;
