"use client";

import React from "react";
import Logo from "./logo";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { SidebarIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useSidebar } from "@/components/ui/sidebar";

export default function Navbar() {
    const { toggleSidebar } = useSidebar();
    return (
        <header className="sticky top-0 z-50 flex w-full items-center border-b">
            <div className="flex h-(--header-height) w-full items-center gap-2 px-4">
                <Button className="h-8 w-8" variant="ghost" size="icon" onClick={toggleSidebar}>
                    <SidebarIcon />
                </Button>
                <div className="mr-2 rotate-90 flex flex-1 border-[0.5px] border-green-200" />
                <div className="flex justify-between h-10 w-[95%] items-center mx-auto">
                    <Logo />
                    <ModeToggle />
                </div>
            </div>
        </header>
    );
}
