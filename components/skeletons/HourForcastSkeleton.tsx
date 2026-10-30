const HourForcastSkeleton = () => {
  return (
    <section className="flex flex-col gap-3 md:gap-8 mx-auto bg-neutral-800/70 rounded-xl border border-neutral-700/40 w-full row-span-5 mt-4 md:mt-0 md:max-h-[645px] mb-6 animate-pulse">
      <div className="flex justify-between mt-2 md:max-h-10 mx-3 items-center md:mt-6">
        <h4>Hourly forecast</h4>
        <div className="h-[34px] w-24 rounded-md bg-neutral-700/60" />
      </div>
      <div className="flex flex-col gap-2.5 mx-3 items-center mb-3 md:gap-4 overflow-hidden">
        {Array.from({ length: 7 }).map((_, index) => (
          <div
            key={index}
            className="flex justify-between items-center border border-neutral-50/5 rounded-md py-2 px-4 w-full bg-neutral-50/10"
          >
            <div className="flex gap-2 items-center">
              <div className="h-[30px] w-[30px] rounded-full bg-neutral-700/60" />
              <div className="h-4 w-14 rounded bg-neutral-700/60" />
            </div>
            <div className="h-4 w-8 rounded bg-neutral-700/60" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default HourForcastSkeleton;
