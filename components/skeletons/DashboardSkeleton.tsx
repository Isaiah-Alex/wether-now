import Hero from "@/components/Hero";
import ForcastCardSkeleton from "@/components/skeletons/ForcastCardSkeleton";
import HourForcastSkeleton from "@/components/skeletons/HourForcastSkeleton";
import TodayCardsGroupSkeleton from "@/components/skeletons/TodayCardsGroupSkeleton";
import TodaySkeleton from "@/components/skeletons/TodaySkeleton";

/**
 * Full-page loading state that mirrors the real dashboard layout, so the
 * transition from skeleton to content does not shift anything around.
 */
const DashboardSkeleton = () => {
  return (
    <div role="status" aria-live="polite">
      <span className="sr-only">Loading weather…</span>

      <div aria-hidden="true">
        <Hero />

        <div className="w-full max-w-[580px] mx-auto mt-8 min-[375px]:grid min-[375px]:items-center grid-cols-4 gap-2">
          <div className="col-span-3 h-[58px] rounded-md bg-neutral-800/70 animate-pulse" />
          <div className="m-2 h-10 rounded-md bg-blue-500/40 animate-pulse" />
        </div>

        <div className="md:grid md:grid-rows-5 gap-4 grid-cols-3 md:grid-flow-row-dense md:mt-4">
          <div className="md:col-span-2 md:row-span-2">
            <TodaySkeleton />
          </div>

          <TodayCardsGroupSkeleton />

          <section className="md:col-span-2 md:row-span-2">
            <h4 className="mt-4 md:mt-0">Daily forecast</h4>
            <ForcastCardSkeleton />
          </section>

          <HourForcastSkeleton />
        </div>
      </div>
    </div>
  );
};

export default DashboardSkeleton;
