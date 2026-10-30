# Weather App

A weather dashboard built with **Next.js 16 (App Router)**, **React 19**, **Tailwind CSS v4** and **shadcn/ui**. Weather and geocoding data come from [Open-Meteo](https://open-meteo.com), which requires no API key.

## Features

- Current conditions for any searched city (temperature, feels-like, humidity, wind, precipitation).
- 7-day daily forecast with WMO weather icons.
- Hourly forecast with a day selector.
- Unit switching (Celsius/Fahrenheit, km/h/mph, mm/in) that persists in the URL.
- Location and units are stored in the URL, so any view can be shared or bookmarked.
- Streaming UI with `Suspense` skeletons and an error boundary with retry.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The default location is Benin City, Nigeria.

## How it works

| Path | Purpose |
| --- | --- |
| `lib/weather.ts` | Typed Open-Meteo forecast client and value formatters. |
| `lib/weather-codes.ts` | WMO weather code → icon/label mapping. |
| `lib/format.ts` | Timezone-safe date and hour formatting. |
| `lib/search-params.ts` | URL parameter parsing/building, defaults and unit options. |
| `app/api/geocode/route.ts` | Server proxy for the Open-Meteo geocoding API. |
| `app/page.tsx` | Reads `searchParams`, renders the streamed dashboard sections. |
| `components/SearchInput.tsx` | Debounced place search with keyboard navigation. |
| `components/UnitDropdown.tsx` | Unit selection written back to the URL. |
| `components/HourlyForecast*.tsx` | Hourly data fetch and interactive day selector. |

### URL parameters

```
/?lat=6.335&lon=5.604&name=Benin+City&country=Nigeria&admin1=Edo&t=celsius&w=kmh&p=mm
```

- `t`: `celsius` | `fahrenheit`
- `w`: `kmh` | `mph`
- `p`: `mm` | `inch`

## Scripts

```bash
npm run dev     # development server
npm run build   # production build
npm run start   # production server
npm run lint    # ESLint
```

## Attribution

Weather data by [Open-Meteo.com](https://open-meteo.com) (CC BY 4.0).
