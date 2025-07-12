import React, { useState, useRef } from "react";
import Headers from "./Header";
import ClaudeRecipe from "./ClaudeRecipe";
import IngredientsList from "./IngredientsList";
import { getRecipeFromGPT } from "./Ai";
import { ToastContainer, toast } from 'react-toastify';
import "../App.css"

function Main() {
  const [ingredients, setIngredients] = React.useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [receipe,setReceipe]=useState("")
  const recipeRef = useRef(null);

  function addIngredient(event) {
    event.preventDefault();
    const formel = event.currentTarget;
    const formData = new FormData(formel);
    const ingredient = formData.get("ingredient");
    
    if (ingredient && ingredient.trim()) {
      const normalizedIngredient = ingredient.trim().toLowerCase();
      
      // Check if ingredient already exists (case-insensitive)
      const isDuplicate = ingredients.some(existing => 
        existing.toLowerCase() === normalizedIngredient
      );
      
      if (isDuplicate) {
        toast.error("Ingredient already added!");
        return;
      }
      
      setIngredients((arr) => [...arr, ingredient.trim()]);
      // toast.success("Ingredient added successfully");
    }
    setReceipe("")
    formel.reset();
  }

  async function handleChange() {

    console.log("Ingredients:", ingredients);
    setReceipe("")
    setIsLoading(true)
    try {
      const recipe = await getRecipeFromGPT(ingredients);
      setReceipe(recipe);
      
      console.log("Recipe from GPT:", recipe);
      setTimeout(() => {
        if (recipeRef.current) {
          recipeRef.current.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } catch (err) {
      console.error("Error fetching recipe:", err);
    }finally{
      setIsLoading(false)
    }
  }

  return (
    <>
      <Headers />
      <main className="container-fluid p-25 custom-width ">
        <div>
          <form
            onSubmit={addIngredient}
            className=" row  form-label d-flex justify-content-center align-items-center gap-3 my-3 Main-ingredient-form  "
          >
            <input
              type="text"
              className="col-6 form-control"
              placeholder={`Start typing...${ingredients.length < 4  ? "(Enter at least 4 ingredients)" : ""}`}
              id="ingredient"
              name="ingredient"
            />
            <button
              id="ingredient"
              className="col-6 form-control Main-form-button bg-black text-white fs-6"
            >
              Add Ingredient
            </button>
          </form>
        </div>

        {ingredients.length > 0 && (
          <IngredientsList
            ingredients={ingredients}
            handleChange={handleChange}
            isLoading={isLoading}
            setIngredients={setIngredients}
          />
        )}

        {receipe && <div ref={recipeRef}><ClaudeRecipe  
        receipe={receipe} 
        isLoading={isLoading}
        /></div>}
      </main>
    </>
  );
}

export default Main;
