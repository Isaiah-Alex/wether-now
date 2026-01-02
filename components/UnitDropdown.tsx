"use client"


import React from "react";
import { Settings, ChevronDown, Check } from "lucide-react";
import clsx from "clsx";


const UnitDropdown = ({}) => {
const [unitDropdown, setUnitDropdown] = React.useState<boolean>(false)
    const [selectedTempUnit, setSelectedTempUnit] = React.useState<string>("");
    const [selectedWindSpeed, setSelectedWindSpeed] = React.useState<string>("");
    const [selectedPrecipitationUnit, setSelectedPrecipitationUnit] = React.useState<string>("");
    const unitDropdownRef = React.useRef<HTMLDivElement>(null);
    const unitButtonRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const handleUnitDropdown = (event:MouseEvent) => {
            if (unitDropdownRef.current && !unitDropdownRef.current.contains(event.target as Node)) {
                setUnitDropdown(false);
            }
            else if (unitButtonRef.current && unitButtonRef.current.contains(event.target as Node)) {
                setUnitDropdown(prev => !prev)
            }
        }

        document.addEventListener('mousedown', handleUnitDropdown);

        return () => {
            document.removeEventListener('mousedown', handleUnitDropdown);
        };
    },[unitDropdown])


    const tempUnits: string[] = [
        "Celsius (°C)",
        "Fahrenheit (°F)"
    ]
    const windSpeedUnits: string[] = [
        "km/h",
        "mph"
    ]
    const precipitationUnits: string[] = [
        "Millimeters (mm)"
    ]


    return (<div>
        <div ref={unitButtonRef}
            className={clsx("flex items-center gap-1 bg-neutral-800 py-1 px-2 rounded-md cursor-pointer transition-all hover:bg-neutral-700 ease-in-out duration-150 active:bg-neutral-600",
            unitDropdown && "outline-1 outline-white")}>
                <Settings className="w-4"/>
                <p >Units</p>
                <ChevronDown className="w-5 -mx-0.5"/>
            </div>
            {unitDropdown && <div ref={unitDropdownRef} className=" bg-neutral-800 absolute top-11 right-0 rounded-xl border border-neutral-700 w-60 z-11 px-2 py-1.5">
                <span className="space-y-1 border--2 border-neutral-500">
                    <p className="font-bold px-3 hover:outline hover:outline-white cursor-pointer rounded-md py-2">Switch to imperial</p>
                <p className="text-sm text-neutral-400 py-1 px-3">Temperature</p>
                <div className="border-b pb-2 border-neutral-500/30">
                {tempUnits.map((tempUnit) => (
                    <div key={tempUnit} onClick={() => {
                        setSelectedTempUnit(tempUnit);
                    }} 
                    className={clsx("flex justify-between cursor-pointerrounded-sm px-3 py-1.5 cursor-pointer hover:outline hover:outline-white rounded-md",
                        selectedTempUnit === tempUnit && " bg-neutral-700/50 "
                    )}>
                    <p>{tempUnit}</p>
                    { selectedTempUnit === tempUnit && <Check/>}
                </div>
                ))}

                </div>
                </span>
            <div className="space-y-1">
                <p className="text-sm text-neutral-400 pt-3 pb-1 px-3">Wind speen</p>
                {windSpeedUnits.map((windSpeedUnit) => (
                    <div key={windSpeedUnit} onClick={() => {
                        setSelectedWindSpeed(windSpeedUnit);
                    }}
                        className={ clsx("flex justify-between cursor-pointerrounded-sm px-3 py-1.5 cursor-pointer hover:outline hover:outline-white rounded-md",
                        windSpeedUnit === selectedWindSpeed && " bg-neutral-700/50 ")}
                    ><p>{windSpeedUnit}</p>
                    {windSpeedUnit === selectedWindSpeed && <Check/>}
                    </div>
            ))}

            </div>
                <div className="space-y-1">
                <p className="text-sm text-neutral-400 py-1 px-3">Precipitation</p>
                {precipitationUnits.map((precipitationUnit) => (
                    <div key={precipitationUnit}
                        onClick={() => {
                            setSelectedPrecipitationUnit(precipitationUnit);
                    }}
                        className={clsx("flex justify-between cursor-pointerrounded-sm px-3 py-1.5 cursor-pointer hover:outline hover:outline-white rounded-md",
                           precipitationUnit === selectedPrecipitationUnit && "bg-neutral-700/50" 
                        )}>
                        <p>{precipitationUnit}</p>
                        {precipitationUnit === selectedPrecipitationUnit && <Check/>}
                    </div>
                )) }
                </div>
            </div>}
    </div> );
}
 
export default UnitDropdown;