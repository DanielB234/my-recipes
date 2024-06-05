'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import fs from "node:fs/promises";
import { InstructionsTable } from './definitions';
//import * as fs from 'fs';

const runtime = 'edge';

const RecipeFormSchema = z.object({
  name: z.string(),
  serving_amount: z.coerce.number().gt(0, { message: 'Please enter an amount greater than 0.' }),
  preparation_time: z.string().optional(),
  cook_time: z.string().optional()
  // file: z.object().optional()
});

const InstructionFormSchema = z.object({
  context: z.string().optional(),
  position: z.coerce.number(),
  list_reference: z.string(),
});



//const CreateInvoice = RecipeFormSchema.omit({ id: true, date: true });
const UpdateRecipe = RecipeFormSchema.omit({});
const CreateRecipe = RecipeFormSchema.omit({});
const CreateInstruction = InstructionFormSchema.omit({});
const UpdateInstruction = InstructionFormSchema.omit({ position: true, list_reference: true });
const DeleteInstruction = InstructionFormSchema.omit({ context: true, list_reference: true });
const DeleteInstructionSet = InstructionFormSchema.omit({ context: true, position: true });

export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

export async function uploadFile(formData: FormData) {
  const file = formData.get('file') as File
  const id = formData.get('id') as string
  const image_url = formData.get('image_url') as string
  const image_id = uuidv4()
  const arrayBuffer = await file.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);
  const image_url_full = '/web-images/' + image_id + '.png'
  try {
    await fs.unlink(`./public/${image_url}`)
  } catch (error) {
    
  }
  console.log(image_id)
  await fs.writeFile(`./public/web-images/${image_id}.png`, buffer);
  try {
    await sql`
          UPDATE recipes
          SET image_url = ${image_url_full}
          WHERE id = ${id}
          `;


  } catch (error) {
    return {
      message: 'Database Error: Failed to Update Recipe.'
    };
  }
  revalidatePath("/dashboard/recipes/"+id);
}

export async function createNewRecipe(formData: FormData) {
  const { name, serving_amount, preparation_time, cook_time } = CreateRecipe.parse({
    name: formData.get('name'),
    amount: formData.get('amount'),
    serving_amount: formData.get('serving_amount'),
    preparation_time: formData.get('preparation_time'),
    cook_time: formData.get('cook_time'),
  });
  const date = new Date()
  const dateSQL = (date).toISOString().split('T')[0]+' '+date.toTimeString().split(' ')[0];
  const id = uuidv4()
  try {
    await sql`
          INSERT INTO recipes (id, name, serving, serving_amount, serving_units, preparation_time, cook_time, date, todo_list, image_url)
          VALUES (${id},${name},'Serves',${serving_amount},'', ${preparation_time},${cook_time},${dateSQL},false,'')`;


  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Recipe.'
    };
  }
  revalidatePath('/dashboard/recipes/' + id);
  redirect('/dashboard/recipes/' + id)
}

export async function updateRecipe(id: string, formData: FormData) {
  const { name, serving_amount, preparation_time, cook_time } = UpdateRecipe.parse({
    name: formData.get('name'),
    amount: formData.get('amount'),
    serving_amount: formData.get('serving_amount'),
    preparation_time: formData.get('preparation_time'),
    cook_time: formData.get('cook_time'),
  });
  try {
    await sql`
          UPDATE recipes
          SET name = ${name}, 
          modifier = ${serving_amount}/serving_amount, 
          preparation_time = ${preparation_time},
          cook_time = ${cook_time}
          WHERE id = ${id}
          `;


  } catch (error) {
    return {
      message: 'Database Error: Failed to Update Recipe.'
    };
  }
  revalidatePath('/dashboard/recipes/' + id);
  console.log("update")

}

export async function deleteRecipe(id: string) {
  try {
    await sql`DELETE FROM recipes WHERE id = ${id}`;
    await sql`DELETE FROM list_references WHERE recipe_id = ${id}`;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Delete Recipe.'
    };
  }
  revalidatePath('/dashboard/recipes');
  redirect('/dashboard/recipes')
}

export async function addRecipeToSchedule(id: string) {
  try {
    await sql`UPDATE recipes SET todo_list = NOT todo_list WHERE id = ${id}`;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Schedule Recipe.'
    };
  }
  revalidatePath('/dashboard/recipes');
}

export async function createNewInstruction(context: string, list_reference: string, position: number, recipe_id: string, id: string) {
  try {
    await sql`
        INSERT INTO instructions (id, position, context, list_reference, recipe_id)
        VALUES (${id}, ${position}, ${context}, ${list_reference}, ${recipe_id}) 
        ON CONFLICT (id) DO NOTHING;
          `;

  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Recipe.'
    };
  }
}

export async function updateInstructionSet(
  id: string,
  name: string, 
  list_reference: string, 
  deleteSets: InstructionsTable[], 
  updateSets: InstructionsTable[], 
  createSets: InstructionsTable[], 
  new_list_reference: boolean) {
  try {
    if (new_list_reference) {
      await createNewListReference(name, id, list_reference)
    } else {
      await updateListReference(name, list_reference)
    }
    for (let instruction of createSets) {
      await createNewInstruction(instruction.context, instruction.list_reference, instruction.position, instruction.recipe_id, instruction.id)
    }
    for (let instruction of updateSets) {
      await updateInstruction(instruction.context, instruction.list_reference, instruction.id, instruction.position)
    }
    for (let instruction of deleteSets) {
      await deleteInstruction(instruction.list_reference, instruction.position)
    }
  } catch (error) {
    return {
      message: 'Could not update instructions'
    }
  }
  console.log("test"+ id)
  revalidatePath('/dashboard/recipes/' + id, 'page');
  
}

export async function updateInstruction(context: string,
  list_reference:
    string, id:
    string, new_position: number) {
  try {
    await sql`
      UPDATE instructions
      SET context = ${context},
      position = ${new_position}
      WHERE list_reference = ${list_reference} AND id = ${id};
        `;

  } catch (error) {
    return {
      message: 'Database Error: Failed to Update Recipe.'
    };

  }
}

export async function deleteInstruction(list_reference: string, position: number) {
  try {
    await sql`
      DELETE FROM instructions
      WHERE list_reference = ${list_reference} and position = ${position};
      `
    await sql`
      UPDATE instructions
      SET position = position - 1
      WHERE position > ${position} AND list_reference = ${list_reference}`

  } catch (error) {
    return {
      message: 'Database Error: Failed to Update Recipe.'
    };
  }
}

export async function deleteInstructionSet(list_reference: string, recipe_id: string) {
  try {
    await sql`
      DELETE FROM instructions
      WHERE list_reference = ${list_reference}
        `;
    await sql`
        DELETE FROM list_references
        WHERE id = ${list_reference}
          `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Update Recipe.'
    };
  }
  revalidatePath('/dashboard/recipes/' + recipe_id);
}

export async function updateListReference(name: string, list_reference: string) {
  try {
    await sql`
      UPDATE list_references
      SET name = ${name}
      WHERE id = ${list_reference};
        `;

  } catch (error) {
    return {
      message: 'Database Error: Failed to Update Recipe.'
    };
  }
}

export async function createNewListReference(name: string, recipe_id: string, id: string) {
  try {
    await sql`
      INSERT INTO list_references (id, position, name, word_coefficient, recipe_id)
      VALUES (${id},0,${name},1, ${recipe_id})
        `;

  } catch (error) {
    return {
      message: 'Database Error: Failed to Update Recipe.'
    };
  }
}



export async function deleteIngredientSet(list_reference: string, recipe_id: string) {
  try {
    await sql`
      DELETE FROM ingredients
      WHERE list_reference = ${list_reference}
        `;
    await sql`
        DELETE FROM list_references
        WHERE id = ${list_reference}
          `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Update Recipe.'
    };
  }
  revalidatePath('/dashboard/recipes/' + recipe_id);
}

export async function addToShoppingList(id: string, recipe_id: string) {
  try {
    await sql`UPDATE ingredients SET shopping_list = NOT shopping_list WHERE id = ${id}`;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Add to Shopping List.'
    };
  }
  revalidatePath('/dashboard/recipes/' + recipe_id);
}

export async function removeAllShoppingListItems() {
  try {
    await sql`UPDATE ingredients SET shopping_list = false`;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Add to Shopping List.'
    };
  }
  revalidatePath('/dashboard');
}

export async function removeAllScheduledRecipes() {
  try {
    await sql`UPDATE recipes SET todo_list = false`;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Add to Shopping List.'
    };
  }
  revalidatePath('/dashboard');
}
