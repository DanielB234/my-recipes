'use client'

import { createNewRecipe } from '@/app/lib/actions';
import { CheckIcon } from "@heroicons/react/24/solid";
import 'react-image-crop/dist/ReactCrop.css'

export default function CreateNewRecipe() {
  const createRecipe = createNewRecipe.bind(null);

  const onHandleSubmit = (e: any) => {
    e.preventDefault();
      createRecipe(new FormData(e.target))
  }

  return (
    <form onSubmit={onHandleSubmit} className="grid w-full grid-cols-3 gap-6">
          <div className="flex min-w-0 px-4 col-span-2  border-slate-200 border-2 rounded-r-lg px-5 py-3
           justify-between">
            <div className="w-full">
            <div className=" flex w-full justify-between relative mt-2 rounder-md">
                <p className="hidden  w-[25%] text-sm text-slate-500 sm:block py-1 md:text-xl">
                  Recipe Name:
                </p>
              <input
                id="name"
                name="name"
                type="string"
                className=" hidden text-sm w-[75%] px-1 hover:bg-slate-100 rounded-lg border-slate-200 border-2 text-slate-500 sm:block md:text-3xl">
              </input>
              </div>
              <div className="flex w-full">
              <div className=" flex w-[50%] justify-between relative mt-2 rounder-md">
                <p className="hidden  w-[50%] text-sm text-slate-500 sm:block py-1 md:text-xl">
                  Prep Time:
                </p>
                <input
                  id="preparation_time"
                  name="preparation_time"
                  type="string"
                  className="hidden w-[50%] text-sm rounded-lg px-1 hover:bg-slate-100 border-slate-200 border-2 text-slate-500 sm:block md:text-xl">
                </input>
              </div>
              <div className="flex w-[50%] pl-2 justify-between relative mt-2 rounder-md">
                <p className="hidden w-[50%] text-sm text-slate-500 sm:block py-1 md:text-xl">
                  Cook Time:
                </p>
                <input
                  id="cook_time"
                  name="cook_time"
                  type="string"
                  className="hidden w-[50%] text-sm rounded-lg px-3 hover:bg-slate-100 border-slate-200 border-2 text-slate-500 sm:block md:text-xl">
                </input>
              </div>
              </div>
              <div className="flex w-[50%] justify-between relative mt-2 rounder-md">
                <p className="hidden text-sm text-slate-500 sm:block py-1 md:text-xl">
                  Serves:
                </p>
                <input
                  id="serving_amount"
                  name="serving_amount"
                  type="number"
                  step="0.01"
                  defaultValue={1}
                  className="hidden w-[50%] text-sm rounded-lg px-1 w-15 hover:bg-slate-100 border-slate-200 border-2 text-slate-500 sm:block md:text-xl" />
              </div>
              

            </div>
            <div className="flex justify between">
              <button type="submit" className="flex h-10  items-center rounded-lg px-4 text-sm font-medium text-white transition-colors hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-200">
                <span className=" sr-only">Save</span>
                <CheckIcon className=" w-8 text-black" />
              </button>
            </div>
          </div>
    </form>
  )

}
