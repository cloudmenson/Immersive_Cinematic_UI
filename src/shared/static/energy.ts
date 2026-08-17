export interface EnergyCard {
  id: number;
  title: string;
  middleTitle: string;
  video: string;
  poster: string;
  description: string;
}

export const energy: EnergyCard[] = [
  {
    id: 1,
    title: "Power of Nature",
    middleTitle: "Energy of the Future",
    video: "/media/video/card-1.mp4",
    poster: "/media/image/card-1-poster.webp",
    description:
      "Forests and oceans stop being scenery and start being infrastructure. Clean systems draw from the living world without draining it.",
  },
  {
    id: 2,
    title: "Green Cities",
    middleTitle: "Architecture of the Future",
    video: "/media/video/card-2.mp4",
    poster: "/media/image/card-2-poster.webp",
    description:
      "Megacities disappear under gardens and rooftop canopies. Every building breathes, filters and gives back more than it takes.",
  },
  {
    id: 3,
    title: "Harmony with Life",
    middleTitle: "A New Path of Civilization",
    video: "/media/video/card-3.mp4",
    poster: "/media/image/card-3-poster.webp",
    description:
      "Technology and nature stop competing. We learn to measure progress by what survives us, not by what we consume.",
  },
];
