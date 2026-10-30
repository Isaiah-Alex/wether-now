"use client";

import Image from "next/image";
import { bricolageGrotesque } from "@/app/ui/font";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div>
      <Image
        src="/images/icon-error.svg"
        width={20}
        height={20}
        alt=""
        className="mx-auto mt-12"
      />
      <h1
        className={`${bricolageGrotesque.className} text-center mt-3 mb-2`}
      >
        Something went wrong
      </h1>
      <p className="text-center text-sm max-w-sm mx-auto opacity-70">
        We couldn&apos;t load the weather right now (API error). Please try
        again in a few moments.
      </p>
      <button
        type="button"
        onClick={() => reset()}
        className="flex items-center bg-neutral-700/40 px-3 py-2 mt-4 rounded-md gap-x-2 hover:bg-neutral-700/60 max-w-20 justify-center mx-auto cursor-pointer"
      >
        <Image src="/images/icon-retry.svg" width={10} height={10} alt="" />
        <span className="text-[10px]">Retry</span>
      </button>
    </div>
  );
}
