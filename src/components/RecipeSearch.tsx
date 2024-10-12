// RecipeSearch.tsx
import React, { useMemo } from 'react';
import DebouncedSearch from './DebouncedSearch';
import { Recipe } from './API';

interface RecipeSearchProps {
  recipes: Recipe[];
  onSearchResults: (filteredRecipes: Recipe[]) => void;
}

const RecipeSearch: React.FC<RecipeSearchProps> = ({ recipes, onSearchResults }) => {
  const [searchQuery, setSearchQuery] = React.useState<string>('')

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const filteredRecipes = useMemo(() => {

    if (searchQuery.trim() === '') {
      return recipes;
    }

    return recipes.filter(recipe => {
      const mealMatch = recipe.strMeal.toLowerCase().includes(searchQuery.toLowerCase());
      const categoryMatch = recipe.strCategory.toLowerCase().includes(searchQuery.toLowerCase());
      const areaMatch = recipe.strArea.toLowerCase().includes(searchQuery.toLowerCase());
      return mealMatch || categoryMatch || areaMatch;
    });
  }, [recipes, searchQuery]);

  React.useEffect(() => {
    onSearchResults(filteredRecipes);
  }, [filteredRecipes, onSearchResults]);

  return (
    <div>
      <DebouncedSearch onSearch={handleSearch} />
    </div>
  );
};

export default RecipeSearch;
