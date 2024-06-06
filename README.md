## Info

If you, like me enjoy cooking, you know that it can be difficult to organise recipes,
you may find a recipe online and have to spend ages scrolling to the bottom of the page to get the relevant information, you may find that the recipe requires ingredients that you don't have or cannot find and may come with portion sizes that don't fit your plans. and then you need to remember this web page, if you want to use it again.

This application can solve those problems, we can apply a web scraping algorithm that will gather relevant data from the web page such as ingredients, instructions and portion sizes. We can then present them to the user in a simple, readable and editable format. ingredients will be parsed into separate amounts, units and ingredient names, and instructions shall be detected using a trained classifier. the user can modify these recipes at will, adding, updating, repositioning and deleting data as they see fit.

Additionally users can save images of the recipes, and create PDF's of recipes and email them to the user. Users can create a shopping list of ingredients they want to purchase by clicking on them with the shopping list toggle enabled, they can also send a PDF of this list to their email. Finally they are also able to schedule recipes, so that they can be reminded to make them later

## General Setup

This application requires 2 packages and a postgres database to function,

The first package is this current one 'my-recipes' is a React project with Next.js, provides the front end, as well as some database actions through Next.js server actions. Next.js is supported by vercel, which can also provide a Postgres database for the project. The backend is written in Python with Flask, and contains the scraping code and serveral extra functions


## Installation

Ensure that npm is installed

Install npm packages

```bash
npm i
```

ensure that these constants are assigned in a .env file

POSTGRES_URL
POSTGRES_PRISMA_URL
POSTGRES_URL_NO_SSL
POSTGRES_URL_NON_POOLING
POSTGRES_USER
POSTGRES_HOST
POSTGRES_PASSWORD
POSTGRES_DATABASE

Run the development server:


```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
