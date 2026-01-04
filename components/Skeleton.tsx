const Skeleton = () => {
    return (<div>
        <section 
                    className="relative w-full sm:max-w-[800px] sm:mx-auto  h-[280px] mt-4 md:mt-0 max-[375px]:bg-[url('../public/images/bg-today-small.svg')] min-[375px]:bg-[url('../public/images/bg-today-large.svg')] bg-center  bg-no-repeat rounded-2xl"
                    style={{ backgroundImage: "" }}
                >
                    <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4 sm:flex-row sm:justify-between sm:px-20">
                        <div className="text-center space-y-1.5">
                        <h2 className="text-2xl font-semibold">Berlin, Germany</h2>
                        <p className="text-sm opacity-80">Tuesday, Aug 5, 2025</p>
                        </div>
                        <div className="flex items-center gap-6 sm:gap-2 mt-8 sm:mt-0">
                            
                            <h1 className="text-7xl font-bold"><em>68°</em></h1>
                        </div>
                    </div>
                </section>
    </div> );
}
 
export default Skeleton;