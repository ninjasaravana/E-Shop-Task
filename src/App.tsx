import React, { useMemo } from "react";
import styles from "./App.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { CartState } from "./store/reducer";

const App: React.FC = () => {
  const navigate = useNavigate();
  const cartState = useSelector(
    (state: { cart: CartState }) => state.cart.items
  );
  const cartCount = useMemo(() => {
    return cartState.reduce((acc, cart) => {
      return (acc = acc + cart.count);
    }, 0);
  }, [cartState]);

  return (
    <div className='App'>
      <header className={styles.header}>
        <div className={styles.logoContainer} onClick={() => navigate("/")}>
          <i className='fa fa-cutlery fa-3x'></i>
          <span className={styles.logo}> E-SHOP</span>
        </div>
        <div className={styles.cartIcons}>
          <div className={styles.cartContainer}>
            {cartState.length > 0 && (
              <p className={styles.cartCount}>{cartCount}</p>
            )}
            <i
              className='fa fa-shopping-cart fa-2x'
              style={{ width: "30px", height: "30px" }}
              onClick={() => navigate("/cart")}
            ></i>
          </div>
          <div className={styles.cartContainer}>
            <i
              className='fa fa-cog fa-2x'
              style={{ width: "30px", height: "30px" }}
              onClick={() => navigate("/order")}
            ></i>
          </div>
        </div>
      </header>
    </div>
  );
};

export default App;
