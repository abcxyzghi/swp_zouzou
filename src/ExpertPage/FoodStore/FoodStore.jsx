import React, { useEffect, useState } from "react";
import foodApi from "../../api/foodApi";
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

function FoodStore() {
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

  const createFoodTmp = async () => {
    if (!weight) {
      toast({
        title: "Create Food",
        description: "Weight must be greater than 0",
        status: "warning",
        duration: 3000,
        position: "top",
      });
      return;
    }
    if (weight > foodSelect?.available) {
      toast({
        title: "Create Food",
        description: "Weight must be less than Available",
        status: "warning",
        duration: 3000,
        position: "top",
      });
      return;
    }
    console.log(foodSelect);
    foodApi.createFoodTemp(foodSelect?.name, weight);
    setWeight(0);
    setFoodSelect(undefined);
    setIsReload(!isReload);
    onClose();
  };
  useEffect(() => {
    getFoodStore(foodType);
  }, [foodType, isReload]);
  return (
    <div>
      <h1>Food Store</h1>
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
            <th style={{ width: "45%" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {foods.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>

              <td>{item.type}</td>
              <td>{item.available}</td>

              <td>
                <button
                  style={{ marginLeft: "12px" }}
                  onClick={() => {
                    onOpen();
                    setFoodSelect(item);
                  }}
                >
                  Tạo thực đơn
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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
        onClick={() => navigate(`/expert/daily-meal/${cageId}/update-food`)}
      >
        Add
      </button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              type="number"
              placeholder="Weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="green"
              mr={3}
              onClick={() => {
                createFoodTmp();
              }}
            >
              Ok
            </Button>
            <Button colorScheme="blue" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default FoodStore;
