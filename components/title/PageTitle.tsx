import React from "react";
import ShareComponent from "../share/ShareComponent";

export default function PageTitle({ title, svg }: { title: string; svg?: React.ReactNode }) {
    return (
        <section className="flex w-full items-center justify-between gap-4">
            <div className="flex w-full gap-2">
                <p className="font-medium">{title}</p>
                {svg}
            </div>
            <ShareComponent />
        </section>
    );
}
