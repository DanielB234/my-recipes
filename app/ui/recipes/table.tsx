import Image from 'next/image';
import { fetchFilteredRecipes } from '@/app/lib/data';
import Link from 'next/link';

export default async function RecipesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {

  const recipes = await fetchFilteredRecipes(query, currentPage);
  return (
    <div className="mt-6 flow-root min-h-1000">
      <div className="inline-block min-w-full align-middle ">
        <div className="rounded-lg bg-slate-50 p-2 md:pt-0">
          <div className="md:hidden">
          </div>
          <div className="grid gap-6 min-h-1000 sm:grid-cols-2 lg:grid-cols-3 ">
            {recipes?.map((recipe) => (
              <Link key={recipe.id} href={`/dashboard/recipes/${recipe.id}`} className="rounded-x1 border-2 border-slate-200 hover:bg-slate-200 bg-slate-50 p-2 shadow-sm rounded-lg min-h-[415px]">
                <div className='h-1/2 w-full rounded-lg relative '>
                  <Image
                    src={`${recipe.image_url}`}
                    sizes='200'
                    // layout='fill'
                    // objectFit='contain'
                    width={350}
                    height={350}
                    className='rounded-lg'
                    alt={`${recipe.name}'s profile picture`}
                  /></div>
                <p
                  className={`
                     rounded-xl border-b py- text-2xl`}
                >{recipe.name}</p>
                <p
                  className="rounded-xl "
                >Prep: {recipe.preparation_time}</p>
                <p
                  className={`
                     rounded-xl  `}
                >Cook: {recipe.cook_time}</p>
                <p
                  className={`
                     rounded-xl  `}
                >{recipe.serving}: {recipe.serving_amount} {recipe.serving_units}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
