import React, { useState } from 'react'
import { RxCross2 } from "react-icons/rx";
import { CiEdit } from "react-icons/ci";
import { IoMdSave } from "react-icons/io";


function IngredientsList({ingredients,handleChange,isLoading,setIngredients}) {
     const [isEditMode, setIsEditMode] = useState(false);
     
     const ingredientListItems=ingredients.map((item,index)=> <li key={item}>{item}
     {isEditMode && <span className='' onClick={()=>handleDelete(index)} style={{cursor:"pointer"}}><RxCross2 size={15} className='text-danger'/></span>}
     </li>)
     function handleDelete(index){
      setIngredients(ingredients.filter((_,i)=>i!==index))
     }
     
     const toggleEditMode = () => {
       setIsEditMode(!isEditMode);
     };
     
  return (
    <>
   <section>
        <h2 className="d-flex align-items-center gap-2">
          Ingredients on hand
          <button 
            onClick={toggleEditMode} 
            className={`btn btn-sm ${isEditMode ? 'btn-primary' : 'btn-outline-success'} d-flex align-items-center gap-1`}
            style={{fontSize: '0.875rem', padding: '0.25rem 0.5rem'}}
          >
            {isEditMode ? (
              <>
                <IoMdSave size={16} />
                Save
              </>
            ) : (
              <>
                <CiEdit size={16} />
                Edit
              </>
            )}
          </button>
        </h2>
      <ul>
      {ingredientListItems}
      </ul>
      {ingredients.length>3&&
      <div className='row  rounded  d-flex justify-content-center align-items-center mb-3'>
      <div className='w-75 get-receipe-container d-flex flex-wrap flex-md-nowrap justify-content-between align-items-center rounded-3 py-3 changes-done'>
        <div className='col-12 col-md-6 d-flex flex-column justify-content-center'>
          <p className='fs-3 fw-semibold'>Ready for a reciepe?</p>
          <p className=''>Generate a recipe from your list of ingredients.</p>
        </div>
        <div className='col d-flex justify-content-end align-items-center '>
        <button className='btn btn-success receipe-btn' 
        onClick={handleChange}
        disabled={isLoading}
        >
          {isLoading ? "Generating..." : "Get a receipe"}
          </button>
        </div>
      </div>
    </div>
      }
      </section>
    </>
  )
}

export default IngredientsList