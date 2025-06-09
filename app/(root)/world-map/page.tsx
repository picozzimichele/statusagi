"use client";
import React, { useState } from "react";

import WorldMapSvg from "@/public/svg/WorldMapSvg";

export default function Page() {
    const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);

    const applyHoverClass = (element: Element, add: boolean) => {
        if (element.tagName === "path" || element.tagName === "PATH") {
            if (add) {
                (element as SVGPathElement).classList.add("text-green-500");
            } else {
                (element as SVGPathElement).classList.remove("text-green-500");
            }
        }
    };

    const handleMouseOver = (e: React.MouseEvent<SVGElement>) => {
        const target = e.target as SVGElement;
        const countryId = target.id;
        // If it's a <g>, apply to all child <path> elements
        if (target.tagName === "g" || target.tagName === "G") {
            const paths = target.querySelectorAll("path");
            paths.forEach((path) => applyHoverClass(path, true));
        } else if (target.tagName === "path" || target.tagName === "PATH") {
            // If it's a standalone <path>, apply directly
            applyHoverClass(target, true);
        }

        const group = e.currentTarget;
        const paths = group.querySelectorAll("path");

        paths.forEach((path) => {
            path.classList.add("text-green-500");
        });

        if (countryId) {
            setHoveredCountry(countryId.toUpperCase());
        }
    };

    const handleMouseOut = (e: React.MouseEvent<SVGElement>) => {
        const target = e.currentTarget;

        if (target.tagName === "g" || target.tagName === "G") {
            const paths = target.querySelectorAll("path");
            paths.forEach((path) => applyHoverClass(path, false));
        } else if (target.tagName === "path" || target.tagName === "PATH") {
            applyHoverClass(target, false);
        }

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
