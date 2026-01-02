import Button from "@/components/Button";
import Card from "@/components/Card";
import Dropdown from "@/components/Dropdown";
import ForcastCard from "@/components/ForcastCard";
import Hero from "@/components/Hero";
import SearchInput from "@/components/SearchInput";
import Today from "@/components/Today";
import HourForcastCard from "@/components/HourForcastCard";
import { fetchWeatherApi } from "openmeteo";
import {params} from "@/app/api/weather/openmenteo"

const Home = () => {

  return (<div>
    <Hero />
    <SearchInput />
    <div className="md:grid md:grid-rows-5 gap-4 grid-cols-3 md:grid-flow-row-dense md:mt-4">
      <div className="md:col-span-2 md:row-span-2">
        <Today />
      </div>

      {/* today cards group  */}
      <section className="grid gap-2 grid-cols-2  sm:grid-cols-4 w-full mt-3 md:col-span-2 md:row-span-1">
        <Card title="Feels Like" temperature="64°" />
        <Card title="Humidity" temperature="46%" />
        <Card title="Wind" temperature="9 mph" />
        <Card title="Precipitation" temperature="0 in" />
      </section>

      {/* Daily forcast cards  */}
      <section className="md:col-span-2 md:row-span-2">
        <h4 className="mt-4 md:mt-0">Daily forcast</h4>
        <section  className="grid grid-cols-3 sm:grid-cols-7 w-full mt-1.5 gap-2 mb items-end">
          <ForcastCard day="Tue" imagePath="/images/icon-rain.webp" temp1="68" temp2="57"/>
          <ForcastCard day="Wed" imagePath="/images/icon-drizzle.webp" temp1="68" temp2="57"/>
          <ForcastCard day="Thu" imagePath="/images/icon-sunny.webp" temp1="68" temp2="57"/>
          <ForcastCard day="Fri" imagePath="/images/icon-partly-cloudy.webp" temp1="68" temp2="57"/>
          <ForcastCard day="Sat" imagePath="/images/icon-storm.webp" temp1="68" temp2="57"/>
          <ForcastCard day="Sun" imagePath="/images/icon-snow.webp" temp1="68" temp2="57"/>
          <ForcastCard day="Mon" imagePath="/images/icon-fog.webp" temp1="68" temp2="57"/>
        </section>
      </section>

      {/* hour forcast  group*/}
      <section className="flex flex-col gap-3 md:gap-8 mx-auto bg-neutral-800/70 rounded-xl border border-neutral-700/40 w-full row-span-5 mt-4 md:mt-0 md:max-h-[645px] mb-6">
        <div className="flex justify-between mt-2 md:max-h-10 mx-3  items-center md:mt-6">
          <h4>Hourly forcast</h4>
          <Dropdown />
        </div>
        <div className="flex flex-col gap-2.5 justify-between mx-3 items-center mb-3 md:gap-4">

          <HourForcastCard imagePath="/images/icon-rain.webp" time="3 PM" temperature={68}/>
          <HourForcastCard imagePath="/images/icon-rain.webp" time="3 PM" temperature={20}/>
          <HourForcastCard imagePath="/images/icon-sunny.webp" time="3 PM" temperature={68}/>
          <HourForcastCard imagePath="/images/icon-rain.webp" time="3 PM" temperature={40}/>
          <HourForcastCard imagePath="/images/icon-rain.webp" time="3 PM" temperature={25}/>
          <HourForcastCard imagePath="/images/icon-storm.webp" time="3 PM" temperature={10}/>
          <HourForcastCard imagePath="/images/icon-snow.webp" time="3 PM" temperature={33}/>
          <HourForcastCard imagePath="/images/icon-fog.webp" time="3 PM" temperature={10}/>
        </div>
      </section>
    </div>
    <footer>
      <p className="text-sm text-neutral-50/30 text-center mb-3">Created by <strong>Isaiah Alex</strong></p>
    </footer>
  </div>);
}
 
export default Home;