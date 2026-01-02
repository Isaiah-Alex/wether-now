import Image from "next/image";
import ErrorIcon from "@/public/images/icon-error.svg"
import RetryICon from "@/public/images/icon-retry.svg"
import { bricolageGrotesque } from "@/app/ui/font"

const NotFound = () => {
    return (<div>
        <Image
            src={ErrorIcon}
            width={20}
            height={20}
            alt="Error Icon"
            className="mx-auto mt-12"
        />
        <h1 className={`${bricolageGrotesque.className} text-center mt-3 mb-2`}>Something went wrong</h1>
        <p className="text-center text-sm max-w-sm mx-auto opacity-70">We couldn't connect to the server (API error). Please try again in a few moments.</p>
        <div className="flex items-center bg-neutral-700/40 px-3 py-2 mt-4 rounded-md gap-x-2 hover:bg-neutral-700/60 max-w-20 justify-center mx-auto cursor-pointer">
            <Image
                src={RetryICon}
                width={10}
                height={10}
                alt="RetryIcon"
            />
            <p className="text-[10px]">Retry</p>
        </div>

    </div> );
}
 
export default NotFound;