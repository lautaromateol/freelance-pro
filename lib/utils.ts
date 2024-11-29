import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function convertAmountToMilliunits(amount: number) {
  return amount * 1000
}

export function convertAmountFromMilliunits(amount: number) {
  return amount / 1000
}

export function convertToCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount)
}