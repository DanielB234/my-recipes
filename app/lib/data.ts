import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';
import {
  RecipesGrid,
  RecipeImage,
  IngredientsTable,
  InstructionsTable,
  Recipe,
  ScheduledRecipe,
  InstructionsHeader,
  IngredientsHeader,
} from './definitions';



const ITEMS_PER_PAGE = 9;
export async function fetchFilteredRecipes(
  query: string,
  currentPage: number,
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const recipes = await sql<RecipesGrid>`
      SELECT
        DISTINCT recipes.id,
        recipes.name,        
        recipes.image_url,
        recipes.preparation_time,
        recipes.cook_time,
        recipes.date,
        recipes.serving,
        recipes.serving_amount,
        recipes.serving_units,
        recipes.modifier
      FROM recipes
      INNER JOIN ingredients ON recipes.id = ingredients.recipe_id
      WHERE
        recipes.name ILIKE ${`%${query}%`}
        OR ingredients.name ILIKE ${`%${query}%`}
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return recipes.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch recipes.');
  }
}

export async function fetchRecipesPages(query: string) {
  noStore();
  try {
    const count = await sql`SELECT COUNT(*)
    FROM recipes
    WHERE
      recipes.name ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    console.log(count);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of recipes.');
  }
}

export async function fetchScheduledRecipes() {
  noStore();
  try {
    const recipes = await sql<ScheduledRecipe>`
    SELECT 
      recipes.id,
      recipes.name,
      recipes.serving,
      recipes.serving_amount,
      recipes.serving_units
    FROM recipes
    WHERE
      recipes.todo_list = true
    `;

    return recipes.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of recipes.');
  }
}

export async function fetchRecipeById(id: string) {

  try {
    const recipe = await sql<Recipe>`
      SELECT 
        recipes.id,
        recipes.name,
        recipes.serving,
        recipes.serving_amount,
        recipes.serving_units,
        recipes.date,
        recipes.image_url,
        recipes.preparation_time,
        recipes.cook_time,
        recipes.todo_list,
        recipes.modifier
      FROM recipes 
      WHERE recipes.id = ${id}
    `;

    return recipe.rows[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch recipe.');
  }
}


export async function fetchShoppingList() {
  noStore();
  try {
    const recipes = await sql`
    SELECT 
      ingredients.recipe_id,
      ingredients.id,
      recipes.name AS recipe_name,
      ingredients.name AS ingredient_name
    FROM ingredients
    INNER JOIN recipes ON recipes.id = ingredients.recipe_id
    WHERE
      ingredients.shopping_list = true
    `;

    return recipes.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of recipes.');
  }
}

export async function fetchIngredientsByRecipeIdAndName(id: string, names: IngredientsHeader[]) {
  noStore()
  let ingredientSets = []
  for (let name of names) {
    ingredientSets.push(await fetchIngredientsByName(id,name.list_reference))
    name.ingredients_table = await fetchIngredientsByName(id,name.list_reference)
  }
  return names;
  
}

export async function fetchIngredientNamesByID(id: string) {
  noStore();
  try {
    const ingredients = await sql<IngredientsHeader>`
      SELECT 
        DISTINCT list_references.name, 
        list_references.word_coefficient, 
        ingredients.list_reference,
        list_references.position,
        ingredients.recipe_id
        
      FROM ingredients 
      INNER JOIN list_references on ingredients.list_reference = list_references.id
      
      WHERE ingredients.recipe_id = ${id}
      ORDER BY list_references.position 
      

    `;

    const data = await fetchIngredientsByRecipeIdAndName(id, ingredients.rows)
    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch ingredient set.');
  }
}

export async function fetchIngredientsByName(id: string, name: string) {
  noStore();
  try {
    const ingredients = await sql<IngredientsTable>`
      SELECT 
        ingredients.id,
        ingredients.name,
        ingredients.name_full,
        ingredients.units,
        ingredients.amount,
        ingredients.amount_upper,
        ingredients.shopping_list,
        recipes.serving_amount,
        recipes.modifier,
        ingredients.recipe_id
      FROM ingredients 
      INNER JOIN recipes on ingredients.recipe_id = recipes.id
      WHERE ingredients.recipe_id = ${id} and ingredients.list_reference = ${name}
    `;

    return ingredients.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch ingredients.');
  }
}

export async function fetchInstructionsByRecipeIdAndName(id: string, names: InstructionsHeader[]) {
  noStore()
  let instructionSets = []
  for (let name of names) {
    instructionSets.push(await fetchInstructionsByName(id,name.list_reference))
    name.instructions_table = await fetchInstructionsByName(id,name.list_reference)
  }
  return names;
  
}

export async function fetchInstructionNamesByID(id: string) {
  noStore();
  try {
    let instructions = await sql<InstructionsHeader>`
      SELECT 
        DISTINCT list_references.name, 
        list_references.word_coefficient, 
        instructions.list_reference,
        list_references.position
      FROM instructions 
      INNER JOIN list_references on instructions.list_reference = list_references.id
      WHERE instructions.recipe_id = ${id}
      ORDER BY list_references.position 
      

    `;
    const data = await fetchInstructionsByRecipeIdAndName(id, instructions.rows)
    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch instructions.');
  }
}

export async function fetchInstructionsByName(id: string, name: string) {
  noStore();
  try {
    const instructions = await sql<InstructionsTable>`
      SELECT 
        instructions.id,
        instructions.context,
        instructions.position,
        instructions.list_reference,
        instructions.recipe_id
      FROM instructions 
      WHERE instructions.recipe_id = ${id} and instructions.list_reference = ${name}
      ORDER BY instructions.position
    `;
    
    return instructions.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch instructions.');
  }
}

export async function fetchMeasurementPerms() {
  noStore();
  try {
    const image = await sql`
      SELECT name FROM measurement_perms
    `;
    return image.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch image.');
  }
}




