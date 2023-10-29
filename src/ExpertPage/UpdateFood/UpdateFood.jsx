import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import foodApi from "../../api/foodApi";
import mealApi from "../../api/mealApi";
import { useToast } from "@chakra-ui/react";

function UpdateFood() {
  const navigate = useNavigate();
  const toast = useToast();
  const { cageId } = useParams();
  const [foods, setFoods] = useState([]);
  const getFoodTemp = async () => {
    try {
      const res = await foodApi.getFoodsTemp();
      if (res) {
        setFoods(res);
        console.log(res);
      }
    } catch (err) {}
  };

  const handleCreateMeal = async () => {
    try {
      await mealApi.createDailyMealByCageId(cageId);
      await mealApi.saveMeal();
      await mealApi.saveMealAll();
      toast({
        title: "Create meal",
        duration: 3000,
        status: "success",
        description: "Create meal success",
        position: "top",
      });
    } catch (error) {
      console.log(error);
      const { data } = error.response;
      toast({
        title: "Create meal",
        duration: 3000,
        status: "error",
        description: data.message,
        position: "top",
      });
    }
  };
  useEffect(() => {
    getFoodTemp();
  }, []);
  return (
    <>
      <div>
        <h1>Cage's name Meal</h1>
        <table>
          <thead>
            <tr>
              <th>Name Food</th>
              <th>weight</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {foods &&
              foods?.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.weight}</td>

                  <td>
                    <button style={{ marginLeft: "12px" }} onClick={() => {}}>
                      Update
                    </button>
                    <button
                      style={{ marginLeft: "12px" }}
                      onClick={() => {
                        // foodApi.deleteFoodTemp(item.name);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <button
            style={{
              margin: "12px 0 ",
              padding: "8px 16px",
              minWidth: "120px",
              backgroundColor: "#4dd392",
              borderRadius: "8px",
              color: "#fff",
              fontSize: "20px",
            }}
            onClick={() => navigate(`/expert/daily-meal/${cageId}/food`)}
          >
            Add more food
          </button>
          <button
            style={{
              margin: "12px 0 ",
              padding: "8px 16px",
              minWidth: "120px",
              backgroundColor: "#4dd392",
              borderRadius: "8px",
              color: "#fff",
              fontSize: "20px",
            }}
            onClick={() => {
              handleCreateMeal();
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    </>
  );
}

export default UpdateFood;
