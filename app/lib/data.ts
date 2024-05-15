import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';
import {
  RecipesGrid,
  RecipeForm,
} from './definitions';
import { formatCurrency } from './utils';


// export async function fetchLatestInvoices() {
//   noStore();
//   try {
//     const data = await sql<LatestInvoiceRaw>`
//       SELECT recipes.amount, customers.name, customers.image_url, customers.email, recipes.id
//       FROM recipes
//       JOIN customers ON recipes.customer_id = customers.id
//       ORDER BY recipes.date DESC
//       LIMIT 5`;

//     const latestInvoices = data.rows.map((recipe) => ({
//       ...recipe,
//       amount: formatCurrency(recipe.amount),
//     }));
//     return latestInvoices;
//   } catch (error) {
//     console.error('Database Error:', error);
//     throw new Error('Failed to fetch the latest recipes.');
//   }
// }

const ITEMS_PER_PAGE = 8;
export async function fetchFilteredRecipes(
  query: string,
  currentPage: number,
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const recipes = await sql<RecipesGrid>`
      SELECT
        recipes.id,
        recipes.name,        
        recipes.image_url
      FROM recipes
      WHERE
        recipes.name ILIKE ${`%${query}%`}
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
      recipes.name ILIKE ${`%${query}%`} OR
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of recipes.');
  }
}

// export async function fetchRecipeById(id: string) {
//   noStore();
//   try {
//     const data = await sql<RecipeForm>`
//       SELECT
//         recipes.id,
//         recipes.customer_id,
//         recipes.amount,
//       FROM recipes
//       WHERE recipes.id = ${id};
//     `;

//     const recipe = data.rows.map((recipe) => ({
//       ...recipe,
//       // Convert amount from cents to dollars
//       amount: recipe.amount / 100,
//     }));

//     return recipe[0];
//   } catch (error) {
//     console.error('Database Error:', error);
//     throw new Error('Failed to fetch recipe.');
//   }
// }



