import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AllRecipesPage from './components/AllRecipesPage'
import RecipePage from './components/RecipePage';
import SelectedRecipesPage from './components/SelectedRecipesPage';
import './App.css'

const queryClient = new QueryClient();

function App() {
  return (
    <>
    <QueryClientProvider client={queryClient}>
    <Router>
      <div>

      <header>
        <nav>
          <ul>
            <li>
              <Link to="/">All Recipes</Link>
            </li>
            <li>
              <Link to="/selected-recipes">Selected Recipes</Link>
            </li>
          </ul>
        </nav>
      </header>
      </div>
        <Routes>
          <Route path="/" element={<AllRecipesPage />} />
          <Route path="/recipe/:id" element={<RecipePage />} />
          <Route path="/selected-recipes" element={<SelectedRecipesPage />} />
        </Routes>
      </Router>
    </QueryClientProvider>
    </>
  )
}

export default App
