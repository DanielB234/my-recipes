// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.

export type Recipe = {
  id: string;
  name: string;
  serving: 'Serves' | 'Makes' | 'Yield';
  serving_amount: string;
  preparation_time: string;
  cook_time: string;
  image_url: string;
};

export type LatestRecipe = {
  id: string;
  name: string;
  serving: 'Serves' | 'Makes';
  serving_amount: string;
  image_url: string;
};

export type RecipesGrid = {
  id: string;
  name: string;
  serving: 'Serves' | 'Makes';
  serving_amount: string;
  image_url: string;
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

export type IngredientsTable = {
  id: string;
  name: string;
  amount: number;
  unit: string;
}





