'use client';

import { getNewRecipe } from '@/app/lib/api';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { SetStateAction, useState } from 'react';

export default function SearchURL({ placeholder }: { placeholder: string }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setSearchTerm(event.target.value);
  }

  
  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    getNewRecipe(searchTerm);
  }
  return (
    <form onSubmit={handleSubmit}  className="w-full mt-4 flex items-center justify-between gap-2 md:mt-8">
        <div className="relative flex flex-1 flex-shrink-0">
        <label htmlFor="search" className="sr-only">
            Search
        </label>
        <input
            className="peer block w-full rounded-l-lg hover:bg-slate-100 border-2 border-slate-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-slate-500"
            placeholder={placeholder}
            onChange={handleChange}
            value={searchTerm}
        />
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-slate-500 peer-focus:text-slate-900" />
        </div>
        <input className="flex h-10 items-center  px-4 text-sm font-medium border-2 border-slate-200 rounded-r-lg text-black transition-colors hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-200" type="submit" value="Get Website Data"></input>
    </form>
  );
}
