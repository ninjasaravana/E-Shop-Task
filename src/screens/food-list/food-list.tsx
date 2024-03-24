import React, { useCallback, useEffect, useState } from "react";
import styles from "./food-list.module.css";
import Card from "../../components/card/card";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { CardData, addItem, updateItem } from "../../store/reducer";

export interface MealItem {
  strMeal: string;
  strMealThumb: string;
  idMeal: string;
}

export interface FoodItem {
  id: string;
  name: string;
  image: string;
  description: string;
  amount: number;
  count: number;
}

const FoodList: React.FC = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const [foodItem, setFoodItem] = useState<FoodItem[]>([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`
    )
      .then((response) => response.json())
      .then((data) => {
        const costArr = [100, 150, 200, 250, 300];
        const foodDetails = data.meals.map((food: MealItem, idx: number) => {
          return {
            id: food.idMeal,
            name: food.strMeal,
            image: food.strMealThumb,
            description: "",
            amount: costArr[idx % 5],
            count: 0,
          };
        });
        setFoodItem(foodDetails);
      });
  }, [categoryName]);

  const handleNavigation = (foodName: string, amount?: number) => {
    navigate(`/foods/detail/foodcategory/${categoryName}/${foodName}`, {
      state: {
        amount: amount ?? 0,
      },
    });
  };

  const handleUpdateQuantity = useCallback(
    (value: number, cartData: CardData) => {
      if (cartData.count === 0) {
        dispatch(addItem({ cartData, value }));
      } else {
        dispatch(updateItem({ cartData, value }));
      }
    },
    [dispatch]
  );

  return (
    <div className={styles.container}>
      <div className={styles.breadCrumb}>
        <Link to={`/foodCategory `}>Category</Link> <span> / </span>
        <Link to={`/foodCategory/${categoryName}`}>{categoryName}</Link>
      </div>
      <div className={styles.cardContainer}>
        {foodItem.length > 0 &&
          foodItem.map((item, idx) => {
            return (
              <Card
                foodItem={item}
                navigate={handleNavigation}
                key={idx}
                handleUpdateQuantity={handleUpdateQuantity}
              />
            );
          })}
      </div>
    </div>
  );
};

export default FoodList;
