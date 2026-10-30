/**
 * Open-Meteo returns local wall-clock strings without an offset when
 * `timezone=auto` is used ("2026-10-30T15:00" / "2026-10-30"). Parsing them as
 * UTC and formatting with `timeZone: "UTC"` keeps the value exactly as the
 * location experiences it, without any timezone drift on the server.
 */
function toUtcDate(value: string): Date {
  if (value.length === 10) {
    return new Date(`${value}T00:00:00Z`);
  }

  const normalized = value.length === 16 ? `${value}:00` : value;
  return new Date(`${normalized}Z`);
}

export function formatLongDate(value: string): string {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(toUtcDate(value));
}

export function formatWeekday(value: string): string {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    timeZone: "UTC",
  }).format(toUtcDate(value));
}

export function formatHour(value: string): string {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    hour12: true,
    timeZone: "UTC",
  }).format(toUtcDate(value));
}
