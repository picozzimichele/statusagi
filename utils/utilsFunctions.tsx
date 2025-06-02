export function calculatePercentageChange(x: number, y: number): number {
    if (x === 0) {
        throw new Error("Cannot calculate percentage change from zero.");
    }
    return ((y - x) / x) * 100;
}
