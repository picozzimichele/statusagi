"use client";
import React, { useState } from "react";

import WorldMapSvg from "@/public/svg/WorldMapSvg";

export default function Page() {
    const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);

    const handleMouseOver = (e: React.MouseEvent<SVGElement>) => {
        const target = e.target as SVGElement;
        const countryId = target.id;

        if (countryId) {
            setHoveredCountry(countryId.toUpperCase());
        }
    };

    const handleMouseOut = () => {
        setHoveredCountry(null);
    };

    return (
        <div className="">
            <h1>SVG Map</h1>
            <div className="mb-2 text-center text-lg font-semibold h-6">
                {hoveredCountry ?? "Hover over a country"}
            </div>
            <WorldMapSvg onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} />
        </div>
    );
}
