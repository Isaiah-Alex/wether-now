const ForcastCardSkeleton = () => {
  return (
    <section className="grid grid-cols-3 sm:grid-cols-7 w-full mt-1.5 gap-2 items-end animate-pulse">
      {Array.from({ length: 7 }).map((_, index) => (
        <div
          key={index}
          className="flex flex-col justify-center items-center bg-neutral-800/70 gap-4 rounded-xl py-4 border border-neutral-700/40 w-full sm:px-2 h-[175px]"
        >
          <div className="h-3.5 w-8 rounded bg-neutral-700/60" />
          <div className="h-[70px] w-[70px] rounded-full bg-neutral-700/50" />
          <div className="flex justify-center gap-x-12 sm:justify-between sm:gap-x-0 w-full">
            <div className="h-3.5 w-6 rounded bg-neutral-700/60" />
            <div className="h-3.5 w-6 rounded bg-neutral-700/40" />
          </div>
        </div>
      ))}
    </section>
  );
};

export default ForcastCardSkeleton;
