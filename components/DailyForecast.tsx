import ForcastCard from "@/components/ForcastCard";
import { formatWeekday } from "@/lib/format";
import { getWeather, type Location, type Units } from "@/lib/weather";

interface DailyForecastProps {
  location: Location;
  units: Units;
}

const DailyForecast = async ({ location, units }: DailyForecastProps) => {
  const weather = await getWeather(location, units);

  return (
    <section className="grid grid-cols-3 sm:grid-cols-7 w-full mt-1.5 gap-2 items-end">
      {weather.daily.map((day) => (
        <ForcastCard
          key={day.date}
          day={formatWeekday(day.date)}
          weatherCode={day.weatherCode}
          tempMax={String(Math.round(day.temperatureMax))}
          tempMin={String(Math.round(day.temperatureMin))}
        />
      ))}
    </section>
  );
};

export default DailyForecast;
