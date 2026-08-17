export const site = {
  name: "Immersive Cinematic UI",
  author: "Danylo Hrytsenko",
  live: "https://immersive-cinematic-ui.netlify.app",
  repo: "https://github.com/cloudmenson/Immersive_Cinematic_UI",
  github: "https://github.com/cloudmenson",
} as const;

export const sections = [
  { id: "hero", label: "Start" },
  { id: "nature", label: "Vision" },
  { id: "timeline", label: "Timeline" },
  { id: "energy", label: "Pillars" },
  { id: "craft", label: "Craft" },
  { id: "outro", label: "End" },
] as const;

export type SectionId = (typeof sections)[number]["id"];
