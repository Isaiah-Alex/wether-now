import { NextRequest } from "next/server";

interface GeocodingApiResult {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country?: string;
  country_code?: string;
  admin1?: string;
  timezone?: string;
}

interface GeocodingApiResponse {
  results?: GeocodingApiResult[];
}

const GEOCODING_URL = "https://geocoding-api.open-meteo.com/v1/search";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q")?.trim() ?? "";

  if (query.length < 2) {
    return Response.json({ results: [] });
  }

  const url = new URL(GEOCODING_URL);
  url.searchParams.set("name", query);
  url.searchParams.set("count", "6");
  url.searchParams.set("language", "en");
  url.searchParams.set("format", "json");

  try {
    const response = await fetch(url, { next: { revalidate: 86400 } });

    if (!response.ok) {
      return Response.json(
        { error: "Geocoding service is unavailable" },
        { status: 502 },
      );
    }

    const data = (await response.json()) as GeocodingApiResponse;

    const results = (data.results ?? []).map((result) => ({
      id: result.id,
      name: result.name,
      latitude: result.latitude,
      longitude: result.longitude,
      country: result.country,
      country_code: result.country_code,
      admin1: result.admin1,
      timezone: result.timezone,
    }));

    return Response.json({ results });
  } catch {
    return Response.json(
      { error: "Geocoding service is unavailable" },
      { status: 502 },
    );
  }
}
