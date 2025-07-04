"use client";

import { usePathname, useSearchParams } from "next/navigation";

export const ParamButton = ({ dropDownData, selectedParamName = "value" }) => {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const handleClick = () => {
        const newParams = new URLSearchParams(searchParams.toString());

        // Update or set the param
        newParams.set(selectedParamName, dropDownData.value);

        // Replace URL without triggering a server fetch
        window.history.replaceState(
            {
                ...window.history.state,
                as: `${pathname}?${newParams.toString()}`,
                url: `${pathname}?${newParams.toString()}`,
            },
            "",
            `${pathname}?${newParams.toString()}`
        );
    };

    return (
        <button onClick={handleClick} className="w-full hover:cursor-pointer">
            TEST BUTTON {dropDownData.label}
        </button>
    );
};
