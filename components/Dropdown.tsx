"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import clsx from "clsx";

export interface DropdownOption {
  label: string;
  value: string;
}

interface DropdownProps {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
}

const Dropdown = ({ options, value, onChange }: DropdownProps) => {
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

  const selected = options.find((option) => option.value === value);

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
        className={clsx(
          "flex items-center gap-1 bg-neutral-800 py-1 px-2 rounded-md cursor-pointer transition-all hover:bg-neutral-700 ease-in-out duration-150 active:bg-neutral-600",
          isOpen && "outline-offset-2 outline-1 outline-white",
        )}
      >
        <span>{selected?.label ?? "Select"}</span>
        <ChevronDown className="w-5 -mx-0.5" />
      </button>

      {isOpen && (
        <div
          role="listbox"
          className="bg-neutral-800/90 absolute top-11 right-0 rounded-xl border border-neutral-700 w-56 z-20 px-2 py-1.5 shadow-lg"
        >
          {options.map((option) => (
            <button
              type="button"
              role="option"
              aria-selected={option.value === value}
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
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
      )}
    </div>
  );
};

export default Dropdown;
