import Image from "next/image";

interface ForcastTypes{
    day: "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";
    imagePath: string;
    temp1: string;
    temp2: string;
}

const ForcastCard = async ({ day, imagePath, temp1, temp2 }: ForcastTypes) => {
    
    await new Promise((resolve) => setTimeout(resolve, 6000));
    return (<div className="flex flex-col justify-center items-center bg-neutral-800/70 gap-4 rounded-xl py-4 border border-neutral-700/40 w-full sm:px-2">
        <p className="text-sm">{day}</p>
        <Image
            src={imagePath}
            width={70}
            height={70}
            alt="weather icon"
        />
        <div className="flex justify-center gap-x-12 sm:justify-between sm:gap-x-0 w-full">
            <p className="text-bold text-sm *:">{temp1}°</p>
            <p className="text-sm opacity-70">{ temp2}°</p> 
        </div>
    </div> );
}
 
export default ForcastCard;