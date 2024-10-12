import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchRecipeById, Recipe } from './API';

const RecipePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: recipe, isLoading, error } = useQuery<Recipe | null, Error>({
    queryKey: ['recipe', id],
    queryFn: () => fetchRecipeById(id!),
  });

  const [selectedRecipes, setSelectedRecipes] = useState<Recipe[]>(() => {
    const storedRecipes = localStorage.getItem('selectedRecipes');
    return storedRecipes ? JSON.parse(storedRecipes) : [];
  });

  useEffect(() => {
    localStorage.setItem('selectedRecipes', JSON.stringify(selectedRecipes));
  }, [selectedRecipes]);

  const handleSelectRecipe = () => {
    if (recipe) {
      const isAlreadySelected = selectedRecipes.some(
        (selectedRecipe) => selectedRecipe.idMeal === recipe.idMeal
      );

      if (!isAlreadySelected) {
        const updatedSelectedRecipes = [...selectedRecipes, recipe];
        setSelectedRecipes(updatedSelectedRecipes);
      }
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading recipe</div>;
  if (!recipe) return <div>Recipe not found</div>;

  return (
    <div>
      <h1>{recipe.strMeal}</h1>
      <img src={recipe.strMealThumb} alt={recipe.strMeal} style={{ width: '300px' }} />
      <p><strong>Category:</strong> {recipe.strCategory}</p>
      <p><strong>Area:</strong> {recipe.strArea}</p>
      <p><strong>Instructions:</strong></p>
      <p>{recipe.strInstructions}</p>
      
      <h2>Ingredients</h2>
      <ul>
        {Array.isArray(recipe.ingredients) && recipe.ingredients.length > 0 ? (
          recipe.ingredients.map((ingredient, index) => (
            <li key={index}>
              {ingredient.ingredient} - {ingredient.measure}
            </li>
          ))
        ) : (
          <li>No ingredients available</li>
        )}
      </ul>

      <button onClick={handleSelectRecipe}>Add to Selected</button>

      {recipe.strTags && (
        <div>
          <h3>Tags</h3>
          <p>{recipe.strTags}</p>
        </div>
      )}

      {recipe.strYoutube && (
        <div>
          <h3>Watch on YouTube</h3>
          <a href={recipe.strYoutube} target="_blank" rel="noopener noreferrer">
            {recipe.strYoutube}
          </a>
        </div>
      )}

      {recipe.strSource && (
        <div>
          <h3>Source</h3>
          <a href={recipe.strSource} target="_blank" rel="noopener noreferrer">
            {recipe.strSource}
          </a>
        </div>
      )}
    </div>
  );
};

export default RecipePage;
