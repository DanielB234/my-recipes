import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteRecipe } from '@/app/lib/actions';

export function CreateRecipe() {
  return (
    <Link
      href="/dashboard/recipes/create"
      className="flex h-10 items-center border-2 border-slate-200 rounded-r-lg bg-slate-100 px-4 text-sm font-medium  transition-colors hover:bg-slate-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
    >
      <span className="hidden md:block">Create Recipe</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateRecipe({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/recipes/${id}`}
      className="rounded-md border p-2 hover:bg-slate-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteRecipe({ id }: { id: string }) {
  const deleteRecipeWithId = deleteRecipe.bind(null, id);
  return (
    <form action={deleteRecipeWithId}>
      <button className="rounded-md border p-2 hover:bg-slate-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-4" />
      </button>
    </form>
  );
}
