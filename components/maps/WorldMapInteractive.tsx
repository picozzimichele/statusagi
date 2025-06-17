"use client";
import React, { useState, useCallback } from "react";
import WorldMapSvg from "@/public/svg/WorldMapSvg";
import LegendInput from "./LegendInput";

export default function WorldMapInteractive({
    countryData,
    legend,
    labelName,
}: {
    countryData?: any;
    legend: { show: boolean; legendRate: number[] };
    labelName?: string;
}) {
    // CONSTANTS
    const hoverColor = "text-[#80D8C3]"; // Define the hover color

    // USE STATE
    const [tooltip, setTooltip] = useState<{
        x: number;
        y: number;
        name: string;
        rate: string | number | null;
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
            rate: countryInfo
                ? countryInfo["rate"] === null || isNaN(countryInfo["rate"])
                    ? "N/A"
                    : countryInfo["rate"]
                : "N/A",
        });
    };

    const handleMouseOut = (e: React.MouseEvent<SVGElement>) => {
        const target = e.currentTarget;
        setTooltip(null);
    };

    // USE CALLBACK https://medium.com/welldone-software/usecallback-might-be-what-you-meant-by-useref-useeffect-773bc0278ae

    const getColorFromRate = useCallback(
        (rate: number | null, isBackground?: boolean) => {
            if (rate === null || isNaN(rate)) return isBackground ? "bg-gray-200" : "text-gray-200";
            if (rate < legend.legendRate[0])
                return isBackground ? "bg-green-200" : "text-green-200";
            if (rate < legend.legendRate[1])
                return isBackground ? "bg-yellow-200" : "text-yellow-200";
            if (rate < legend.legendRate[2])
                return isBackground ? "bg-orange-200" : "text-orange-300";
            return isBackground ? "bg-red-200" : "text-red-400";
        },
        [legend.legendRate]
    );

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
                        path.classList.add("hover:text-sky-100"); // Add hover color class
                        path.classList.add("group-hover:text-sky-100"); // Add hover color class
                    }
                });
            }
        },
        [countryData, getColorFromRate]
    );

    return (
        <div className="flex w-full h-full flex-col">
            {tooltip && (
                <div
                    className="fixed z-50 dark:bg-black bg-white dark:text-white text-xs px-2 py-1 rounded pointer-events-none flex flex-col"
                    style={{ top: tooltip.y + 10, left: tooltip.x + 10 }}
                >
                    <p className="font-medium">{tooltip.name}</p>
                    {tooltip.rate && (
                        <div className="flex items-center gap-2">
                            <div
                                className={`h-2.5 w-2.5 rounded-xs ${getColorFromRate(
                                    tooltip.rate ? parseFloat(tooltip.rate.toString()) : null,
                                    true
                                )}`}
                            />
                            <span className="ml-2 text-muted-foreground">{labelName}:</span>
                            <span className="font-mono font-medium">
                                {tooltip?.rate.toString().slice(0, 4)}%
                            </span>
                        </div>
                    )}
                </div>
            )}
            <WorldMapSvg
                refProp={initializeMap}
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
            />
            {/* Legend */}
            {legend?.show && (
                <div className="flex gap-2 items-center pt-10 md:pt-16">
                    <LegendInput color="bg-green-200" text={`Less than ${legend.legendRate[0]}%`} />
                    <LegendInput
                        color="bg-yellow-200"
                        text={`Less than ${legend.legendRate[1]}%`}
                    />
                    <LegendInput
                        color="bg-orange-300"
                        text={`Less than ${legend.legendRate[2]}%`}
                    />
                    <LegendInput color="bg-red-400" text={`${legend.legendRate[2]}% or more`} />
                    <LegendInput color="bg-gray-200" text="No data" />
                </div>
            )}
        </div>
    );
}
