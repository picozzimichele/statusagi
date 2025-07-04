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
    currentParam,
    selectedParamName,
    href,
}: {
    initialValue: string;
    dropDownData?: { value: string; label: string }[];
    currentParam?: string;
    selectedParamName: string;
    href: { [key: string]: string };
}) {
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState(currentParam || "");

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="flex min-w-[200px] max-w-[400px] justify-between"
                >
                    {value
                        ? dropDownData.find((dropDownData) => dropDownData.value === value)?.label
                        : initialValue}
                    <ChevronsUpDown className="opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] justify-between p-0">
                <Command>
                    <CommandInput placeholder={initialValue} className="h-9" />
                    <CommandList>
                        <CommandEmpty>No Country Found.</CommandEmpty>
                        <CommandGroup>
                            {dropDownData.map((dropDownData) => (
                                <Link
                                    key={dropDownData.value}
                                    className="w-full"
                                    scroll={false}
                                    shallow={true}
                                    href={`?${new URLSearchParams({
                                        ...href,
                                        [selectedParamName || ""]: dropDownData.value,
                                    })}`}
                                >
                                    <CommandItem
                                        className="cursor-pointer"
                                        value={dropDownData.value}
                                        onSelect={(currentValue) => {
                                            setValue(currentValue === value ? "" : currentValue);
                                            setOpen(false);
                                        }}
                                    >
                                        {dropDownData.label}

                                        <Check
                                            className={cn(
                                                "ml-auto",
                                                value === dropDownData.value
                                                    ? "opacity-100"
                                                    : "opacity-0"
                                            )}
                                        />
                                    </CommandItem>
                                </Link>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
