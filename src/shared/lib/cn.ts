import { clsx } from "clsx";
import { type ClassValue } from "clsx";

export const cn = (...c: ClassValue[]) => clsx(...c);
