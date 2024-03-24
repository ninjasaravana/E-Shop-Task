import React, { useCallback, useEffect, useState } from "react";
import styles from "./food-detail.module.css";
import { Link, useLocation, useParams } from "react-router-dom";
import CustomizeButton from "../../components/customizeButton/customizeButton";
import { useDispatch, useSelector } from "react-redux";
import { CardData, CartState, addItem, updateItem } from "../../store/reducer";

const FoodDetail: React.FC = () => {
  const { categoryName, foodName } = useParams<{
    categoryName: string;
    foodName: string;
  }>();
  const cartState = useSelector(
    (state: { cart: CartState }) => state.cart.items
  );
  const location = useLocation();
  const dispatch = useDispatch();
  const [foodDetail, setFoodDetail] = useState<CardData>();
  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`)
      .then((response) => response.json())
      .then((data) => {
        const foodRecord = cartState.find(
          (food) => food.id === data.meals[0].idMeal
        );
        setFoodDetail({
          id: data.meals[0].idMeal,
          name: data.meals[0].strMeal,
          image: data.meals[0].strMealThumb,
          description: data.meals[0].strInstructions,
          count: foodRecord?.count || 0,
          amount: location.state.amount,
        });
      });
  }, [cartState, foodName, location.state.amount]);

  const handleUpdateQuantity = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, value: number) => {
      if (foodDetail) {
        if (foodDetail.count === 0 && value === 1) {
          dispatch(addItem({ cartData: foodDetail, value }));
        } else if (foodDetail.count > 0) {
          dispatch(updateItem({ cartData: foodDetail, value }));
        }
      }
    },
    [dispatch, foodDetail]
  );
  return (
    <div className={styles.container}>
      <div className={styles.breadCrumb}>
        <Link to='/foodCategory'>Category</Link>
        <span> / </span>
        <Link to={`/foodCategory/${categoryName}`}>{categoryName}</Link>
        <span> / </span>
        <Link to={`/foodCategory/${categoryName}/${foodName}`}>{foodName}</Link>
      </div>
      {foodDetail && (
        <div className={styles.parentContainer}>
          <div className={styles.imageArea}>
            <img
              className={styles.foodImage}
              src={foodDetail.image}
              alt={foodDetail.name}
            />
          </div>
          <div className={styles.foodDetails}>
            <h2 className={styles.foodTitle}>{foodDetail.name}</h2>
            <p className={styles.description}>{foodDetail.description}</p>
            <h2>₹{foodDetail.amount}/-</h2>
            <CustomizeButton
              count={foodDetail.count || 0}
              handleUpdateQuantity={handleUpdateQuantity}
            ></CustomizeButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodDetail;
