export function calculatePercentageChange(x: number, y: number): number {
    if (x === 0) {
        throw new Error("Cannot calculate percentage change from zero.");
    }
    return ((y - x) / x) * 100;
}

export function formatLargeNumber(num: number | string | any, short?: boolean): string {
    if (typeof num === "string") {
        num = parseFloat(num);
    }

    if (num >= 1e12) {
        return (num / 1e12).toFixed(2) + ` ${short ? "T" : "Trillion"}`;
    } else if (num >= 1e9) {
        return (num / 1e9).toFixed(2) + ` ${short ? "B" : "Billion"}`;
    } else if (num >= 1e6) {
        return (num / 1e6).toFixed(2) + ` ${short ? "M" : "Million"}`;
    } else if (num >= 1e3) {
        return (num / 1e3).toFixed(2) + ` ${short ? "K" : "Thousand"}`;
    } else {
        return num.toString();
    }
}
