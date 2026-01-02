"use client"

import React from "react";
import { useDebounce } from "use-debounce";


import {
  SearchIcon
} from "lucide-react"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"

import Button from "@/components/Button";

type Location = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  country_code: string;
  admin1?: string;
}


const SearchInput = () => {
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [debouncedQuery] = useDebounce(searchQuery, 500);
  const [locations, setLocations] = React.useState<Location[]>([]);

  React.useEffect(() => {
    if (debouncedQuery.length >= 2) {
      fetchLocations(debouncedQuery).then(results => {
        setLocations(results);
      });
    } else {
      setLocations([]);
    }
  }, [debouncedQuery]);
  
  const fetchLocations = async (query: string) => {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${query}`
    const res = await fetch(url);
    const data = await res.json();
    return data.results;
  }

  const fetchWeather = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
          const url = `https://api.open-meteo.com/v1/forecast?latitude=${locations[0].latitude}&longitude=${locations[0].longitude}&current_weather=true`;
;

      const response = await fetch(url);
      
    } catch (error) {
      console.log(error)
    }
  }




  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const handleSearch = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()


  console.log('submitted')
}

    return (<form onSubmit={fetchWeather} className="w-full max-w-[580px] mx-auto mt-8 min-[375px]:grid min-[375px]:items-center grid-cols-4 gap-2">
      <InputGroup className="bg-neutral-800 opacity-75 py-5 col-span-3 border-none focus:border-2">
        <InputGroupInput value={searchQuery} onChange={handleInputChange}
          placeholder="Search for a place" />
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
      </InputGroup>
      <Button>Submit</Button>

      
    </form> );
}
 
export default SearchInput;