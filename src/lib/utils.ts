import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatYear(year: number) {
  return year ? `${year}` : "";
}

export function cleanPhone(phone: string) {
  return phone.replace(/[^\d+]/g, "");
}
