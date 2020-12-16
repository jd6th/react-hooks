import React, {useState, useEffect, useCallback} from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList'; 
import Search from './Search';

const Ingredients = () => {
  const [userIngredients, setUserIngredients] = useState([]);

  // Search.js loads the ingredients now
  // useEffect(() => {
  // 	fetch('https://react-hooks-39826.firebaseio.com/ingredients.json')
  // 		.then(response => response.json())
  // 		.then(responseData => {
  // 			const loadedIngredients = [];
  // 			for(const key in responseData){
  // 				loadedIngredients.push({
  // 					id: key,
  // 					title: responseData[key].title,
  // 					amount: responseData[key].amount
  // 				});
  // 			}

  // 			setUserIngredients(loadedIngredients);
  // 		});
  // },[]);

  const filteredIngredientsHandler = useCallback(filteredIngredients => {
  	setUserIngredients(filteredIngredients);
  },[]);

  const addIngredientHandler = ingredient => {
  	fetch('https://react-hooks-39826.firebaseio.com/ingredients.json',{
  		method: 'POST',
  		body: JSON.stringify(ingredient),
  		headers: {'Content-Type':'application/json'}
  	}).then(response => {
  		return response.json();
  	}).then(responseData => {
	  	setUserIngredients(previousState => [
	  			...previousState,
	  			{ id: responseData.name, ...ingredient}
	  		]);
  	});
  };

  const removeIngredientHandler = id => {
  	// const updatedIngredients = userIngredients.filter(ingredient => {
  	// 	return ingredient.id !== id
  	// });

  	// setUserIngredients(updatedIngredients);

  	setUserIngredients(previousState => 
  		previousState.filter(ingredient =>ingredient.id !== id)
  	);
  };

  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler} />

      <section>
        <Search onLoadedIngredients={filteredIngredientsHandler} />
        <IngredientList ingredients={userIngredients} onRemoveItem={removeIngredientHandler} />
        {/* Need to add list here! */}
      </section>
    </div>
  );
}

export default Ingredients;
