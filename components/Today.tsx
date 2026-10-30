import Image from "next/image";
import { formatLongDate } from "@/lib/format";
import {
  formatTemperature,
  getWeather,
  type Location,
  type Units,
} from "@/lib/weather";
import { getWeatherIcon } from "@/lib/weather-codes";

interface TodayProps {
  location: Location;
  units: Units;
}

const Today = async ({ location, units }: TodayProps) => {
  const weather = await getWeather(location, units);
  const { current } = weather;

  return (
    <section className="relative w-full sm:max-w-[800px] sm:mx-auto h-[280px] mt-4 md:mt-0 max-[374px]:bg-[url('/images/bg-today-small.svg')] min-[375px]:bg-[url('/images/bg-today-large.svg')] bg-center bg-no-repeat bg-cover rounded-2xl">
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4 sm:flex-row sm:justify-between sm:px-20">
        <div className="text-center space-y-1.5">
          <h2 className="text-2xl font-semibold">
            {location.name}, {location.country}
          </h2>
          <p className="text-sm opacity-80">{formatLongDate(current.time)}</p>
        </div>
        <div className="flex items-center gap-6 sm:gap-2 mt-8 sm:mt-0">
          <Image
            src={getWeatherIcon(current.weatherCode)}
            height={80}
            width={80}
            alt="Current weather"
          />
          <h1 className="text-7xl font-bold">
            <em>{formatTemperature(current.temperature)}</em>
          </h1>
        </div>
      </div>
    </section>
  );
};

export default Today;
