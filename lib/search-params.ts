import type {
  Location,
  PrecipitationUnit,
  TemperatureUnit,
  Units,
  WindSpeedUnit,
} from "@/lib/weather";

export const DEFAULT_LOCATION: Location = {
  name: "Benin City",
  country: "Nigeria",
  admin1: "Edo",
  latitude: 6.335,
  longitude: 5.604,
};

export const DEFAULT_UNITS: Units = {
  temperature: "celsius",
  windSpeed: "kmh",
  precipitation: "mm",
};

export const IMPERIAL_UNITS: Units = {
  temperature: "fahrenheit",
  windSpeed: "mph",
  precipitation: "inch",
};

type ParamSource =
  | Record<string, string | string[] | undefined>
  | { get(key: string): string | null };

function readParam(source: ParamSource, key: string): string | undefined {
  if (typeof (source as { get?: unknown }).get === "function") {
    return (
      (source as { get(key: string): string | null }).get(key) ?? undefined
    );
  }

  const value = (source as Record<string, string | string[] | undefined>)[key];
  return Array.isArray(value) ? value[0] : value;
}

export function parseWeatherParams(source: ParamSource): {
  location: Location;
  units: Units;
} {
  const latitude = Number(readParam(source, "lat"));
  const longitude = Number(readParam(source, "lon"));
  const hasCoordinates =
    Number.isFinite(latitude) &&
    Number.isFinite(longitude) &&
    Math.abs(latitude) <= 90 &&
    Math.abs(longitude) <= 180;

  const location: Location = {
    name: readParam(source, "name")?.trim() || DEFAULT_LOCATION.name,
    country: readParam(source, "country")?.trim() || DEFAULT_LOCATION.country,
    admin1: readParam(source, "admin1")?.trim() || undefined,
    latitude: hasCoordinates ? latitude : DEFAULT_LOCATION.latitude,
    longitude: hasCoordinates ? longitude : DEFAULT_LOCATION.longitude,
  };

  const units: Units = {
    temperature:
      readParam(source, "t") === "fahrenheit" ? "fahrenheit" : "celsius",
    windSpeed: readParam(source, "w") === "mph" ? "mph" : "kmh",
    precipitation: readParam(source, "p") === "inch" ? "inch" : "mm",
  };

  return { location, units };
}

export function buildWeatherQuery(location: Location, units: Units): string {
  const params = new URLSearchParams({
    lat: String(location.latitude),
    lon: String(location.longitude),
    name: location.name,
    country: location.country,
    t: units.temperature,
    w: units.windSpeed,
    p: units.precipitation,
  });

  if (location.admin1) {
    params.set("admin1", location.admin1);
  }

  return params.toString();
}

export const TEMPERATURE_OPTIONS: {
  label: string;
  value: TemperatureUnit;
}[] = [
  { label: "Celsius (°C)", value: "celsius" },
  { label: "Fahrenheit (°F)", value: "fahrenheit" },
];

export const WIND_SPEED_OPTIONS: {
  label: string;
  value: WindSpeedUnit;
}[] = [
  { label: "km/h", value: "kmh" },
  { label: "mph", value: "mph" },
];

export const PRECIPITATION_OPTIONS: {
  label: string;
  value: PrecipitationUnit;
}[] = [
  { label: "Millimeters (mm)", value: "mm" },
  { label: "Inches (in)", value: "inch" },
];
