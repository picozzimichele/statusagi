"use client";

import { useEffect, useState } from "react";

// If you have eslint installed, you should see a missing dependency warning for the useEffect hook
// React Hook useEffect has a missing dependency: 'count'. Either include it or remove the dependency array.eslintreact-hooks/exhaustive-deps

export default function EslintTest() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (count) {
            console.log("Count has been triggered!");
        }
    }, []);

    return <div>TEST</div>;
}
