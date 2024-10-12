// RecipeDetails.tsx
import React from 'react';
import { Recipe } from './API';

export interface Ingredient {
    ingredient: string;
    measure: string;
  }

interface RecipeDetailsProps {
  selectedRecipes: Recipe[];
}

const RecipeDetails: React.FC<RecipeDetailsProps> = ({ selectedRecipes }) => {
  const getIngredients = () => {
    const ingredientsMap: Record<string, string> = {};

    selectedRecipes.forEach((recipe) => {
      recipe.ingredients?.forEach((ingredient: Ingredient) => {
        const { ingredient: name, measure } = ingredient;
        ingredientsMap[name] = measure;
      });
    });

    return Object.entries(ingredientsMap);
  };

  return (
    <div>
      <h2>Ingredients</h2>
      <ul>
        {getIngredients().map(([ingredient, measure]) => (
          <li key={ingredient}>
            {ingredient} - {measure}
          </li>
        ))}
      </ul>

      <h2>Instructions</h2>
      {selectedRecipes.map((recipe) => (
        <div key={recipe.idMeal}>
          <p>{recipe.strInstructions}</p>
        </div>
      ))}
    </div>
  );
};

export default RecipeDetails;
