const TodayCardsGroupSkeleton = () => {
  return (
    <section className="grid gap-2 grid-cols-2 sm:grid-cols-4 w-full mt-3 md:col-span-2 md:row-span-1 animate-pulse">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="bg-neutral-800/70 rounded-xl pl-4 pt-4 pb-4 border border-neutral-700/40"
        >
          <div className="h-4 w-20 rounded bg-neutral-700/60" />
          <div className="mt-3 h-8 w-16 rounded bg-neutral-700/50" />
        </div>
      ))}
    </section>
  );
};

export default TodayCardsGroupSkeleton;
