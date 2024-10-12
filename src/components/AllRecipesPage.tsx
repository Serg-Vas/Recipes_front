import React, { useMemo, useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchAllRecipes, Recipe } from './API';
import DebouncedSearch from './DebouncedSearch';
import RecipeCard from './RecipeCard';
import CategoryFilter from './CategoryFilter';
import Pagination from './Pagination';

const AllRecipesPage: React.FC = () => {
  const { data: recipes, isLoading, error } = useQuery<Recipe[], Error>({
    queryKey: ['recipes'],
    queryFn: fetchAllRecipes,
  });

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 8;

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const filteredRecipes = useMemo(() => {
    if (!recipes) return [];
    return recipes.filter(recipe => {
      const mealMatch = recipe.strMeal.toLowerCase().includes(searchQuery.toLowerCase());
      const categoryMatch = selectedCategory ? recipe.strCategory === selectedCategory : true;
      return mealMatch && categoryMatch;
    });
  }, [recipes, searchQuery, selectedCategory]);

  const totalPages = Math.ceil(filteredRecipes.length / recipesPerPage);

  const paginatedRecipes = useMemo(() => {
    const startIndex = (currentPage - 1) * recipesPerPage;
    return filteredRecipes.slice(startIndex, startIndex + recipesPerPage);
  }, [filteredRecipes, currentPage, recipesPerPage]);

  const categories = useMemo(() => {
    const uniqueCategories = new Set(recipes?.map(recipe => recipe.strCategory));
    return Array.from(uniqueCategories);
  }, [recipes]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filteredRecipes]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading recipes</div>;

  return (
    <div>
      <DebouncedSearch onSearch={handleSearch} />
      <CategoryFilter categories={categories} selectedCategory={selectedCategory} onCategoryChange={handleCategoryChange} />
      <div className="recipes-grid">
        {paginatedRecipes.length > 0 ? (
          paginatedRecipes.map(recipe => (
            <RecipeCard {...recipe} />
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

export default AllRecipesPage;
