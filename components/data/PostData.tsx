"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";

export default function PostData({ dataInfo }: { dataInfo?: string }) {
    const dataInfoParsed = dataInfo ? JSON.parse(dataInfo) : null;

    console.log("Data Info Parsed:", dataInfoParsed);

    return (
        <div>
            <Button
                onClick={() =>
                    toast("Data has been uploaded.", {
                        description: "dataInfoParsed",
                        action: {
                            label: "X",
                            onClick: () => console.log("Undo"),
                        },
                    })
                }
            >
                Upload Data
            </Button>
        </div>
    );
}
