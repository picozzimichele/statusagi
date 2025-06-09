import fs from "fs";
import { load } from "cheerio";

// Load the SVG file
const svgPath = "../../public/svg/WorldMapSvgTest.svg"; // Adjust the path as necessary
const svgContent = fs.readFileSync(svgPath, "utf8");

// Load SVG into cheerio
const $ = load(svgContent, { xmlMode: true });

// Find all <g> elements with an id
$("g[id]").each((_, gElem) => {
    const groupId = $(gElem).attr("id");

    // Find all <path> children that don't have an id
    $(gElem)
        .find("path")
        .each((_, pathElem) => {
            if (!$(pathElem).attr("id")) {
                $(pathElem).attr("id", groupId);
            }
        });
});

// Write the modified SVG back to a file
fs.writeFileSync("./world.updated.svg", $.xml());

console.log("✅ Done! Paths inside <g> elements now have matching IDs if missing.");
