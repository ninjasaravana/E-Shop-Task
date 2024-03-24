import React from "react";
import styles from "./food-order.module.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { CartState } from "../../store/reducer";

const FoodOrder: React.FC = () => {
  const orders = useSelector((state: { cart: CartState }) => state.cart.orders);
  return (
    <div className={styles.container}>
      <div className={styles.breadCrumb}>
        <Link to='/order'>Orders</Link>
      </div>
      {orders.length > 0 ? (
        <div className={styles.parentContainer}>
          {orders.map((order) => {
            return (
              <div className={styles.orderContainer}>
                <div className={styles.orderDetails}>
                  <h4>Order Id {order.id}</h4>
                  <h4>Total:{order.total}</h4>
                </div>
                <h4 className={styles.foodTitle}>{"Items"}</h4>
                {order.items.map((item) => {
                  return (
                    <div className={styles.cartItem}>
                      <div className={styles.cartItemDetails}>
                        <div className={styles.cartItemData}>
                          <img
                            className={styles.foodImage}
                            src={item.image}
                            alt={item.name}
                          />
                          <div className={styles.foodDetails}>
                            <h4>{item.name}</h4>
                            <h4>₹ {item.amount}/-</h4>
                          </div>
                        </div>
                        <div className={styles.foodPrice}>
                          <span>
                            {item.count} x {item.amount} ={" "}
                            {item.count * item.amount}
                          </span>
                        </div>
                      </div>
                      <div className={styles.line}></div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      ) : (
        <h2 className={styles.noData}>No Orders!!!</h2>
      )}
    </div>
  );
};

export default FoodOrder;
