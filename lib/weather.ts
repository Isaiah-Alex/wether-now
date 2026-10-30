export type TemperatureUnit = "celsius" | "fahrenheit";
export type WindSpeedUnit = "kmh" | "mph";
export type PrecipitationUnit = "mm" | "inch";

export interface Units {
  temperature: TemperatureUnit;
  windSpeed: WindSpeedUnit;
  precipitation: PrecipitationUnit;
}

export interface Location {
  name: string;
  country: string;
  admin1?: string;
  latitude: number;
  longitude: number;
}

export interface CurrentWeather {
  time: string;
  temperature: number;
  apparentTemperature: number;
  humidity: number;
  precipitation: number;
  weatherCode: number;
  windSpeed: number;
  isDay: boolean;
}

export interface HourlyWeather {
  time: string;
  temperature: number;
  weatherCode: number;
  precipitationProbability: number;
}

export interface DailyWeather {
  date: string;
  weatherCode: number;
  temperatureMax: number;
  temperatureMin: number;
  precipitationProbabilityMax: number;
}

export interface WeatherData {
  location: Location;
  timezone: string;
  units: Units;
  current: CurrentWeather;
  hourly: HourlyWeather[];
  daily: DailyWeather[];
}

interface OpenMeteoResponse {
  latitude: number;
  longitude: number;
  timezone: string;
  current: {
    time: string;
    temperature_2m: number;
    apparent_temperature: number;
    relative_humidity_2m: number;
    precipitation: number;
    weather_code: number;
    wind_speed_10m: number;
    is_day: number;
  };
  hourly: {
    time: string[];
    temperature_2m: number[];
    weather_code: number[];
    precipitation_probability: number[];
  };
  daily: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_probability_max: number[];
  };
}

const FORECAST_URL = "https://api.open-meteo.com/v1/forecast";

/**
 * Fetch current, hourly and daily weather from Open-Meteo.
 *
 * Every section of the dashboard calls this with the same arguments, so Next.js
 * request memoisation collapses them into a single network call per render.
 */
export async function getWeather(
  location: Location,
  units: Units,
): Promise<WeatherData> {
  const searchParams = new URLSearchParams({
    latitude: String(location.latitude),
    longitude: String(location.longitude),
    current:
      "temperature_2m,apparent_temperature,relative_humidity_2m,precipitation,weather_code,wind_speed_10m,is_day",
    hourly: "temperature_2m,weather_code,precipitation_probability",
    daily:
      "weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max",
    timezone: "auto",
    forecast_days: "7",
    temperature_unit: units.temperature,
    wind_speed_unit: units.windSpeed,
    precipitation_unit: units.precipitation,
  });

  const response = await fetch(`${FORECAST_URL}?${searchParams.toString()}`, {
    next: { revalidate: 600 },
  });

  if (!response.ok) {
    throw new Error(
      `Weather service responded with ${response.status} ${response.statusText}`,
    );
  }

  const data = (await response.json()) as OpenMeteoResponse;

  if (!data.current || !data.hourly || !data.daily) {
    throw new Error("Weather service returned an incomplete response");
  }

  return {
    location: {
      ...location,
      latitude: data.latitude,
      longitude: data.longitude,
    },
    timezone: data.timezone,
    units,
    current: {
      time: data.current.time,
      temperature: data.current.temperature_2m,
      apparentTemperature: data.current.apparent_temperature,
      humidity: data.current.relative_humidity_2m,
      precipitation: data.current.precipitation,
      weatherCode: data.current.weather_code,
      windSpeed: data.current.wind_speed_10m,
      isDay: data.current.is_day === 1,
    },
    hourly: data.hourly.time.map((time, index) => ({
      time,
      temperature: data.hourly.temperature_2m[index],
      weatherCode: data.hourly.weather_code[index],
      precipitationProbability: data.hourly.precipitation_probability[index],
    })),
    daily: data.daily.time.map((date, index) => ({
      date,
      weatherCode: data.daily.weather_code[index],
      temperatureMax: data.daily.temperature_2m_max[index],
      temperatureMin: data.daily.temperature_2m_min[index],
      precipitationProbabilityMax:
        data.daily.precipitation_probability_max[index],
    })),
  };
}

export function formatTemperature(value: number): string {
  return `${Math.round(value)}°`;
}

export function formatHumidity(value: number): string {
  return `${Math.round(value)}%`;
}

export function formatWind(value: number, unit: WindSpeedUnit): string {
  return `${Math.round(value)} ${unit === "mph" ? "mph" : "km/h"}`;
}

export function formatPrecipitation(
  value: number,
  unit: PrecipitationUnit,
): string {
  return unit === "inch" ? `${value.toFixed(2)} in` : `${value.toFixed(1)} mm`;
}
