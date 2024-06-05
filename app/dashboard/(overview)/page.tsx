import ScheduleRecipeTable from '@/app/ui/dashboard/scheduled-recipes';
import ShoppingListTable from '@/app/ui/dashboard/shopping-list';
import SearchURL from '@/app/ui/dashboard/url-bar';
import { ScheduledRecipesSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';

export default async function Page() {
    return (
      <main>
        <h1 className=" mb-4 text-xl md:text-2xl">
          Dashboard
        </h1>
        <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <SearchURL placeholder="Copy Website URL Here..." />

      </div>
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<ScheduledRecipesSkeleton />}>
          <ShoppingListTable/>
        </Suspense>
        <Suspense fallback={<ScheduledRecipesSkeleton />}>
          <ScheduleRecipeTable />
        </Suspense>
      </div>
      </main>
    );
  }