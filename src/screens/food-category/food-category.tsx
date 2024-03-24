import React, { useEffect, useState } from "react";
import styles from "./food-category.module.css";
import Card from "../../components/card/card";
import { Link, useNavigate } from "react-router-dom";

export interface Category {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

const FoodCategory: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
      .then((response) => response.json())
      .then((data) => setCategories(data.categories));
  }, []);

  const handleNavigation = (categoryName: string) => {
    navigate(`/foodcategory/${categoryName}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.breadCrumb}>
        <Link to='/foodCategory'>Category </Link>
      </div>
      <div className={styles.cardContainer}>
        {categories.length > 0 &&
          categories.map((category, idx) => {
            return (
              <Card category={category} navigate={handleNavigation} key={idx} />
            );
          })}
      </div>
    </div>
  );
};

export default FoodCategory;
