import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const input = path.resolve(process.argv[2] || "louisiana-parishes-topology.json");
const output = path.resolve("elections/data/louisiana-map.json");
const topology = JSON.parse((await readFile(input, "utf8")).replace(/^\uFEFF/, ""));
const { scale = [1, 1], translate = [0, 0] } = topology.transform || {};

const arcs = topology.arcs.map(arc => {
  let x = 0; let y = 0;
  return arc.map(delta => {
    x += delta[0]; y += delta[1];
    return [x * scale[0] + translate[0], y * scale[1] + translate[1]];
  });
});
function resolveArc(index) {
  const points = arcs[index < 0 ? ~index : index];
  return index < 0 ? [...points].reverse() : points;
}
function resolveRing(indices) {
  return indices.flatMap((index, position) => resolveArc(index).slice(position ? 1 : 0));
}
const geometries = topology.objects.collection.geometries;
const regions = geometries.map(geometry => ({
  id: String(geometry.id).padStart(2, "0"),
  name: geometry.properties?.name,
  polygons: geometry.type === "MultiPolygon"
    ? geometry.arcs.map(polygon => polygon.map(resolveRing))
    : [geometry.arcs.map(resolveRing)]
}));
const all = regions.flatMap(region => region.polygons.flat(2));
const longitudes = all.map(point => point[0]);
const latitudes = all.map(point => point[1]);
const bounds = { minLongitude: Math.min(...longitudes), maxLongitude: Math.max(...longitudes), minLatitude: Math.min(...latitudes), maxLatitude: Math.max(...latitudes) };
await mkdir(path.dirname(output), { recursive: true });
await writeFile(output, JSON.stringify({ source: "Louisiana Secretary of State", bounds, regions }) + "\n");
console.log(`Wrote ${regions.length} Louisiana parish boundaries.`);
