import React from "react";

export default function LegendInput({ color, text }: { color?: string; text?: string }) {
    return (
        <div className="flex gap-2 items-center">
            <div className={`md:w-4 md:h-4 h-3 w-3 rounded shrink-0 ${color}`} />
            <p className="md:text-xs text-[10px]">{text}</p>
        </div>
    );
}
