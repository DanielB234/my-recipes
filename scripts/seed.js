const { db } = require('@vercel/postgres');
const {
    measurements,
    measurement_perms
} = require('../app/lib/placeholder-data.js');
const bcrypt = require('bcrypt');

async function seedRecipes(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
        const createTable = await client.sql`
            CREATE TABLE IF NOT EXISTS recipes (
                id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                serving VARCHAR(64),
                serving_amount FLOAT(4),
                serving_units VARCHAR(64),
                preparation_time VARCHAR(64),
                cook_time VARCHAR(64),
                date DATE NOT NULL,
                modifier FLOAT(4) NOT NULL DEFAULT 1,
                image_url VARCHAR(255),
                todo_list BOOL NOT NULL
            );
        `;
        console.log(`Created 'recipes' table`);
        return {
            createTable,
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
                name VARCHAR(255) NOT NULL,
                name_full VARCHAR(255),
                amount FLOAT(4),
                amount_upper FLOAT(4),
                units VARCHAR(64),
                shopping_list BOOL NOT NULL,
                list_reference UUID NOT NULL REFERENCES list_references(id),
                recipe_id UUID REFERENCES recipes(id) ON DELETE CASCADE
            );
        `;
        console.log(`Created 'ingredients' table`);
        return {
            createTable,
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
                position INT NOT NULL,
                context VARCHAR(1024) NOT NULL,
                list_reference UUID NOT NULL REFERENCES list_references(id) ON DELETE CASCADE,
                recipe_id UUID REFERENCES recipes(id) ON DELETE CASCADE
            );
        `;
        console.log(`Created 'instructions' table`);


        return {
            createTable,
        };
    } catch (error) {
        console.error('Error seeding instructions:', error);
        throw error;
    }
}

async function seedListReferences(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
        const createTable = await client.sql`
            CREATE TABLE IF NOT EXISTS list_references (
                id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                name VARCHAR(255) NOT NULL DEFAULT '0',
                word_coefficient FLOAT(4),
                position INT NOT NULL,
                recipe_id UUID NOT NULL
            );
        `;
        console.log(`Created 'list_references' table`);
        return {
            createTable,
        };
    } catch (error) {
        console.error('Error seeding list_references:', error);
        throw error;
    }
}

async function seedMeasurements(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
        const createTable = await client.sql`
            CREATE TABLE IF NOT EXISTS measurements (
                id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                name VARCHAR(64) NOT NULL
            );
        `;
        console.log(`Created 'measurements' table`);

        const insertedMeasurements = await Promise.all(
            measurements.map(
                (measurements) => client.sql`
                INSERT INTO measurements (id, name)
                VALUES (${measurements.id}, ${measurements.name})
                ON CONFLICT (id) DO NOTHING;
            `,
            ),
        );

        console.log(`Seeded ${insertedMeasurements.length} measurements`);

        return {
            createTable,
            measurements: insertedMeasurements,
        };
    } catch (error) {
        console.error('Error seeding measurements:', error);
        throw error;
    }
}

async function seedMeasurementPerms(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
        const createTable = await client.sql`
            CREATE TABLE IF NOT EXISTS measurement_perms (
                id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                name VARCHAR(64) NOT NULL,
                measurement UUID REFERENCES measurements(id)
            );
        `;
        console.log(`Created 'measurement_perms' table`);

        const insertedInstructionPerms = await Promise.all(
            measurement_perms.map(
                (measurement_perms) => client.sql`
                INSERT INTO measurement_perms (id, name, measurement)
                VALUES (${measurement_perms.id}, ${measurement_perms.name}, ${measurement_perms.measurement})
                ON CONFLICT (id) DO NOTHING;
            `,
            ),
        );

        console.log(`Seeded ${insertedInstructionPerms.length} measurement_perms`);

        return {
            createTable,
            measurement_perms: insertedInstructionPerms,
        };
    } catch (error) {
        console.error('Error seeding measurement_perms:', error);
        throw error;
    }
}



async function main() {
    const client = await db.connect();
    await seedRecipes(client);
    await seedIngredients(client);
    await seedInstructions(client);
    await seedListReferences(client);
    await seedMeasurements(client); 
    await seedMeasurementPerms(client);  
    await client.end();
  }
  
  main().catch((err) => {
    console.error(
      'An error occurred while attempting to seed the database:',
      err,
    );
  });