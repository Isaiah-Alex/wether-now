import Image from "next/image";
import { getWeatherInfo } from "@/lib/weather-codes";

interface ForcastTypes {
  day: string;
  weatherCode: number;
  tempMax: string;
  tempMin: string;
}

const ForcastCard = ({ day, weatherCode, tempMax, tempMin }: ForcastTypes) => {
  const { icon, label } = getWeatherInfo(weatherCode);

  return (
    <div className="flex flex-col justify-center items-center bg-neutral-800/70 gap-4 rounded-xl py-4 border border-neutral-700/40 w-full sm:px-2">
      <p className="text-sm">{day}</p>
      <Image src={icon} width={70} height={70} alt={label} />
      <div className="flex justify-center gap-x-12 sm:justify-between sm:gap-x-0 w-full">
        <p className="text-sm font-bold">{tempMax}°</p>
        <p className="text-sm opacity-70">{tempMin}°</p>
      </div>
    </div>
  );
};

export default ForcastCard;
