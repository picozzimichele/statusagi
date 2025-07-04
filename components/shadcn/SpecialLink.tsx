import Link from "next/link";
import React from "react";

export default function SpecialLink() {
    const value = "country";
    const href = {
        country: "Algeria",
        series: "Series Name",
    };

    const selectedParamName = "series";

    return (
        <Link
            key={value}
            className="w-full"
            scroll={false}
            shallow={true}
            href={`?${new URLSearchParams({
                ...href,
                [selectedParamName || ""]: value,
            })}`}
        ></Link>
    );
}
