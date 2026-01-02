"use client"

import React from "react"

import { ChevronDown, Check } from 'lucide-react'
import clsx from "clsx";


function Dropdown() {
  const [selectedDay, setSelectedDay] = React.useState<string>("Tuesday");
  const [isDropdowonOpen, setIsDropdownOpen] = React.useState<boolean>(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const buttonRef = React.useRef<HTMLDivElement>(null);


  React.useEffect(() => {
    const handleOpenDropdown = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
      else if (buttonRef.current && buttonRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(prev => !prev);
      }
    }

      document.addEventListener('mousedown', handleOpenDropdown)

      return () => {
        document.removeEventListener('mousedown', handleOpenDropdown);
      }
  
  },[isDropdowonOpen])
  
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ]

  return (
    <div className="relative">
      <div ref={buttonRef}
        className={clsx("flex items-center gap-1 bg-neutral-800 py-1 px-2 rounded-md cursor-pointer transition-all hover:bg-neutral-700 ease-in-out duration-150 active:bg-neutral-600",
          isDropdowonOpen && "outline-1 outline-white"
        )}>
          <p >{selectedDay}</p>
          <ChevronDown className="w-5 -mx-0.5"/>
      </div>
      {isDropdowonOpen && <div ref={dropdownRef}
        className={clsx(" bg-neutral-800/90 absolute top-11 right-0 rounded-xl border border-neutral-700 w-50 z-11 px-2 py-1.5",)}>
        {daysOfWeek.map((day) => (
          <div onClick={() => {
            setSelectedDay(day);
          }}
            className={clsx("flex justify-between cursor-pointerrounded-sm px-3 py-1.5 cursor-pointer hover:outline hover:outline-white rounded-md",
              selectedDay === day && "bg-neutral-700/50"
            )}
            key={day}
          ><p>{day}</p>
          {selectedDay === day && <Check/>}</div>
        ))}
      </div>}
   </div>
  )
}

export default Dropdown;