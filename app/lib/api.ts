'use server';

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { v4 as uuidv4 } from 'uuid';

export async function getNewRecipe(url: string) {
  let recipeId = uuidv4();
  try {
    await fetch('http://localhost:5000/scraper?q=' + url + '&id=' + recipeId, { method: 'GET' }).then(res => res.json()).then(data => {
    }).catch((error) => console.log(error));

  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Recipe.'
    };
  }
  revalidatePath('/dashboard/recipes/' + recipeId);
  redirect("/dashboard/recipes/" + recipeId);
}

export async function exportRecipe(id: string) {
  try {
    await fetch('http://localhost:5000/send_email?q=' + id, { method: 'GET' }).then(res => res.json()).then(data => {

    }).catch((error) => console.log(error));

  } catch (error) {
    return {
      message: 'Database Error: Failed to save Image.'
    };
  }
}

export async function exportShoppingList() {
  try {
    await fetch('http://localhost:5000/send_shopping_email', { method: 'GET' }).then(res => res.json()).then(data => {
    }).catch((error) => console.log(error));
  } catch (error) {
    return {
      message: 'Database Error: Failed to save Image.'
    };
  }
}

export async function updateIngredientSet(id: string, list_reference: string, formData: FormData) {
  const data = JSON.stringify(Object.fromEntries(formData));
  try {
    await fetch('http://localhost:5000/save_ingredients?recipe_id=' + id + "&list_references=" + list_reference + "&ingredients_data=" + data, { method: 'POST' }).then(res => res.json()).then(data => {
        revalidatePath('/dashboard/recipes/' + id);
    }).catch((error) => console.log(error));
  } catch (error) {
    return {
      message: 'Database Error: Failed to save Ingredients.'
    };
  }
  
  revalidatePath('/dashboard/recipes/' + id);
  
}
