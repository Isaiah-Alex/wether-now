const TodaySkeleton = () => {
  return (
    <section className="relative w-full sm:max-w-[800px] sm:mx-auto h-[280px] mt-4 md:mt-0 max-[374px]:bg-[url('/images/bg-today-small.svg')] min-[375px]:bg-[url('/images/bg-today-large.svg')] bg-center bg-no-repeat bg-cover rounded-2xl animate-pulse">
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4 sm:flex-row sm:justify-between sm:px-20">
        <div className="text-center space-y-1.5">
          <div className="mx-auto h-8 w-56 max-w-full rounded-md bg-white/20" />
          <div className="mx-auto h-4 w-40 max-w-full rounded bg-white/10" />
        </div>
        <div className="flex items-center gap-6 sm:gap-2 mt-8 sm:mt-0">
          <div className="h-20 w-20 rounded-full bg-white/15" />
          <div className="h-16 w-32 rounded-lg bg-white/20" />
        </div>
      </div>
    </section>
  );
};

export default TodaySkeleton;
