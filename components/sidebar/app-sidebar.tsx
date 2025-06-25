"use client";

import * as React from "react";
import {
    AudioWaveform,
    BookOpen,
    Bot,
    ChevronRight,
    Command,
    Frame,
    GalleryVerticalEnd,
    LifeBuoy,
    Map,
    PieChart,
    Send,
    Settings2,
    SquareTerminal,
} from "lucide-react";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar";
import { NavProjects } from "./nav-projects";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import { Collapsible, CollapsibleTrigger } from "@radix-ui/react-collapsible";
import Link from "next/link";
import { NavSecondary } from "./nav-secondary";

// This is sample data.
const data = {
    user: {
        name: "coming soon",
        email: "statistics@usagi.com",
        avatar: "/images/usagiou.png",
    },
    teams: [
        {
            name: "Acme Inc",
            logo: GalleryVerticalEnd,
            plan: "Enterprise",
        },
        {
            name: "Acme Corp.",
            logo: AudioWaveform,
            plan: "Startup",
        },
        {
            name: "Evil Corp.",
            logo: Command,
            plan: "Free",
        },
    ],
    navMain: [
        {
            title: "Statistics",
            url: "#",
            icon: SquareTerminal,
            isActive: true,
            items: [
                {
                    title: "Unemployment Rate",
                    url: "/unemployment-by-country",
                },
                {
                    title: "Inflation CPI",
                    url: "/inflation-by-country",
                },
                {
                    title: "Government Debt",
                    url: "/government-debt-by-country",
                },
                {
                    title: "M2 Monetary Supply",
                    url: "/m2-monetary-supply",
                },
            ],
        },
    ],
    navSecondary: [
        {
            title: "Support",
            url: "mailto:michele.g.picozzi@gmail.com",
            icon: LifeBuoy,
        },
        {
            title: "Feedback",
            url: "mailto:michele.g.picozzi@gmail.com",
            icon: Send,
        },
    ],
    projects: [
        {
            name: "Design Engineering",
            url: "#",
            icon: Frame,
        },
        {
            name: "Sales & Marketing",
            url: "#",
            icon: PieChart,
        },
        {
            name: "Travel",
            url: "#",
            icon: Map,
        },
    ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar {...props}>
            <SidebarHeader>{/* <TeamSwitcher teams={data.teams} /> */}</SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
                <NavSecondary items={data.navSecondary} className="mt-auto" />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
