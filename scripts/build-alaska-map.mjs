import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const input = path.resolve(process.argv[2] || "alaska-precinct-shapes.json");
const output = path.resolve("elections/data/alaska-map.json");
const regions = JSON.parse(await readFile(input, "utf8"));

function decode(value) {
  const deltas = value.split(" ").map(Number);
  const points = [];
  let longitude = 0;
  let latitude = 0;
  for (let index = 0; index < deltas.length; index += 2) {
    longitude += deltas[index];
    latitude += deltas[index + 1];
    if (longitude > 0) longitude -= 360;
    points.push([longitude, latitude]);
  }
  return points;
}

function distance(point, start, end) {
  const dx = end[0] - start[0];
  const dy = end[1] - start[1];
  if (dx === 0 && dy === 0) return Math.hypot(point[0] - start[0], point[1] - start[1]);
  const t = Math.max(0, Math.min(1, ((point[0] - start[0]) * dx + (point[1] - start[1]) * dy) / (dx * dx + dy * dy)));
  return Math.hypot(point[0] - (start[0] + t * dx), point[1] - (start[1] + t * dy));
}

function simplify(points, tolerance = 0.025) {
  if (points.length < 3) return points;
  let furthest = 0;
  let split = 0;
  for (let index = 1; index < points.length - 1; index += 1) {
    const current = distance(points[index], points[0], points.at(-1));
    if (current > furthest) { furthest = current; split = index; }
  }
  if (furthest <= tolerance) return [points[0], points.at(-1)];
  return [...simplify(points.slice(0, split + 1), tolerance).slice(0, -1), ...simplify(points.slice(split), tolerance)];
}

const decoded = regions.map(region => ({
  id: String(region.number),
  polygons: region.coords.map(polygon => polygon.map(pathValue => simplify(decode(pathValue))))
}));
const all = decoded.flatMap(region => region.polygons.flat(2));
const longitudes = all.map(point => point[0]);
const latitudes = all.map(point => point[1]);
const bounds = { minLongitude: Math.min(...longitudes), maxLongitude: Math.max(...longitudes), minLatitude: Math.min(...latitudes), maxLatitude: Math.max(...latitudes) };
await mkdir(path.dirname(output), { recursive: true });
await writeFile(output, JSON.stringify({ source: "Alaska Division of Elections", bounds, regions: decoded }) + "\n");
console.log(`Wrote ${decoded.length} simplified Alaska precinct boundaries.`);
