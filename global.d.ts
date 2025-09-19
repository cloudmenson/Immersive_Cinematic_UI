import { ThreeElements } from "@react-three/fiber";

declare module "*.mp4" {
  const src: string;
  export default src;
}
declare module "*.webm" {
  const src: string;
  export default src;
}
declare module "*.glb" {
  const glb: string;
  export default glb;
}
