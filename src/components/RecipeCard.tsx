import React from 'react';
import '../css/RecipeCard.css'
import { Link } from 'react-router-dom';

interface RecipeCardProps {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strMealThumb: string;
}

const RecipeCard: React.FC<RecipeCardProps> = ({idMeal, strMeal, strCategory, strArea, strMealThumb,}) => { //functional component with props
  return (
    <div className="recipe-card">
      <Link to={`/recipe/${idMeal}`}>
        <img src={strMealThumb} alt={strMeal} />
        <h3>{strMeal}</h3>
        <p>Category: {strCategory}</p>
        <p>Origin: {strArea}</p>
      </Link>
    </div>
  );
};

export default RecipeCard;
