import '../Recipe.css'
export default function IngredientsList(props) {
    const hasIngredients = props.ingredients.length > 0;

    const ingredientList = hasIngredients ? props.ingredients.map((ingredient, index) => (
    <div className="ingredient-item" key={index}>  
    
    <li key={index}>{ingredient} </li> <span><button className="remove-ingredient" onClick={() => {
     
      props.removeIngredient(index);
    }}>Remove</button>
    </span>
    </div>
  )) : <li key="no-ingredients">No ingredients added yet.</li>;
    return (
        <section>
            <h2>Ingredients on hand:</h2>
            <ul className="ingredients-list" aria-live="polite">{ingredientList}</ul>
            {props.ingredients.length > 3 && <div className="get-recipe">
                <div>
                    <h3>Ready for a recipe?</h3>
                    <p>Generate a recipe from your list of ingredients.</p>
                </div>
                <button className="recipe" onClick={props.toggleRecipeShown}>Get a recipe</button>
            </div>}
        </section>
    )
}