import React, { useEffect, useState } from "react";
import {
  ChakraProvider,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import foodApi from "../api/foodApi";

function FoodStorage() {
  const { cageId } = useParams();
  const [foodType, setFoodType] = useState("meat");
  const [weight, setWeight] = useState();
  const [foodSelect, setFoodSelect] = useState();
  const [foods, setFoods] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isReload, setIsReload] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const onClose = () => setIsOpen(false);
  const onOpen = () => setIsOpen(true);
  const getFoodStore = async () => {
    try {
      const res = await foodApi.getFoodStore(foodType);
      setFoods(res);
    } catch (e) {}
  };
  useEffect(() => {
    getFoodStore(foodType);
  }, [foodType, isReload]);
  return (
    <div>
      <h1>Food Storage</h1>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <button
          style={{
            margin: "12px 0 ",
            padding: "20px 32px",
            minWidth: "160px",
            backgroundColor: "#4dd392",
            borderRadius: "8px",
            color: "#fff",
            fontSize: "20px",
          }}
          onClick={() => setFoodType("meat")}
        >
          Meat
        </button>
        <button
          style={{
            margin: "12px 0 ",
            padding: "20px 32px",
            minWidth: "160px",
            backgroundColor: "#4dd392",
            borderRadius: "8px",
            color: "#fff",
            fontSize: "20px",
          }}
          onClick={() => setFoodType("plant")}
        >
          Plant
        </button>
        <button
          style={{
            margin: "12px 0 ",
            padding: "20px 32px",
            minWidth: "160px",
            backgroundColor: "#4dd392",
            borderRadius: "8px",
            color: "#fff",
            fontSize: "20px",
          }}
          onClick={() => setFoodType("medicine")}
        >
          Medicine
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th style={{ width: "10%" }}>id</th>
            <th style={{ width: "25%" }}>Name Food</th>
            <th style={{ width: "10%" }}>Type</th>
            <th style={{ width: "25%" }}>Available</th>
          </tr>
        </thead>
        <tbody>
          {foods.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>

              <td>{item.type}</td>
              <td>{item.available}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FoodStorage;
