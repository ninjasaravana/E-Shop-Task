import React, { useCallback, useEffect, useMemo, useState } from "react";
import styles from "./card.module.css";
import { Category } from "../../screens/food-category/food-category";
import { FoodItem } from "../../screens/food-list/food-list";
import CustomizeButton from "../customizeButton/customizeButton";
import { CartState, CardData } from "../../store/reducer";
import { useSelector } from "react-redux";

interface props {
  category?: Category;
  foodItem?: FoodItem;
  navigate: (categoryName: string, amount?: number) => void;
  handleUpdateQuantity?: (value: number, cartData: CardData) => void;
}

const Card: React.FC<props> = ({
  category,
  foodItem,
  navigate,
  handleUpdateQuantity,
}) => {
  const [cardData, setCardData] = useState<CardData>();
  const cartState = useSelector(
    (state: { cart: CartState }) => state.cart.items
  );

  const itemCount = useMemo(() => {
    const data = cartState.find((item) => item.id === cardData?.id);
    return data?.count && data.count > 0 ? data.count : 0;
  }, [cardData?.id, cartState]);

  useEffect(() => {
    if (category) {
      setCardData({
        id: category.idCategory,
        name: category.strCategory,
        image: category.strCategoryThumb,
        description: category.strCategoryDescription,
        amount: NaN,
        count: NaN,
      });
    } else if (foodItem) {
      setCardData({
        id: foodItem.id,
        name: foodItem.name,
        image: foodItem.image,
        description: foodItem.description,
        amount: foodItem.amount,
        count: itemCount,
      });
    }
  }, [category, foodItem, itemCount]);

  const updateQuantity = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, value: number) => {
      event?.stopPropagation();
      if (handleUpdateQuantity && cardData) {
        handleUpdateQuantity(value, cardData);
      }
    },
    [cardData, handleUpdateQuantity]
  );

  return (
    <>
      {cardData && (
        <div
          className={foodItem ? styles.foodCard : styles.card}
          onClick={() => navigate(cardData.name, cardData?.amount)}
        >
          <img
            className={styles.categoryImage}
            src={cardData.image}
            alt={cardData?.description}
          />
          <div className={styles.cartArea}>
            <p className={styles.itemDetails} title={cardData.name}>
              {cardData.name}
            </p>
            {cardData.amount > 0 && handleUpdateQuantity && (
              <>
                <p className={styles.itemDetails}>₹{cardData.amount}/-</p>
                <div className={styles.buttonSection}>
                  {cardData.count === 0 ? (
                    <button
                      className={styles.addCart}
                      onClick={(e) => updateQuantity(e, 1)}
                    >
                      Add to Cart
                    </button>
                  ) : (
                    <CustomizeButton
                      count={cardData.count || 0}
                      handleUpdateQuantity={updateQuantity}
                    ></CustomizeButton>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Card;
