import { RecipeSummarySkeleton} from '@/app/ui/skeletons';
import Breadcrumbs from '@/app/ui/recipes/breadcrumbs';
import { Suspense } from 'react';
import CreateNewRecipe from '@/app/ui/recipes/create-recipe';


export default async function Page() {

    return (
      <main>
        <div className='flex justify-between'>
        <Breadcrumbs
        breadcrumbs={[
          { label: 'Recipes', href: '/dashboard/recipes' },
          {
            label: 'New Recipe',
            href: `/dashboard/recipes/create`,
            active: true,
          },
        ]}
      />
      <div className='flex justify-right'>
      </div>
      </div>
        <div className="mt-6 grid grid-rows-1 gap-6 flex w-full">
            <Suspense fallback={<RecipeSummarySkeleton />}>
            <CreateNewRecipe />
            </Suspense>
        </div>
      </main>
    )
}


