import React, { useCallback } from "react";
import styles from "./food-cart.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  CardData,
  CartState,
  addItem,
  placeOrder,
  updateItem,
} from "../../store/reducer";

const FoodCart: React.FC = () => {
  const cart = useSelector((state: { cart: CartState }) => state.cart);
  const [cartState, total] = [cart.items, cart.total];
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleUpdateQuantity = useCallback(
    (cartData: CardData, value: number) => {
      if (cartData.count === 0) {
        dispatch(addItem({ cartData, value }));
      } else {
        dispatch(updateItem({ cartData, value }));
      }
    },
    [dispatch]
  );

  const submitOrder = () => {
    dispatch(placeOrder());
    navigate("/order");
  };

  return (
    <div className={styles.container}>
      <div className={styles.breadCrumb}>
        <Link to='/cart'>Cart Items</Link>
      </div>
      {cartState.length > 0 ? (
        <div className={styles.parentContainer}>
          <div className={styles.leftContainer}>
            {cartState.map((cart) => {
              return (
                <div className={styles.cartItem}>
                  <div className={styles.cartItemDetails}>
                    <img
                      className={styles.foodImage}
                      src={cart.image}
                      alt={cart.description}
                    />
                    <div className={styles.foodDetails}>
                      <h3 className={styles.foodTitle}>{cart.name}</h3>
                      <h3>₹{cart.amount}/-</h3>
                    </div>
                  </div>
                  <div className={styles.countContainer}>
                    <button
                      className={styles.updateCount}
                      onClick={(e) => handleUpdateQuantity(cart, -1)}
                    >
                      −
                    </button>
                    <p className={styles.foodCount}>{cart.count}</p>
                    <button
                      className={styles.updateCount}
                      onClick={(e) => handleUpdateQuantity(cart, 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <div className={styles.rightContainer}>
            <div className={styles.summaryContainer}>
              <h4>Summary</h4>
              {cartState.map((cart) => {
                return (
                  <div className={styles.summaryItems}>
                    <span className={styles.foodName}>{cart.name}</span>
                    <span className={styles.foodCost}>
                      {cart.count} x {cart.amount} = {cart.count * cart.amount}
                    </span>
                  </div>
                );
              })}
              <p className={styles.totalCost}>Total = {total}/-</p>
            </div>
            <button className={styles.orderButton} onClick={submitOrder}>
              Place Order
            </button>
          </div>
        </div>
      ) : (
        <h2 className={styles.noData}>No items in cart!!!</h2>
      )}
    </div>
  );
};

export default FoodCart;
