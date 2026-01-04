import Image from "next/image";

interface HourForcastType{
    imagePath: string;
    time: string;
    temperature: number;
}

const HourForcastCard = async ({ imagePath, time, temperature }: HourForcastType) => {
    await new Promise((resolve) => setTimeout(resolve, 6000))

    return (<div className="flex justify-between border border-neutral-50/5 rounded-md py-2 px-4 w-full bg-neutral-50/10">
        <div className="flex gap-2 items-center ">
            <Image
                src={imagePath}
                height={30}
                width={30}
                alt="weather icon"
            />
            <p>{ time }</p>
        </div>
        <p>{temperature}°</p>
    </div> );
}
 
export default HourForcastCard;