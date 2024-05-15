import Image from 'next/image';
import { UpdateRecipe, DeleteRecipe } from '@/app/ui/recipes/buttons';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { fetchFilteredRecipes } from '@/app/lib/data';

export default async function RecipesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const recipes = await fetchFilteredRecipes(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          </div>
        </div>
      </div>
    </div>
  );
}
