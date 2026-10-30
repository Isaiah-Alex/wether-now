"use client";

import { useMemo, useState } from "react";
import Dropdown from "@/components/Dropdown";
import HourForcastCard from "@/components/HourForcastCard";
import { formatHour, formatWeekday } from "@/lib/format";
import type { HourlyWeather } from "@/lib/weather";
import { getWeatherInfo } from "@/lib/weather-codes";

interface HourlyForecastPanelProps {
  hourly: HourlyWeather[];
  currentTime: string;
  dates: string[];
}

const HourlyForecastPanel = ({
  hourly,
  currentTime,
  dates,
}: HourlyForecastPanelProps) => {
  const today = dates[0] ?? "";
  const [selectedDate, setSelectedDate] = useState(today);
  const activeDate = dates.includes(selectedDate) ? selectedDate : today;

  const options = dates.map((date, index) => ({
    value: date,
    label: index === 0 ? "Today" : formatWeekday(date),
  }));

  const rows = useMemo(() => {
    const dayRows = hourly.filter((hour) => hour.time.startsWith(activeDate));

    if (activeDate !== today) {
      return dayRows;
    }

    // "Today" only shows the hours that are still ahead.
    const currentHour = currentTime.slice(0, 13);
    return dayRows.filter((hour) => hour.time.slice(0, 13) >= currentHour);
  }, [hourly, activeDate, today, currentTime]);

  return (
    <>
      <div className="flex justify-between mt-2 md:max-h-10 mx-3 items-center md:mt-6">
        <h4>Hourly forecast</h4>
        <Dropdown
          options={options}
          value={activeDate}
          onChange={setSelectedDate}
        />
      </div>

      <div className="flex flex-col gap-2.5 justify-between mx-3 items-center mb-3 md:gap-4 overflow-y-auto overscroll-contain scrollbar-none min-h-0 max-h-[480px] md:max-h-[540px]">
        {rows.length === 0 ? (
          <p className="py-6 text-sm opacity-70">
            No hourly data available for this day.
          </p>
        ) : (
          rows.map((hour) => {
            const { icon } = getWeatherInfo(hour.weatherCode);

            return (
              <HourForcastCard
                key={hour.time}
                imagePath={icon}
                time={formatHour(hour.time)}
                temperature={hour.temperature}
              />
            );
          })
        )}
      </div>
    </>
  );
};

export default HourlyForecastPanel;
