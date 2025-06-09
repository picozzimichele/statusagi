"use client";
import React, { useState } from "react";
import WorldMapSvg from "@/public/svg/WorldMapSvg";

export default function WorldMapInteractive() {
    const [tooltip, setTooltip] = useState<{ x: number; y: number; name: string } | null>(null);
    const hoverColor = "#80D8C3"; // Define the hover color

    const applyHoverClass = (element: Element, add: boolean) => {
        if (element.tagName === "path" || element.tagName === "PATH") {
            if (add) {
                (element as SVGPathElement).classList.add(`text-[${hoverColor}]`);
            } else {
                (element as SVGPathElement).classList.remove(`text-[${hoverColor}]`);
            }
        }
    };

    const handleMouseOver = (e: React.MouseEvent<SVGElement>) => {
        const target = e.target as SVGElement;
        const countryId = target.id;

        const x = e.clientX;
        const y = e.clientY;

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
            path.classList.add(`text-[${hoverColor}]`);
        });

        setTooltip({ x, y, name: countryId.toUpperCase() });
    };

    const handleMouseOut = (e: React.MouseEvent<SVGElement>) => {
        const target = e.currentTarget;

        if (target.tagName === "g" || target.tagName === "G") {
            const paths = target.querySelectorAll("path");
            paths.forEach((path) => applyHoverClass(path, false));
        } else if (target.tagName === "path" || target.tagName === "PATH") {
            applyHoverClass(target, false);
        }

        setTooltip(null);
    };

    return (
        <>
            {tooltip && (
                <div
                    className="fixed z-50 dark:bg-black bg-white dark:text-white text-xs px-2 py-1 rounded pointer-events-none"
                    style={{ top: tooltip.y + 10, left: tooltip.x + 10 }}
                >
                    {tooltip.name}
                </div>
            )}
            <WorldMapSvg onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} />
        </>
    );
}
