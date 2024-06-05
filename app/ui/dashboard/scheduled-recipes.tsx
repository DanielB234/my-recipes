
import { fetchScheduledRecipes } from '@/app/lib/data';
import { DeleteTables } from './buttons';
import clsx from 'clsx';
import Link from 'next/link';

export default async function ScheduleRecipeTable() {
    const scheduledRecipes = await fetchScheduledRecipes();
    const schedule = "schedule"
    return (
      <div className="flex w-full flex-col md:col-span-4">
        <div className='flex justify-between'>
        <h2 className={` mb-4 text-xl md:text-2xl`}>
          Scheduled Recipes
        </h2>
        <div className='flex'>
          <DeleteTables tabletype="schedule"/>
        </div>
        </div>
        <div className="flex  flex-col justify-between border-slate-200 border-2 rounded-r-lg">
          {<div className="bg-white">
            {scheduledRecipes.map((scheduleRecipe, i) => {
              return (
                <Link href={`/dashboard/recipes/${scheduleRecipe.id}`}
                  key={scheduleRecipe.id}
                  className={clsx(
                    'flex flex-row items-center px-6 cursor-pointer hover:bg-slate-100 justify-between py-4',
                    {
                      'border-t': i !== 0,
                    },
                  )}
                >
                  <div className="flex w-[60%] items-center">
              
                    <div className="min-w-0">
                      <p className="">
                        {scheduleRecipe.name}
                      </p>
                    </div>
                  </div>
                  <p
                    className={`text-sm italic `}
                  >
                    {scheduleRecipe.serving} : {scheduleRecipe.serving_amount} {scheduleRecipe.serving_units}
                  </p>
                </Link>
              );
            })}
          </div>}

        </div>
      </div>
    );
  }