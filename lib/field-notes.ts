export type FieldNote = {
  id: string;
  node: string;
  index: string;
  timestamp: string;
  habitat: string;
  signal: string;
  metricLabel: string;
  metricValue: string;
  excerpt: string;
  implication: string;
};

export const fieldNotes: FieldNote[] = [
  {
    id: "transect-03",
    node: "Ag Lab + Ecological Archive",
    index: "Transect 03",
    timestamp: "06:14 CST",
    habitat: "North fence line / little bluestem edge",
    signal: "Dew still holding on the wire. Pollinator traffic begins before the road does.",
    metricLabel: "Canopy humidity",
    metricValue: "81%",
    excerpt:
      "Soil reads dark at first light, but the field is not quiet. The earliest motion is lateral: seed heads passing information to one another before any human arrival can be measured.",
    implication: "Archive note: the network wakes by relay, not by command."
  },
  {
    id: "sample-11",
    node: "Second Cutting + VAPG",
    index: "Sample 11",
    timestamp: "11:42 CST",
    habitat: "South pasture / cutover lane",
    signal: "Fresh stubble changes the acoustics. Footsteps sharpen. Wind becomes editorial.",
    metricLabel: "Surface temperature",
    metricValue: "92 F",
    excerpt:
      "After the second pass, the field behaves like an open notebook. Compression marks, clipped stems, and tractor intervals turn labor into a readable score.",
    implication: "Story note: disturbance here is also annotation."
  },
  {
    id: "listening-07",
    node: "JoyNet.church",
    index: "Listening 07",
    timestamp: "19:26 CST",
    habitat: "Creek crossing / shade break",
    signal: "Crickets overtake machinery. Water carries the last intelligible frequencies.",
    metricLabel: "Light remainder",
    metricValue: "14 min",
    excerpt:
      "At dusk the network stops looking infrastructural and starts sounding devotional. What was route, drainage, or utility in daylight turns into chorus after the heat lets go.",
    implication: "Broadcast note: public feeling enters through changing conditions."
  }
];
