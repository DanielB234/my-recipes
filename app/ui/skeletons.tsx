const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export default function DashboardSkeleton() {
  return (
    <>

    </>
  );
}

export function RecipesGridSkeleton() {
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-slate-50 p-2 md:pt-0">
          <div className="grid gap-6 h-[400px] sm:grid-cols-2 lg:grid-cols-3">
            <GridElementSection />
            <GridElementSection />
            <GridElementSection />
          </div>
        </div>
      </div>
    </div>
  )
}

export function GridElementSection() {
  return (
    <div
      className={`${shimmer} relative overflow-hidden rounded-xl bg-slate-100 p-2 shadow-sm`}
    >
      <div className="flex p-1 h-1/2">
        <div className=" w-full rounded-md bg-slate-200 text-sm font-medium" />
      </div>

      <div className="flex items-center justify-center truncate rounded-xl bg-white px-4 py-8">
        <div className="h-7 w-20 rounded-md bg-slate-200" />
      </div>
      <div className="flex items-left justify-left truncate rounded-xl bg-slate-100 px-4 py-1">
        <div className="h-7 w-20 rounded-md bg-slate-200" />
      </div>
    </div>
  )
}

export function RecipeSummarySkeleton() {
  return (
    <div className={`${shimmer} relative w-full overflow-hidden md:col-span-3`}>
      <div className="grid grid-cols-3 h-[320px] rounded-xl bg-slate-100 p-4">
        <div className="flex w-full flex-col overflow-hidden md:col-span-1 " />
        <div className="mt-0 grid col-span-2 items-end gap-2 rounded-md bg-white p-4 sm:grid-cols-13 md:gap-4" >
          <div className="flex items-center pb-2 pt-6">
          </div>
        </div>
      </div>
    </div>
  );
}

export function IngredientsSkeleton() {
  return (
    // <div className="flex w-full grid grid-rows-1 gap-6 h-min"></div>
    <div className={`${shimmer} relative flex w-full flex-col overflow-hidden md:col-span-1`}
    >
      <div className="mb-4 h-8 w-36 rounded-md " >Ingredients:</div>
      <div className="flex grow h-50 flex-col justify-between rounded-xl bg-slate-100 p-4">
        <div className="flex items-center h-10" />
        <div className="bg-white h-[410px] px-6">
          <div className="flex items-center pb-2 pt-6">
            <div className="h-5 w-5 rounded-full bg-slate-200" />
            <div className="ml-2 h-4 w-full rounded-md bg-slate-200" />
          </div>
          <div className="flex items-center pb-2 pt-6">
            <div className="h-5 w-5 rounded-full bg-slate-200" />
            <div className="ml-2 h-4 w-full rounded-md bg-slate-200" />
          </div>
          <div className="flex items-center pb-2 pt-6">
            <div className="h-5 w-5 rounded-full bg-slate-200" />
            <div className="ml-2 h-4 w-full rounded-md bg-slate-200" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function InstructionsSkeleton() {
  return (
    <div className={`${shimmer} relative w-full overflow-hidden md:col-span-2`}>
      <div className="mb-4 h-8 w-36 rounded-md">Instructions:</div>
      <div className="flex grow h-50 flex-col justify-between rounded-xl bg-slate-100 p-4">
        <div className="flex items-center h-10" />
        <div className="bg-white h-[410px] px-6">
          <div className="flex items-center pb-2 pt-6">
            <div className="h-5 w-5 rounded-full bg-slate-200" />
            <div className="ml-2 h-4 w-full rounded-md bg-slate-200" />
          </div>
          <div className="flex items-center pb-2 pt-6">
            <div className="h-5 w-5 rounded-full bg-slate-200" />
            <div className="ml-2 h-4 w-full rounded-md bg-slate-200" />
          </div>
          <div className="flex items-center pb-2 pt-6">
            <div className="h-5 w-5 rounded-full bg-slate-200" />
            <div className="ml-2 h-4 w-full rounded-md bg-slate-200" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function InvoiceSkeleton() {
  return (
    <div className="flex flex-row items-center justify-between border-b border-slate-100 py-4">
      <div className="flex items-center">
        <div className="mr-2 h-8 w-8 rounded-full bg-slate-200" />
        <div className="min-w-0">
          <div className="h-5 w-40 rounded-md bg-slate-200" />
          <div className="mt-2 h-4 w-12 rounded-md bg-slate-200" />
        </div>
      </div>
      <div className="mt-2 h-4 w-12 rounded-md bg-slate-200" />
    </div>
  );
}

export function ButtonsSkeleton() {
  return (
    <div></div>
  )
}

export function ScheduledRecipesSkeleton() {
  return (
    <div
      className={`${shimmer} relative flex w-full flex-col overflow-hidden md:col-span-4`}
    >
      <div className="mb-4 h-8 w-36 rounded-md bg-slate-100" />
      <div className="flex grow flex-col justify-between rounded-xl bg-slate-100 p-4">
        <div className="bg-white px-6">
          <InvoiceSkeleton />
          <InvoiceSkeleton />
          <InvoiceSkeleton />
          <InvoiceSkeleton />
          <InvoiceSkeleton />
          <div className="flex items-center pb-2 pt-6">
            <div className="h-5 w-5 rounded-full bg-slate-200" />
            <div className="ml-2 h-4 w-20 rounded-md bg-slate-200" />
          </div>
        </div>
      </div>
    </div>
  );
}