import Ingredients from '@/app/ui/recipes/recipe-display/ingredients';
import Instructions from '@/app/ui/recipes/recipe-display/instructions';
import RecipeSummary from '@/app/ui/recipes/recipe-display/summary';
import { ButtonsSkeleton, IngredientsSkeleton, InstructionsSkeleton, RecipeSummarySkeleton} from '@/app/ui/skeletons';
import Breadcrumbs from '@/app/ui/recipes/breadcrumbs';
import { Suspense } from 'react';
import { ScheduleRecipe, DeleteRecipe ,ExportRecipe } from '@/app/ui/recipes/recipe-display/buttons';
import { fetchIngredientNamesByID, fetchInstructionNamesByID, fetchRecipeById } from '@/app/lib/data';
import { notFound } from 'next/navigation';


export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id
    const [recipe, instructionNames, ingredientNames] = await Promise.all([fetchRecipeById(id),fetchInstructionNamesByID(id),fetchIngredientNamesByID(id)]);
    if (!recipe) {
      notFound();
    } 
    console.log("revalidatepath")
    return (
      <main>
        <div className='flex justify-between'>
        <Breadcrumbs
        breadcrumbs={[
          { label: 'Recipes', href: '/dashboard/recipes' },
          {
            label: recipe.name,
            href: `/dashboard/recipes/${id}/`,
            active: true,
          },
        ]}
      />
      <div className='flex justify-right'>
      <Suspense fallback={<ButtonsSkeleton/>}>
      <ExportRecipe id={id} />
      <ScheduleRecipe id={id} recipe={recipe} />
      <DeleteRecipe id={id} />
      </Suspense>
      </div>
      </div>
        <div className="mt-6 grid grid-rows-1 gap-6 flex w-full">
            <Suspense fallback={<RecipeSummarySkeleton />}>
            <RecipeSummary recipe={recipe}/>
            </Suspense>
        <div className='mt-6 grid grid-cols-3 gap-6'>
            <Suspense fallback={<IngredientsSkeleton />}>
            <Ingredients names={ingredientNames} modifier = {recipe.modifier} recipe_id={recipe.id} />
            </Suspense>
          
            <Suspense fallback={<InstructionsSkeleton />}>
            <Instructions names={instructionNames} recipe_id={recipe.id}/>
            </Suspense>
        </div>
        </div>
      </main>
    )
}
