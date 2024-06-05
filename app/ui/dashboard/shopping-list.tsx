
import { fetchShoppingList } from '@/app/lib/data';
import { ScheduleRecipe } from '@/app/ui/recipes/recipe-display/buttons';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Link from 'next/link';
import { DeleteTables, ExportShoppingList } from './buttons';

export default async function ShoppingListTable() {
    const shoppingList = await fetchShoppingList();
    return (
      <div className="flex w-full flex-col md:col-span-4">
        <div className='flex justify-between'>
        <h2 className={` mb-4 text-xl md:text-2xl`}>
          Shopping List
        </h2>
        <div className='flex'>
          <ExportShoppingList/>
          <DeleteTables tabletype="shopping"/>
        </div>
        </div>
        <div className="flex flex-col justify-between border-slate-200 border-2 rounded-l-lg">
          {<div className="bg-white ">
            {shoppingList.map((shoppingListItem, i) => {
              return (
                <Link href={`/dashboard/recipes/${shoppingListItem.recipe_id}`}
                  key={shoppingListItem.id}
                  className={clsx(
                    'flex flex-row items-center px-6 cursor-pointer hover:bg-slate-100 justify-between py-4',
                    {
                      'border-t': i !== 0,
                    },
                  )}
                >
                  <div className="flex items-center w-[60%]">
              
                    <div className="min-w-0">
                      <p className="flex resize-none fit-content w-full capitalize  justify-between">
                        {shoppingListItem.ingredient_name}
                      </p>
                    </div>
                  </div>
                  <p
                    className={` italic `}
                  >
                    {shoppingListItem.recipe_name}
                  </p>
                </Link>
              );
            })}
          </div>}

        </div>
      </div>
    );
  }
