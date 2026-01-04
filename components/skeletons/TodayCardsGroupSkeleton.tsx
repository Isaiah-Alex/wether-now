
const TodayCardsGroupSkeleton = () => {
    return (<div className="grid gap-2 grid-cols-2  sm:grid-cols-4 mt-3  md:col-span-2 md:row-span-1 animate-pulse">
        <div className="bg-neutral-800/70 rounded-xl pl-4 pt-4 pb-4 border border-neutral-800/70">
            <p>Feels Like</p>
            <p className="pt-2.5 text-3xl">_</p>
        </div>
        <div className="bg-neutral-800/70 rounded-xl pl-4 pt-4 pb-4 border border-neutral-800/70">
            <p>Humidity</p>
            <p className="pt-2.5 text-3xl">_</p>
        </div>
        <div className="bg-neutral-800/70 rounded-xl pl-4 pt-4 pb-4 border border-neutral-800/70">
            <p>Wind</p>
            <p className="pt-2.5 text-3xl">_</p>
        </div>
        <div className="bg-neutral-800/70 rounded-xl pl-4 pt-4 pb-4 border border-neutral-800/70">
            <p>Precipitation</p>
            <p className="pt-2.5 text-3xl">_</p>
        </div>
    </div> );
}
 
export default TodayCardsGroupSkeleton;