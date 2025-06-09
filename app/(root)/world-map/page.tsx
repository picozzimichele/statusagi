import WorldMapSvg from "@/public/svg/WorldMapSvg";

export default function Page() {
    return (
        <div className="hover:text-green-600">
            <h1>SVG Map</h1>
            <WorldMapSvg />
        </div>
    );
}
