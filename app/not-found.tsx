import Image from "next/image";
import Link from "next/link";
import { bricolageGrotesque } from "@/app/ui/font";

const NotFound = () => {
  return (
    <div>
      <Image
        src="/images/icon-error.svg"
        width={20}
        height={20}
        alt=""
        className="mx-auto mt-12"
      />
      <h1 className={`${bricolageGrotesque.className} text-center mt-3 mb-2`}>
        Page not found
      </h1>
      <p className="text-center text-sm max-w-sm mx-auto opacity-70">
        We couldn&apos;t find the page you were looking for.
      </p>
      <Link
        href="/"
        className="flex items-center bg-neutral-700/40 px-3 py-2 mt-4 rounded-md gap-x-2 hover:bg-neutral-700/60 max-w-20 justify-center mx-auto cursor-pointer"
      >
        <span className="text-[10px]">Go home</span>
      </Link>
    </div>
  );
};

export default NotFound;
