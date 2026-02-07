"use client";

import { useFilters } from "@/hooks/useFilters";
import { ProductFilters } from "@/types/filters";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface ActiveFiltersProps {
    filters: ProductFilters; // We pass filters prop but use hook's remove function
}

export function ActiveFilters({ filters: initialFilters }: ActiveFiltersProps) {
    const {
        filters, // Use internal hook state which syncs with URL
        removeSpecificFilter,
        clearFilters,
        activeFilters,
        activeCount
    } = useFilters(initialFilters);

    if (activeCount === 0) return null;

    return (
        <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1">Active:</span>

            {activeFilters.map((filter) => (
                <Badge
                    key={`${filter.key}-${filter.value}`}
                    variant="secondary"
                    className="h-6 pl-2 pr-1 gap-1 bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700 transition-colors"
                >
                    <span className="text-[10px] font-medium">{filter.label}: <span className="text-white">{filter.displayValue}</span></span>
                    <button
                        onClick={() => removeSpecificFilter(filter.key, filter.value)}
                        className="h-4 w-4 flex items-center justify-center rounded-full hover:bg-slate-600 text-slate-400 hover:text-white transition-colors ml-1"
                    >
                        <X className="h-3 w-3" />
                    </button>
                </Badge>
            ))}

            {activeCount > 1 && (
                <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 px-2 text-[10px] text-rose-400 hover:text-white hover:bg-rose-500/20 uppercase font-bold tracking-wider rounded-full ml-1"
                    onClick={clearFilters}
                >
                    Clear All
                </Button>
            )}
        </div>
    );
}
