"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { replaceData } from "@/lib/actions/data.actions";

export default function ReplaceData({
    dataInfo,
    dataId,
    disabled,
}: {
    dataInfo: string;
    dataId: string;
    disabled?: boolean;
}) {
    const dataInfoParsed = dataInfo ? JSON.parse(dataInfo) : null;

    const callReplaceData = async () => {
        if (!dataInfoParsed) {
            toast.error("No data to replace.");
            return;
        }

        try {
            console.log("Data replaced:", dataInfoParsed);
            // Call the server action to upload data
            const replaceDataReturn = await replaceData({
                dataId: dataId,
                newData: { entries: dataInfoParsed },
            });

            toast.success("Data replaced successfully!", {
                description: `Data ID: ${dataId}`,
            });
        } catch (error) {
            console.error("Error replacing data:", error);
            toast.error("Failed to replace data.");
        }
    };

    return (
        <div>
            <Button disabled={disabled} onClick={callReplaceData}>
                Replace Data
            </Button>
        </div>
    );
}
