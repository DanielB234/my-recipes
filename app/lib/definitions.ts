export type Recipe = {
  id: string;
  name: string;
  serving: string;
  serving_amount: string;
  serving_units: string;
  preparation_time: string;
  cook_time: string;
  date: string;
  image_url: string;
  todo_list: string;
  modifier: number;
};


export type ScheduledRecipe = {
  id: string;
  name: string;
  serving: string;
  serving_amount: string;
  serving_units: string;
};

export type ShoppingList = {
  id: string;
  ingredient_name: string;
  recipe_name: string;
};

export type RecipesGrid = {
  id: string;
  name: string;
  serving: string;
  serving_amount: number;
  serving_units: string;
  image_url: string;
  preparation_time: string;
  cook_time: string;
  date: string;
};

export type RecipeForm = {
  id: string;
  name: string;
  serving: 'Serves' | 'Makes' | 'Yield';
  serving_amount: string;
  preparation_time: string;
  cook_time: string;
  image_url: string;
};

export type RecipeImage = {
  id: string;
};

export type IngredientsTable = {
  id: string;
  name: string;
  amount: number;
  units: string;
  amount_upper: number;
  recipe_id: string;
  list_reference: string;
  shopping_list: boolean;
}

export type IngredientsHeader = {
  recipe_id: string
  name: string;
  list_reference: string;
  ingredients_table: IngredientsTable[];
}

export type InstructionsHeader = {
  recipe_id: string;
  name: string;
  list_reference: string;
  instructions_table: InstructionsTable[];
}
export type InstructionsTable = {
  id: string;
  context: string;
  position: number;
  recipe_id: string; 
  list_reference: string;
}

export type State = {
  items: InstructionsTable[];
  draggingItem?: InstructionsTable;
  newItemName: string;
} 




