"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Check, ChevronDown, Settings } from "lucide-react";
import clsx from "clsx";
import {
  buildWeatherQuery,
  DEFAULT_UNITS,
  IMPERIAL_UNITS,
  parseWeatherParams,
  PRECIPITATION_OPTIONS,
  TEMPERATURE_OPTIONS,
  WIND_SPEED_OPTIONS,
} from "@/lib/search-params";
import type { Units } from "@/lib/weather";

interface UnitSectionProps<T extends string> {
  title: string;
  options: { label: string; value: T }[];
  value: T;
  onChange: (value: T) => void;
}

function UnitSection<T extends string>({
  title,
  options,
  value,
  onChange,
}: UnitSectionProps<T>) {
  return (
    <div className="space-y-1 border-t border-neutral-500/30 pt-1 first:border-t-0 first:pt-0">
      <p className="text-sm text-neutral-400 py-1 px-3">{title}</p>
      {options.map((option) => (
        <button
          type="button"
          key={option.value}
          onClick={() => onChange(option.value)}
          aria-pressed={option.value === value}
          className={clsx(
            "flex w-full items-center justify-between rounded-md px-3 py-1.5 text-left cursor-pointer hover:outline hover:outline-white",
            option.value === value && "bg-neutral-700/50",
          )}
        >
          <span>{option.label}</span>
          {option.value === value && <Check className="w-4" />}
        </button>
      ))}
    </div>
  );
}

const UnitDropdown = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { location, units } = parseWeatherParams(searchParams);

  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const updateUnits = (nextUnits: Units) => {
    const query = buildWeatherQuery(location, nextUnits);
    router.replace(`${pathname ?? "/"}?${query}`, { scroll: false });
  };

  const isImperial = units.temperature === "fahrenheit";

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
        className={clsx(
          "flex items-center gap-1 bg-neutral-800 py-1 px-2 rounded-md cursor-pointer transition-all hover:bg-neutral-700 ease-in-out duration-150 active:bg-neutral-600",
          isOpen && "outline-offset-2 outline-1 outline-white",
        )}
      >
        <Settings className="w-4" />
        <p>Units</p>
        <ChevronDown className="w-5 -mx-0.5" />
      </button>

      {isOpen && (
        <div className="bg-neutral-800 absolute top-11 right-0 rounded-xl border border-neutral-700 w-60 z-20 px-2 py-1.5 shadow-lg">
          <button
            type="button"
            onClick={() =>
              updateUnits(isImperial ? DEFAULT_UNITS : IMPERIAL_UNITS)
            }
            className="w-full rounded-md px-3 py-2 text-left font-bold hover:outline hover:outline-white cursor-pointer"
          >
            Switch to {isImperial ? "metric" : "imperial"}
          </button>

          <UnitSection
            title="Temperature"
            options={TEMPERATURE_OPTIONS}
            value={units.temperature}
            onChange={(temperature) => updateUnits({ ...units, temperature })}
          />

          <UnitSection
            title="Wind speed"
            options={WIND_SPEED_OPTIONS}
            value={units.windSpeed}
            onChange={(windSpeed) => updateUnits({ ...units, windSpeed })}
          />

          <UnitSection
            title="Precipitation"
            options={PRECIPITATION_OPTIONS}
            value={units.precipitation}
            onChange={(precipitation) =>
              updateUnits({ ...units, precipitation })
            }
          />
        </div>
      )}
    </div>
  );
};

export default UnitDropdown;
