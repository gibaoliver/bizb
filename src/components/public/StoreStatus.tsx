'use client';

import { OperatingHours } from "@/types";
import { isStoreOpen } from "@/lib/utils";
import { Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface StoreStatusProps {
  hours: OperatingHours[];
}

export function StoreStatus({ hours }: StoreStatusProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setIsOpen(isStoreOpen(hours));
    setMounted(true);
    
    // Atualizar a cada minuto
    const interval = setInterval(() => {
      setIsOpen(isStoreOpen(hours));
    }, 60000);

    return () => clearInterval(interval);
  }, [hours]);

  if (!mounted) return null;

  return (
    <div className={cn(
      "flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium border",
      isOpen 
        ? "bg-emerald-50 text-emerald-700 border-emerald-200" 
        : "bg-red-50 text-red-700 border-red-200"
    )}>
      <Clock className="w-4 h-4" />
      <span>{isOpen ? "Aberto Agora" : "Fechado"}</span>
    </div>
  );
}
