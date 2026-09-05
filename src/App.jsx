import './App.css'
import { useState } from 'react'
import IngredientsList from './components/IngredientsList.jsx';
import ClaudeRecipe from './components/ClaudeRecipes.jsx';
import { getRecipeFromMistral } from '../ai.js'
function App() {
  const [ingredients, setIngredients] = useState([]);
  function handleIngredients(formData) {
    // const ingredient = document.getElementsByName("textbar")[0].value;
    // setIngredients([...ingredients, ingredient]);

    const ingredient = formData.get("textbar");
    setIngredients([...ingredients, ingredient]);
  }
  const [loading, setLoading] = useState(false); // 1. Added loading state
  const [recipe, setRecipe] = useState("")
  const [recipeShown, setRecipeShown] = useState(false)
  async function handleRecipe() {
    setLoading(true);
    try {
    const recipe = await getRecipeFromMistral(ingredients);
    setRecipeShown(prevShown => !prevShown)

    setRecipe(recipe);
  } catch (err) {
    console.error("Error fetching recipe:", err);
  }
  finally {
    setLoading(false);
  }
}
  

    function removeIngredient(index) {
      const newIngredients = [...ingredients];
      newIngredients.splice(index, 1);
      setIngredients(newIngredients);
    }
  return (
    <div className="main">
      <form action={handleIngredients} className="search-bar" >
        <input className="textbar" required type="text" placeholder="e.g. Spinach" name="textbar" id="textbar" />
        <button className="add-ingredient">+ Add Ingredient </button>
      </form>
      <div className="ingredient-list">
        <ul>
          {<IngredientsList ingredients={ingredients} removeIngredient={removeIngredient} toggleRecipeShown={handleRecipe} />}
        </ul>
      </div>
      {loading && (
  <div className="loading-container">
    <p>Generating your recipe</p>
    <div className="bouncing-dots">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
)}
      {recipeShown && (
        <div className="suggested-recipe-container">
          {<ClaudeRecipe recipe={recipe} />}
        </div>
      )} 
    </div>
  )
}

export default App
