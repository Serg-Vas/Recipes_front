import axios from 'axios';

const API_URL = 'https://www.themealdb.com/api/json/v1/1';

export interface Recipe {
    idMeal: string;
    strMeal: string;
    strCategory: string;
    strArea: string;
    strMealThumb: string;
  }
  
  export const fetchAllRecipes = async (): Promise<Recipe[]> => {
    const response = await axios.get(`${API_URL}/search.php?s=`);
    
    if (response.data.meals) {
      return response.data.meals.map((meal: any) => ({
        idMeal: meal.idMeal,
        strMeal: meal.strMeal,
        strCategory: meal.strCategory,
        strArea: meal.strArea,
        strMealThumb: meal.strMealThumb,
      }));
    }
    return [];
  };

  export interface Recipe {
    idMeal: string;
    strMeal: string;
    strCategory: string;
    strArea: string;
    strMealThumb: string;
    strInstructions: string;
    [key: string]: any;
  }
  
  export const fetchRecipeById = async (id: string): Promise<Recipe | null> => {
    const response = await axios.get(`${API_URL}/lookup.php?i=${id}`);
    const meal = response.data.meals ? response.data.meals[0] : null;
  
    if (meal) {
      const ingredients = Object.keys(meal)
        .filter(key => key.startsWith('strIngredient') && meal[key])
        .map((key) => ({
          ingredient: meal[key],
          measure: meal[`strMeasure${key.slice(13)}`], // Одиниця виміру
        }));
  
      return {
        idMeal: meal.idMeal,
        strMeal: meal.strMeal,
        strCategory: meal.strCategory,
        strArea: meal.strArea,
        strInstructions: meal.strInstructions,
        strMealThumb: meal.strMealThumb,
        strTags: meal.strTags,
        strYoutube: meal.strYoutube,
        strSource: meal.strSource,
        ingredients,
      };
    }
    return null;
  };
  