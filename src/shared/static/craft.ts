export const stack = [
  "Next.js 15",
  "TypeScript",
  "three.js",
  "GSAP ScrollTrigger",
  "Lenis",
  "Framer Motion",
  "Tailwind CSS v4",
] as const;

export interface CraftMetric {
  label: string;
  from: string;
  to: string;
  note: string;
}

export const metrics: CraftMetric[] = [
  {
    label: "Media payload",
    from: "161 MB",
    to: "9.7 MB",
    note: "A 4K60 backdrop re-encoded to a scrim-appropriate 1080p, plus a 720p cut for phones.",
  },
  {
    label: "3D models",
    from: "26 MB",
    to: "1.9 MB",
    note: "Draco geometry compression, WebP textures, and 71 unused morph targets removed.",
  },
  {
    label: "Web fonts",
    from: "764 KB",
    to: "140 KB",
    note: "Twenty shipped faces cut to the five actually used, converted WOFF to WOFF2.",
  },
  {
    label: "Runtime cost on phones",
    from: "Full WebGL",
    to: "Zero WebGL",
    note: "Capability detection keeps the GPU scene and its models off low-power devices entirely.",
  },
];
