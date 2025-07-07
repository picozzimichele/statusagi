"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { createData, getDataById, migrateData } from "@/lib/actions/data.actions";
import parseLocalJSON from "@/utils/parseLocalJSON";

export default function FetchData({ dataId }: { dataId: string }) {
    const fetchData = async () => {
        const data = await getDataById({ dataId });
        console.log("Data fetched:", data);
    };

    return (
        <div>
            <Button onClick={async () => await fetchData()}>Fetch Data</Button>
        </div>
    );
}
