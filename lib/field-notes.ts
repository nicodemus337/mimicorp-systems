export type FieldNote = {
  id: string;
  recordId: string;
  node: string;
  index: string;
  date: string;
  timestamp: string;
  habitat: string;
  condition: string;
  status: string;
  signal: string;
  metricLabel: string;
  metricValue: string;
  excerpt: string;
  implication: string;
};

export const fieldNotes: FieldNote[] = [
  {
    id: "transect-03",
    recordId: "FN-240317-03",
    node: "Ag Lab + Ecological Archive",
    index: "Transect 03",
    date: "2026-03-17",
    timestamp: "06:14 CST",
    habitat: "North fence line / little bluestem edge",
    condition: "Ground wet / wind low / visibility clear",
    status: "Logged",
    signal: "Dew still holding on the wire. Pollinator traffic begins before the road does.",
    metricLabel: "Canopy humidity",
    metricValue: "81%",
    excerpt:
      "Soil reads dark at first light, but the field is not quiet. The earliest motion is lateral: seed heads passing information to one another before any human arrival can be measured.",
    implication:
      "Design note: moisture retention and pollinator timing should shape how restoration capital is deployed here."
  },
  {
    id: "sample-11",
    recordId: "FN-240317-11",
    node: "Second Cutting + VAPG",
    index: "Sample 11",
    date: "2026-03-17",
    timestamp: "11:42 CST",
    habitat: "South pasture / cutover lane",
    condition: "Heat rising / open cover / recent disturbance",
    status: "Logged",
    signal: "Fresh stubble changes the acoustics. Footsteps sharpen. Wind becomes editorial.",
    metricLabel: "Surface temperature",
    metricValue: "92 F",
    excerpt:
      "After the second pass, the field behaves like an open notebook. Compression marks, clipped stems, and tractor intervals turn labor into a readable score.",
    implication:
      "Funding note: disturbance is measurable, which means intervention can be scoped, budgeted, and evaluated."
  },
  {
    id: "listening-07",
    recordId: "FN-240317-07",
    node: "JoyNet.church",
    index: "Listening 07",
    date: "2026-03-17",
    timestamp: "19:26 CST",
    habitat: "Creek crossing / shade break",
    condition: "Light dropping / insect activity high / water audible",
    status: "Logged",
    signal: "Crickets overtake machinery. Water carries the last intelligible frequencies.",
    metricLabel: "Light remainder",
    metricValue: "14 min",
    excerpt:
      "At dusk the network stops looking infrastructural and starts sounding devotional. What was route, drainage, or utility in daylight turns into chorus after the heat lets go.",
    implication:
      "Partner note: trust increases when collaborators can experience the land as a living system rather than a static asset."
  }
];
