export interface TimelineEvent {
  year: string;
  title: string;
  desc: string;
}

export const timelines: TimelineEvent[] = [
  {
    year: "2030",
    title: "Green Cities",
    desc: "The last coal plant goes quiet. Every megacity runs on light, wind and tide.",
  },
  {
    year: "2050",
    title: "Balance with Nature",
    desc: "Waste becomes a design error rather than a fact of life. Cities close their own loops.",
  },
  {
    year: "2100",
    title: "A New Stage",
    desc: "Technology stops imitating nature and starts belonging to it. The seam disappears.",
  },
  {
    year: "2150",
    title: "Interstellar Era",
    desc: "We leave the planet carrying its rules with us — take less, return more, leave it alive.",
  },
];
