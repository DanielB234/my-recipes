// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
// https://nextjs.org/learn/dashboard-app/fetching-data
const users = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    name: 'User',
    email: 'user@nextmail.com',
    password: '123456',
  },
];

const recipes = [
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    recipe_name: 'Spaghetti Carbonara',
    serving: 0,
    serving_amount: 4,
    serving_units: null,
    preparation_time: '15 mins - 20 mins',
    cook_time: '15 mins',
    image_url: '/web-images/recipe-image-legacy-id-1001491_11-2e0fa5c.png',
  },
  {
    id: '3958dc9e-712f-4377-d5e9-fec4b6a6442a',
    recipe_name: 'Tzatziki',
    serving: 2,
    serving_amount: 2.5,
    serving_units: 'Cups',
    preparation_time: '15 mins',
    cook_time: '15 mins',
    image_url: '/web-images/best-tzatziki-recipe-1-768x1154.png',
  },
];

const ingredients = [
  {
    id: '3958dc9e-712f-43j7-85e9-fec4b6a6442a',
    amount: 100,
    unit: 'grams',
    name: 'pancetta', 
    name_full: null,
    recipe_id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
  },
  {
    id: '3958dc9e-737f-4377-85e9-fec4b6a6442a',
    amount: 50,
    unit: 'grams',
    name: 'pecorino cheese', 
    name_full: null,
    recipe_id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
  },
  {
    id: '50ca3e18-62cd-11ee-8c99-0242ac120002',
    amount: 50,
    unit: 'grams',
    name: 'parmesan', 
    name_full: null,
    recipe_id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
  },
  {
    id: '76d65c26-f784-44a2-ac19-586678f7c2f2',
    amount: 3,
    unit: null,
    name: 'large eggs', 
    name_full: null,
    recipe_id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
  },
  {
    id: '3958dc9e-737f-4477-85e9-fec4b6a6442a',
    amount: 350,
    unit: 'grams',
    name: 'spaghetti', 
    name_full: null,
    recipe_id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
  },
  {
    id: '3958dc9e-737f-4377-85e9-fec466a6442a',
    amount: 2,
    unit: null,
    name: 'garlic cloves', 
    name_full: null,
    recipe_id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
  },
  {
    id: '3978dc9e-737f-4377-85e9-fec4b6a6442a',
    amount: 50,
    unit: 'grams',
    name: 'unsalted butter', 
    name_full: null,
    recipe_id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
  },
  {
    id: '3978dc9e-737f-4377-85e9-fec4b6a6442a',
    amount: 2,
    unit: 'cups',
    name: "cucumber",
    name_full: 'grated cucumber (from about 1 medium 10-ounce cucumber, no need to peel or seed the cucumber first, grate on the large holes of your box grater)', 
    recipe_id: '3958dc9e-712f-4377-d5e9-fec4b6a6442a',
  },
  {
    id: '3978dc9e-737f-4377-85e9-fec4b6a6442a',
    amount: 1.5,
    unit: 'cups',
    name: 'plain Greek yogurt', 
    name_full: null,
    recipe_id: '3958dc9e-712f-4377-d5e9-fec4b6a6442a',
  },
  {
    id: '3978dc9e-737f-4377-85e9-fec4b6a6442a',
    amount: 2,
    unit: 'tablespoons',
    name: 'extra-virgin olive oil', 
    name_full: null,
    recipe_id: '3958dc9e-712f-4377-d5e9-fec4b6a6442a',
  },
  {
    id: '3978dc9e-737f-4377-85e9-fec4b6a6442a',
    amount: 2,
    unit: 'tablespoons',
    name: 'mint',
    name_full: 'chopped fresh mint and/or dill', 
    recipe_id: '3958dc9e-712f-4377-d5e9-fec4b6a6442a',
  },
  {
    id: '3978dc9e-737f-4377-85e9-fec4b6a6442a',
    amount: 1,
    unit: 'tablespoons',
    name: 'lemon juice', 
    name_full: null,
    recipe_id: '3958dc9e-712f-4377-d5e9-fec4b6a6442a',
  },
  {
    id: '3978dc9e-737f-4377-85e9-fec4b6a6442a',
    amount: 1,
    unit: 'tablespoons',
    name: 'garlic',
    name: 'medium clove garlic, pressed or minced', 
    recipe_id: '3958dc9e-712f-4377-d5e9-fec4b6a6442a',
  },
  {
    id: '3978dc9e-737f-4377-85e9-fec4b6a6442a',
    amount: 0.5,
    unit: 'teaspoons',
    name: 'fine sea salt',
    name: null, 
    recipe_id: '3958dc9e-712f-4377-d5e9-fec4b6a6442a',
  },

]

const instructions = [
  {
    id: '3978dc9e-7m7f-43k7-85e9-fec4b6a6442a',
    recipe_id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    position: 1,
    context: 'Put a large saucepan of water on to boil.',
  },
  {
    id: '3978dc9e-7m7f-4377-85e9-fe64b6a6442a',
    recipe_id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    position: 2,
    context: 'Finely chop the 100g pancetta, having first removed any rind. Finely grate 50g pecorino cheese and 50g parmesan and mix them together.',
  },
  {
    id: '3978dc9e-7m7f-4377-85e9-f4c4b6a6442a',
    recipe_id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    position: 3,
    context: 'Beat the 3 large eggs in a medium bowl and season with a little freshly grated black pepper. Set everything aside.',
  },
  {
    id: '39k8dc9e-7m7f-4377-85e9-fec4b6a6442a',
    recipe_id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    position: 4,
    context: 'Add 1 tsp salt to the boiling water, add 350g spaghetti and when the water comes back to the boil, cook at a constant simmer, covered, for 10 minutes or until al dente (just cooked).',
  },
  {
    id: '3l78dc9e-7m7f-4377-85e9-fec4b6a6442a',
    recipe_id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    position: 5,
    context: 'Squash 2 peeled plump garlic cloves with the blade of a knife, just to bruise it.',
  },
  {
    id: '3978dc9e-7m7f-4377-87e9-fec4b6a6442a',
    recipe_id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    position: 6,
    context: 'While the spaghetti is cooking, fry the pancetta with the garlic. Drop 50g unsalted butter into a large frying pan or wok and, as soon as the butter has melted, tip in the pancetta and garlic.',
  },
  {
    id: '3978dc9e-7m7f-4377-88e9-fec4b6a6442a',
    recipe_id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    position: 7,
    context: 'Leave to cook on a medium heat for about 5 minutes, stirring often, until the pancetta is golden and crisp. The garlic has now imparted its flavour, so take it out with a slotted spoon and discard.',
  },
  {
    id: '3978dc9e-7m7f-4377-8599-fec4b6a6442a',
    recipe_id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    position: 8,
    context: 'Keep the heat under the pancetta on low. When the pasta is ready, lift it from the water with a pasta fork or tongs and put it in the frying pan with the pancetta. Don’t worry if a little water drops in the pan as well (you want this to happen) and don’t throw the pasta water away yet.',
  },
  {
    id: '3978dc9e-7m7f-4377-85e9-fec476a6442a',
    recipe_id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    position: 9,
    context: 'Mix most of the cheese in with the eggs, keeping a small handful back for sprinkling over later.',
  },
  {
    id: '3978dc9e-7m7f-4377-85e9-fec4b6a6442a',
    recipe_id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    position: 10,
    context: 'Take the pan of spaghetti and pancetta off the heat. Now quickly pour in the eggs and cheese. Using the tongs or a long fork, lift up the spaghetti so it mixes easily with the egg mixture, which thickens but doesn’t scramble, and everything is coated.',
  },
  {
    id: '3978dc9e-7m7f-4377-85e9-fe74b6a6442a',
    recipe_id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    position: 11,
    context: 'Add extra pasta cooking water to keep it saucy (several tablespoons should do it). You don’t want it wet, just moist. Season with a little salt, if needed.',
  },
  {
    id: '3978dc9e-7m7f-4377-85e9-fec9b6a6442a',
    recipe_id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    position: 12,
    context: 'Use a long-pronged fork to twist the pasta on to the serving plate or bowl. Serve immediately with a little sprinkling of the remaining cheese and a grating of black pepper. If the dish does get a little dry before serving, splash in some more hot pasta water and the glossy sauciness will be revived.',
  },
  {
    id: '3948dc9e-7m7f-4377-85e9-fec9b6a6442a',
    recipe_id: '3958dc9e-712f-4377-d5e9-fec4b6a6442a',
    position: 1,
    context: 'Working with one big handful at a time, lightly squeeze the grated cucumber between your palms over the sink to remove excess moisture. Transfer the squeezed cucumber to a serving bowl, and repeat with the remaining cucumber.',
  },
  {
    id: '3948dc9e-7m7f-4377-8be9-fec9b6a6442a',
    recipe_id: '3958dc9e-712f-4377-d5e9-fec4b6a6442a',
    position: 2,
    context: 'Add the yogurt, olive oil, herbs, lemon juice, garlic, and salt to the bowl, and stir to blend. Let the mixture rest for 5 minutes to allow the flavors to meld. Taste and add additional chopped fresh herbs, lemon juice, and/or salt, if necessary (I thought this batch was just right as-is).',
  },
  {
    id: '3948dc9e-7m7f-4377-8569-fec9b6a6442a',
    recipe_id: '3958dc9e-712f-4377-d5e9-fec4b6a6442a',
    position: 3,
    context: 'Serve tzatziki immediately or chill for later. Leftover tzatziki keeps well, chilled, for about 4 days.',
  },
]

module.exports = {
  users,
  recipes,
  ingredients,
  instructions,
};
