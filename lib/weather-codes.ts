export interface WeatherCodeInfo {
  label: string;
  icon: string;
}

const SUNNY = "/images/icon-sunny.webp";
const PARTLY_CLOUDY = "/images/icon-partly-cloudy.webp";
const OVERCAST = "/images/icon-overcast.webp";
const FOG = "/images/icon-fog.webp";
const DRIZZLE = "/images/icon-drizzle.webp";
const RAIN = "/images/icon-rain.webp";
const SNOW = "/images/icon-snow.webp";
const STORM = "/images/icon-storm.webp";

/**
 * WMO weather interpretation codes used by Open-Meteo.
 * https://open-meteo.com/en/docs#weathervariables
 */
const WEATHER_CODES: Record<number, WeatherCodeInfo> = {
  0: { label: "Clear sky", icon: SUNNY },
  1: { label: "Mainly clear", icon: PARTLY_CLOUDY },
  2: { label: "Partly cloudy", icon: PARTLY_CLOUDY },
  3: { label: "Overcast", icon: OVERCAST },
  45: { label: "Fog", icon: FOG },
  48: { label: "Depositing rime fog", icon: FOG },
  51: { label: "Light drizzle", icon: DRIZZLE },
  53: { label: "Moderate drizzle", icon: DRIZZLE },
  55: { label: "Dense drizzle", icon: DRIZZLE },
  56: { label: "Light freezing drizzle", icon: DRIZZLE },
  57: { label: "Dense freezing drizzle", icon: DRIZZLE },
  61: { label: "Slight rain", icon: RAIN },
  63: { label: "Moderate rain", icon: RAIN },
  65: { label: "Heavy rain", icon: RAIN },
  66: { label: "Light freezing rain", icon: RAIN },
  67: { label: "Heavy freezing rain", icon: RAIN },
  71: { label: "Slight snowfall", icon: SNOW },
  73: { label: "Moderate snowfall", icon: SNOW },
  75: { label: "Heavy snowfall", icon: SNOW },
  77: { label: "Snow grains", icon: SNOW },
  80: { label: "Slight rain showers", icon: RAIN },
  81: { label: "Moderate rain showers", icon: RAIN },
  82: { label: "Violent rain showers", icon: RAIN },
  85: { label: "Slight snow showers", icon: SNOW },
  86: { label: "Heavy snow showers", icon: SNOW },
  95: { label: "Thunderstorm", icon: STORM },
  96: { label: "Thunderstorm with slight hail", icon: STORM },
  99: { label: "Thunderstorm with heavy hail", icon: STORM },
};

const UNKNOWN: WeatherCodeInfo = { label: "Unknown", icon: OVERCAST };

export function getWeatherInfo(code: number): WeatherCodeInfo {
  return WEATHER_CODES[code] ?? UNKNOWN;
}

export function getWeatherIcon(code: number): string {
  return getWeatherInfo(code).icon;
}
