import { fetchWeatherApi } from "openmeteo";

export const params = {
	latitude: 9.5,
	longitude: 2.25,
	daily: ["weather_code", "temperature_2m_min", "temperature_2m_max", "precipitation_probability_max", "precipitation_hours", "precipitation_sum", "snowfall_sum", "showers_sum", "rain_sum"],
	hourly: ["temperature_2m", "rain", "showers", "snowfall"],
	current: ["precipitation", "rain", "showers", "snowfall", "wind_speed_10m", "temperature_2m", "relative_humidity_2m", "apparent_temperature", "weather_code"],
	timezone: "Africa/Cairo",
	past_days: 1,
	wind_speed_unit: "mph",
	precipitation_unit: "inch",
};

const url = "https://api.open-meteo.com/v1/forecast";
const responses = await fetchWeatherApi(url, params);

// Process first location. Add a for-loop for multiple locations or weather models
const response = responses[0];

// Attributes for timezone and location
const latitude = response.latitude();
const longitude = response.longitude();
const elevation = response.elevation();
const timezone = response.timezone();
const timezoneAbbreviation = response.timezoneAbbreviation();
const utcOffsetSeconds = response.utcOffsetSeconds();

console.log(
	`\nCoordinates: ${latitude}°N ${longitude}°E`,
	`\nElevation: ${elevation}m asl`,
	`\nTimezone: ${timezone} ${timezoneAbbreviation}`,
	`\nTimezone difference to GMT+0: ${utcOffsetSeconds}s`,
);

const current = response.current()!;
const hourly = response.hourly()!;
const daily = response.daily()!;

// Note: The order of weather variables in the URL query and the indices below need to match!
export const weatherData = {
	current: {
		time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
		precipitation: current.variables(0)!.value(),
		rain: current.variables(1)!.value(),
		showers: current.variables(2)!.value(),
		snowfall: current.variables(3)!.value(),
		wind_speed_10m: current.variables(4)!.value(),
		temperature_2m: current.variables(5)!.value(),
		relative_humidity_2m: current.variables(6)!.value(),
		apparent_temperature: current.variables(7)!.value(),
		weather_code: current.variables(8)!.value(),
	},
	hourly: {
		time: Array.from(
			{ length: (Number(hourly.timeEnd()) - Number(hourly.time())) / hourly.interval() }, 
			(_, i) => new Date((Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) * 1000)
		),
		temperature_2m: hourly.variables(0)!.valuesArray(),
		rain: hourly.variables(1)!.valuesArray(),
		showers: hourly.variables(2)!.valuesArray(),
		snowfall: hourly.variables(3)!.valuesArray(),
	},
	daily: {
		time: Array.from(
			{ length: (Number(daily.timeEnd()) - Number(daily.time())) / daily.interval() }, 
			(_, i) => new Date((Number(daily.time()) + i * daily.interval() + utcOffsetSeconds) * 1000)
		),
		weather_code: daily.variables(0)!.valuesArray(),
		temperature_2m_min: daily.variables(1)!.valuesArray(),
		temperature_2m_max: daily.variables(2)!.valuesArray(),
		precipitation_probability_max: daily.variables(3)!.valuesArray(),
		precipitation_hours: daily.variables(4)!.valuesArray(),
		precipitation_sum: daily.variables(5)!.valuesArray(),
		snowfall_sum: daily.variables(6)!.valuesArray(),
		showers_sum: daily.variables(7)!.valuesArray(),
		rain_sum: daily.variables(8)!.valuesArray(),
	},
};

// The 'weatherData' object now contains a simple structure, with arrays of datetimes and weather information
console.log(
	`\nCurrent time: ${weatherData.current.time}\n`,
	`\nCurrent precipitation: ${weatherData.current.precipitation}`,
	`\nCurrent rain: ${weatherData.current.rain}`,
	`\nCurrent showers: ${weatherData.current.showers}`,
	`\nCurrent snowfall: ${weatherData.current.snowfall}`,
	`\nCurrent wind_speed_10m: ${weatherData.current.wind_speed_10m}`,
	`\nCurrent temperature_2m: ${weatherData.current.temperature_2m}`,
	`\nCurrent relative_humidity_2m: ${weatherData.current.relative_humidity_2m}`,
	`\nCurrent apparent_temperature: ${weatherData.current.apparent_temperature}`,
	`\nCurrent weather_code: ${weatherData.current.weather_code}`,
);
console.log("\nHourly data:\n", weatherData.hourly)
console.log("\nDaily data:\n", weatherData.daily)
