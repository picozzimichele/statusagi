import React from "react";
import { Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ShareComponent() {
    return (
        <div className="flex flex-wrap gap-2">
            <Button variant="secondary" size="icon" className="size-8">
                <a
                    href="https://twitter.com/intent/user?screen_name=picomichele"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Twitter />
                </a>
            </Button>
        </div>
    );
}
