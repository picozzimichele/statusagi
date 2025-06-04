import UsagiSvg from "@/public/svg/UsagiSvg";
import Link from "next/link";
import React from "react";

export default function Logo() {
    return (
        <Link
            href="/"
            className="flex gap-2 text-black hover:text-slate-700 dark:text-white dark:hover:text-slate-300 duration-150 ease-in"
        >
            <div className="h-6 w-6">
                <UsagiSvg />
            </div>
            <p className="font-medium">usagi</p>
        </Link>
    );
}
