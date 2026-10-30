import Card from "@/components/Card";
import {
  formatHumidity,
  formatPrecipitation,
  formatTemperature,
  formatWind,
  getWeather,
  type Location,
  type Units,
} from "@/lib/weather";

interface TodayCardsProps {
  location: Location;
  units: Units;
}

const TodayCards = async ({ location, units }: TodayCardsProps) => {
  const weather = await getWeather(location, units);
  const { current } = weather;

  return (
    <section className="grid gap-2 grid-cols-2 sm:grid-cols-4 w-full mt-3 md:col-span-2 md:row-span-1">
      <Card
        title="Feels Like"
        value={formatTemperature(current.apparentTemperature)}
      />
      <Card title="Humidity" value={formatHumidity(current.humidity)} />
      <Card title="Wind" value={formatWind(current.windSpeed, units.windSpeed)} />
      <Card
        title="Precipitation"
        value={formatPrecipitation(
          current.precipitation,
          units.precipitation,
        )}
      />
    </section>
  );
};

export default TodayCards;
