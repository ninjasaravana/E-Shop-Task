import { Routes, Route, redirect } from "react-router-dom";
import loadable from "@loadable/component";

const RootRouter = () => {
  const foodCategory = loadable(
    () => import("./screens/food-category/food-category")
  );
  const foodList = loadable(() => import("./screens/food-list/food-list"));
  const foodDetail = loadable(
    () => import("./screens/food-detail/food-detail")
  );
  const foodCart = loadable(() => import("./screens/food-cart/food-cart"));
  const foodOrder = loadable(() => import("./screens/food-order/food-order"));
  return (
    <>
      <Routes>
        <Route path='/order' Component={foodOrder} />
        <Route path='/cart' Component={foodCart} />
        <Route
          path='/foods/detail/foodcategory/:categoryName/:foodName'
          Component={foodDetail}
        />
        <Route path='/foodcategory/:categoryName' Component={foodList} />
        <Route path='/' Component={foodCategory} />
        <Route path='*' Component={foodCategory} />
      </Routes>
    </>
  );
};

export default RootRouter;
