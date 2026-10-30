"use client";

import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SearchIcon } from "lucide-react";
import clsx from "clsx";
import { useDebounce } from "use-debounce";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import Button from "@/components/Button";
import { buildWeatherQuery, parseWeatherParams } from "@/lib/search-params";
import type { Location } from "@/lib/weather";

interface GeocodeResult {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country?: string;
  country_code?: string;
  admin1?: string;
}

type SearchStatus = "idle" | "loading" | "error";

const SearchInput = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery] = useDebounce(searchQuery, 400);
  const [results, setResults] = useState<GeocodeResult[]>([]);
  const [status, setStatus] = useState<SearchStatus>("idle");
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const query = debouncedQuery.trim();

    if (query.length < 2) {
      return;
    }

    const controller = new AbortController();

    fetch(`/api/geocode?q=${encodeURIComponent(query)}`, {
      signal: controller.signal,
    })
      .then((response) => {
        if (!response.ok) throw new Error("Geocoding request failed");
        return response.json() as Promise<{ results?: GeocodeResult[] }>;
      })
      .then((data) => {
        setResults(data.results ?? []);
        setActiveIndex(0);
        setStatus("idle");
        setIsOpen(true);
      })
      .catch((error: unknown) => {
        if (error instanceof Error && error.name === "AbortError") return;
        setResults([]);
        setStatus("error");
        setIsOpen(true);
      });

    return () => controller.abort();
  }, [debouncedQuery]);

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

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [isOpen]);

  const selectLocation = (result: GeocodeResult) => {
    const { units } = parseWeatherParams(searchParams);

    const location: Location = {
      name: result.name,
      country: result.country ?? "",
      admin1: result.admin1,
      latitude: result.latitude,
      longitude: result.longitude,
    };

    router.replace(`${pathname ?? "/"}?${buildWeatherQuery(location, units)}`, {
      scroll: false,
    });

    setSearchQuery("");
    setResults([]);
    setStatus("idle");
    setIsOpen(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (results.length === 0) return;

    selectLocation(results[Math.min(activeIndex, results.length - 1)]);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || results.length === 0) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index) => (index + 1) % results.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex(
        (index) => (index - 1 + results.length) % results.length,
      );
    } else if (event.key === "Enter") {
      event.preventDefault();
      selectLocation(results[activeIndex]);
    } else if (event.key === "Escape") {
      setIsOpen(false);
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const hasQuery = value.trim().length >= 2;

    setSearchQuery(value);
    setResults([]);
    setStatus(hasQuery ? "loading" : "idle");
    setIsOpen(hasQuery);
  };

  const showPanel = isOpen && searchQuery.trim().length >= 2;

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-[580px] mx-auto mt-8 min-[375px]:grid min-[375px]:items-center grid-cols-4 gap-2"
    >
      <div className="relative col-span-3" ref={containerRef}>
        <InputGroup className="bg-neutral-800/75 py-5 border-none transition-all focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 focus-within:ring-offset-neutral-900">
          <InputGroupInput
            value={searchQuery}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => {
              if (searchQuery.trim().length >= 2) setIsOpen(true);
            }}
            placeholder="Search for a place"
            aria-label="Search for a place"
            autoComplete="off"
          />
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
        </InputGroup>

        {showPanel && (
          <div className="absolute left-0 right-0 top-full z-20 mt-1 overflow-hidden rounded-xl border border-neutral-700 bg-neutral-800/95 shadow-lg">
            {status === "loading" && (
              <p className="px-4 py-3 text-sm text-neutral-300">Searching…</p>
            )}

            {status === "error" && (
              <p className="px-4 py-3 text-sm text-red-400">
                Couldn&apos;t search right now. Please try again.
              </p>
            )}

            {status === "idle" && results.length === 0 && (
              <p className="px-4 py-3 text-sm text-neutral-300">
                No places found.
              </p>
            )}

            {results.map((result, index) => (
              <button
                type="button"
                key={result.id}
                onClick={() => selectLocation(result)}
                onMouseEnter={() => setActiveIndex(index)}
                className={clsx(
                  "flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left text-sm",
                  index === activeIndex
                    ? "bg-neutral-700/70"
                    : "hover:bg-neutral-700/50",
                )}
              >
                <span>
                  {result.name}
                  {result.admin1 ? `, ${result.admin1}` : ""}
                </span>
                <span className="text-xs text-neutral-400">
                  {result.country ?? result.country_code ?? ""}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      <Button>Submit</Button>
    </form>
  );
};

export default SearchInput;
