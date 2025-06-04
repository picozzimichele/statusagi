import React from "react";
import Logo from "./logo";
import { ModeToggle } from "@/components/ui/mode-toggle";

export default function Navbar() {
    return (
        <header className="flex justify-between h-10 w-[95%] items-center mx-auto">
            <Logo />
            <ModeToggle />
        </header>
    );
}
