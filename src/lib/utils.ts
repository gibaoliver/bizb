import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { OperatingHours } from "@/types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isStoreOpen(hours: OperatingHours[]): boolean {
  if (!hours || hours.length === 0) return false;

  const now = new Date();
  const currentDay = now.getDay(); // 0 is Sunday, 6 is Saturday
  
  const todayHours = hours.find(h => h.day_of_week === currentDay);
  if (!todayHours || todayHours.is_closed) return false;

  const currentTime = now.toLocaleTimeString('pt-BR', { hour12: false, hour: '2-digit', minute: '2-digit' });
  
  return currentTime >= todayHours.open_time && currentTime <= todayHours.close_time;
}

export function generateWhatsAppLink(phone: string, text: string): string {
  const cleanPhone = phone.replace(/\D/g, '');
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
}
