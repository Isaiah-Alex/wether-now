import { resolve } from "path";

const TodaySkeleton = async() => {
    return (
            <div 
                    className="relative w-full sm:max-w-[800px] sm:mx-auto  h-[280px] mt-4 md:mt-0 rounded-2xl bg-neutral-800/70 justify-center flex items-center animate-pulse"
        >
            <div className="mx-auto">
                <div className="flex justify-center space-x-2 items-center">
                <div className="rounded-full bg-white p-1.5"></div>
                <div className="rounded-full bg-white p-1.5 mb-4"></div>
                <div className="rounded-full bg-white p-1.5 "></div>
            </div>
            <p>Loading...</p>
            </div>
            
            </div>
    );
}
 
export default TodaySkeleton;