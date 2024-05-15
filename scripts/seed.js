const { db } = require('@vercel/postgres');
const {
    recipes,
    ingredients,
    instructions,
    users,
} = require('../app/lib/placeholder-data.js');
const bcrypt = require('bcrypt');

async function seedRecipes(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
        const createTable = await client.sql`
            CREATE TABLE IF NOT EXISTS recipes (
                id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                name: VARCHAR(255) NOT NULL,
                serving: INT,
                serving_amount: DOUBLE(4,2),
                serving_units: VARCHAR(64),
                preparation_time: VARCHAR(64),
                cook_time: VARCHAR(64),
                image_url: VARCHAR(255)
            );
        `;
        console.log(`Created 'recipes' table`);

        const insertedRecipes = await Promise.all(
            recipes.map(
                (recipes) => client.sql`
                INSERT INTO recipes (id, name, serving, serving_amount, serving_units, preparation_time, cook_time, image_url)
                VALUES (${recipes.id}, ${recipes.name}, ${recipes.serving}, ${recipes.serving_amount}, ${recipes.serving_units}, ${recipes.preparation_time}, ${recipes.preparation_time}, ${recipes.image_url})
                ON CONFLICT (id) DO NOTHING;
            `,
            ),
        );

        console.log(`Seeded ${insertedRecipes.length} recipes`);

        return {
            createTable,
            recipes: insertedRecipes,
        };
    } catch (error) {
        console.error('Error seeding recipes:', error);
        throw error;
    }
}

async function seedIngredients(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
        const createTable = await client.sql`
            CREATE TABLE IF NOT EXISTS ingredients (
                id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                name: VARCHAR(255) NOT NULL,
                name_full: VARCHAR(255),
                amount: DOUBLE(4,2),
                units: VARCHAR(64),
                recipe_id uuid FOREIGN KEY REFERENCES recipes(id)
            );
        `;
        console.log(`Created 'ingredients' table`);

        const insertedIngredients = await Promise.all(
            ingredients.map(
                (ingredients) => client.sql`
                INSERT INTO ingredients (id, name, name_full, amount, units, recipe_id)
                VALUES (${ingredients.id}, ${ingredients.name}, ${ingredients.name_full}, ${ingredients.amount}, ${ingredients.units}, ${ingredients.recipe_id})
                ON CONFLICT (id) DO NOTHING;
            `,
            ),
        );

        console.log(`Seeded ${insertedIngredients.length} ingredients`);

        return {
            createTable,
            ingredients: insertedIngredients,
        };
    } catch (error) {
        console.error('Error seeding ingredients:', error);
        throw error;
    }
}

async function seedInstructions(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
        const createTable = await client.sql`
            CREATE TABLE IF NOT EXISTS instructions (
                id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                position: INT NOT NULL,
                context: VARCHAR(1024) NOT NULL,
                recipe_id uuid FOREIGN KEY REFERENCES recipes(id)
            );
        `;
        console.log(`Created 'instructions' table`);

        const insertedInstructions = await Promise.all(
            instructions.map(
                (instructions) => client.sql`
                INSERT INTO instructions (id, position, context, recipe_id)
                VALUES (${instructions.id}, ${instructions.position}, ${instructions.context},  ${instructions.recipe_id})
                ON CONFLICT (id) DO NOTHING;
            `,
            ),
        );

        console.log(`Seeded ${insertedInstructions.length} instructions`);

        return {
            createTable,
            instructions: insertedInstructions,
        };
    } catch (error) {
        console.error('Error seeding instructions:', error);
        throw error;
    }
}

async function main() {
    const client = await db.connect();
  
    await seedRecipes(client);
    await seedIngredients(client);
    await seedInstructions(client);
  
    await client.end();
  }
  
  main().catch((err) => {
    console.error(
      'An error occurred while attempting to seed the database:',
      err,
    );
  });