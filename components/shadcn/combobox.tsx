"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import Link from "next/link";

const frameworks = [
    {
        value: "next.js",
        label: "Next.js",
    },
    {
        value: "sveltekit",
        label: "SvelteKit",
    },
    {
        value: "nuxt.js",
        label: "Nuxt.js",
    },
    {
        value: "remix",
        label: "Remix",
    },
    {
        value: "astro",
        label: "Astro",
    },
];

export function Combobox({
    initialValue,
    dropDownData = frameworks,
    paramCountry,
    href,
}: {
    initialValue: string;
    dropDownData?: { value: string; label: string }[];
    paramCountry?: string;
    href: { [key: string]: string };
}) {
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState(paramCountry || "");

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                >
                    {value
                        ? dropDownData.find((dropDownData) => dropDownData.value === value)?.label
                        : initialValue}
                    <ChevronsUpDown className="opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder={initialValue} className="h-9" />
                    <CommandList>
                        <CommandEmpty>No Country Found.</CommandEmpty>
                        <CommandGroup>
                            {dropDownData.map((dropDownData) => (
                                <CommandItem
                                    key={dropDownData.value}
                                    className="cursor-pointer"
                                    value={dropDownData.value}
                                    onSelect={(currentValue) => {
                                        setValue(currentValue === value ? "" : currentValue);
                                        setOpen(false);
                                    }}
                                >
                                    <Link
                                        className="bg-green-100 w-full"
                                        scroll={false}
                                        href={`?${new URLSearchParams({ country: value })}`}
                                    >
                                        {dropDownData.label}
                                    </Link>

                                    <Check
                                        className={cn(
                                            "ml-auto",
                                            value === dropDownData.value
                                                ? "opacity-100"
                                                : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
