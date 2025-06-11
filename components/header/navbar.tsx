"use client";

import React from "react";
import Logo from "./logo";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { SidebarIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useSidebar } from "@/components/ui/sidebar";

export default function Navbar() {
    const { toggleSidebar } = useSidebar();
    return (
        <header className="sticky top-0 z-50 flex w-full items-center border-b bg-background">
            <div className="flex h-12 w-full items-center gap-2 px-4">
                <Button className="h-8 w-8" variant="ghost" size="icon" onClick={toggleSidebar}>
                    <SidebarIcon />
                </Button>
                <div className="flex h-12 p-2 border-l" />
                <div className="flex justify-between h-10 w-[95%] items-center mx-auto">
                    <Logo />

                    <ModeToggle />
                </div>
            </div>
        </header>
    );
}
