"use client";
import React, { useState, useEffect, useRef, useReducer, useCallback, use } from "react";
import WorldMapSvg from "@/public/svg/WorldMapSvg";

export default function WorldMapInteractive({ countryData }: { countryData?: any }) {
    // CONSTANTS
    const hoverColor = "text-[#80D8C3]"; // Define the hover color

    // USE STATE
    const [tooltip, setTooltip] = useState<{
        x: number;
        y: number;
        name: string;
        rate: string;
    } | null>(null);

    // FUNCTIONS
    function getCountryData({ countryData, countryId }: { countryData?: any; countryId?: string }) {
        const country = countryData.find((item) => item["Alpha-2"] === countryId?.toUpperCase());
        return country
            ? { country: country["Country"] || null, rate: country["2024"] || null }
            : null;
    }

    const handleMouseOver = (e: React.MouseEvent<SVGElement>) => {
        const target = e.target as SVGElement;
        const countryId = target.id;

        const x = e.clientX;
        const y = e.clientY;

        const group = e.currentTarget;

        const countryInfo = getCountryData({ countryData, countryId });

        setTooltip({
            x,
            y,
            name: countryInfo ? countryInfo["country"] : countryId.toUpperCase(),
            rate: countryInfo ? countryInfo["rate"] : "N/A",
        });
    };

    const handleMouseOut = (e: React.MouseEvent<SVGElement>) => {
        const target = e.currentTarget;
        setTooltip(null);
    };

    const getColorFromRate = (rate: number | null): string => {
        if (rate === null || isNaN(rate)) return "text-[#d1d5db]"; // Tailwind gray-300
        if (rate < 4) return "text-[#4ade80]"; // green-400
        if (rate < 7) return "text-[#facc15]"; // yellow-400
        if (rate < 10) return "text-[#f97316]"; // orange-400
        return "text-[#ef4444]"; // red-500
    };

    // USE CALLBACK https://medium.com/welldone-software/usecallback-might-be-what-you-meant-by-useref-useeffect-773bc0278ae
    const initializeMap = useCallback(
        (mapNode) => {
            if (mapNode) {
                mapNode.querySelectorAll("path").forEach((path) => {
                    // Set initial color based on data
                    const countryId = path.id;
                    const countryInfo = getCountryData({ countryData, countryId });
                    const rate = countryInfo ? countryInfo.rate : null;
                    if (path.tagName === "path" || path.tagName === "PATH") {
                        const color = getColorFromRate(rate);
                        path.classList.add(`${color}`); // Set initial color
                        path.classList.add("hover:text-[#80D8C3]"); // Add hover color class
                        path.classList.add("group-hover:text-[#80D8C3]"); // Add hover color class
                    }
                });
            }
        },
        [countryData]
    );

    return (
        <>
            {tooltip && (
                <div
                    className="fixed z-50 dark:bg-black bg-white dark:text-white text-xs px-2 py-1 rounded pointer-events-none"
                    style={{ top: tooltip.y + 10, left: tooltip.x + 10 }}
                >
                    {tooltip.name}
                    {tooltip.rate && (
                        <span className="ml-2">Rate: {tooltip.rate.slice(0, 4)}%</span>
                    )}
                </div>
            )}
            <WorldMapSvg
                refProp={initializeMap}
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
            />
        </>
    );
}
