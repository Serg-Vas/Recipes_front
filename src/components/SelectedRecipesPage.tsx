import React, { useEffect, useState, useMemo } from 'react';
import RecipeCard from './RecipeCard';
import { Recipe } from './API';
import RecipeDetails from './RecipeDetails';
import DebouncedSearch from './DebouncedSearch';
import Pagination from './Pagination';
import CategoryFilter from './CategoryFilter';
import './SelectedRecipesPage.css';

const SelectedRecipesPage: React.FC = () => {
  const [selectedRecipes, setSelectedRecipes] = useState<Recipe[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 2;

  useEffect(() => {
    const storedRecipes = localStorage.getItem('selectedRecipes');
    if (storedRecipes) {
      setSelectedRecipes(JSON.parse(storedRecipes));
    }
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const filteredRecipes = useMemo(() => {
    return selectedRecipes.filter(recipe => {
      const mealMatch = recipe.strMeal.toLowerCase().includes(searchQuery.toLowerCase());
      const categoryMatch = selectedCategory ? recipe.strCategory === selectedCategory : true;
      return mealMatch && categoryMatch;
    });
  }, [selectedRecipes, searchQuery, selectedCategory]);

  const totalPages = Math.ceil(filteredRecipes.length / recipesPerPage);
  
  const paginatedRecipes = useMemo(() => {
    const startIndex = (currentPage - 1) * recipesPerPage;
    return filteredRecipes.slice(startIndex, startIndex + recipesPerPage);
  }, [filteredRecipes, currentPage, recipesPerPage]);

  const categories = useMemo(() => {
    const uniqueCategories = new Set(selectedRecipes.map(recipe => recipe.strCategory));
    return Array.from(uniqueCategories);
  }, [selectedRecipes]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filteredRecipes]);

  return (
    <div>
      <h1>Selected Recipes</h1>
      <DebouncedSearch onSearch={handleSearch}/>
      <CategoryFilter 
        categories={categories} 
        selectedCategory={selectedCategory} 
        onCategoryChange={handleCategoryChange}/>
      <div className="selected-recipes-list">
        {paginatedRecipes.length > 0 ? (
          paginatedRecipes.map((recipe) => (
            <div key={recipe.idMeal} className="recipe-container">
              <RecipeCard {...recipe} />
              <RecipeDetails selectedRecipes={[recipe]} />
            </div>
          ))
        ) : (<div>No recipes matching the search criteria.</div>)}
      </div>
      <Pagination 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default SelectedRecipesPage;
