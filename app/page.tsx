import { Suspense } from "react";

import DailyForecast from "@/components/DailyForecast";
import Hero from "@/components/Hero";
import HourlyForecast from "@/components/HourlyForecast";
import SearchInput from "@/components/SearchInput";
import Today from "@/components/Today";
import TodayCards from "@/components/TodayCards";
import ForcastCardSkeleton from "@/components/skeletons/ForcastCardSkeleton";
import HourForcastSkeleton from "@/components/skeletons/HourForcastSkeleton";
import TodayCardsGroupSkeleton from "@/components/skeletons/TodayCardsGroupSkeleton";
import TodaySkeleton from "@/components/skeletons/TodaySkeleton";
import { parseWeatherParams } from "@/lib/search-params";

interface HomeProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

const Home = async ({ searchParams }: HomeProps) => {
  const { location, units } = parseWeatherParams(await searchParams);

  return (
    <div>
      <Hero />

      <Suspense fallback={<div className="h-[76px] mt-8" />}>
        <SearchInput />
      </Suspense>

      <div className="md:grid md:grid-rows-5 gap-4 grid-cols-3 md:grid-flow-row-dense md:mt-4">
        <div className="md:col-span-2 md:row-span-2">
          <Suspense fallback={<TodaySkeleton />}>
            <Today location={location} units={units} />
          </Suspense>
        </div>

        <Suspense fallback={<TodayCardsGroupSkeleton />}>
          <TodayCards location={location} units={units} />
        </Suspense>

        <section className="md:col-span-2 md:row-span-2">
          <h4 className="mt-4 md:mt-0">Daily forecast</h4>
          <Suspense fallback={<ForcastCardSkeleton />}>
            <DailyForecast location={location} units={units} />
          </Suspense>
        </section>

        <Suspense fallback={<HourForcastSkeleton />}>
          <HourlyForecast location={location} units={units} />
        </Suspense>
      </div>

      <footer>
        <p className="text-sm text-neutral-50/30 text-center mb-3">
          Created by <strong>Isaiah Alex</strong> · Weather data by{" "}
          <a
            href="https://open-meteo.com"
            target="_blank"
            rel="noreferrer"
            className="underline hover:text-neutral-50/60"
          >
            Open-Meteo.com
          </a>
        </p>
      </footer>
    </div>
  );
};

export default Home;
