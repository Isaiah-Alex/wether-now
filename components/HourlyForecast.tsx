import HourlyForecastPanel from "@/components/HourlyForecastPanel";
import { getWeather, type Location, type Units } from "@/lib/weather";

interface HourlyForecastProps {
  location: Location;
  units: Units;
}

const HourlyForecast = async ({ location, units }: HourlyForecastProps) => {
  const weather = await getWeather(location, units);

  return (
    <section className="flex flex-col gap-3 md:gap-8 mx-auto bg-neutral-800/70 rounded-xl border border-neutral-700/40 w-full row-span-5 mt-4 md:mt-0 md:max-h-[645px] mb-6">
      <HourlyForecastPanel
        hourly={weather.hourly}
        currentTime={weather.current.time}
        dates={weather.daily.map((day) => day.date)}
      />
    </section>
  );
};

export default HourlyForecast;
