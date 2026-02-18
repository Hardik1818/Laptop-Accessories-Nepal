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
        <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mr-1">Active Filters:</span>

            {activeFilters.map((filter) => (
                <Badge
                    key={`${filter.key}-${filter.value}`}
                    variant="secondary"
                    className="h-7 pl-3 pr-1.5 gap-2 bg-primary/5 text-primary hover:bg-primary/10 border border-primary/20 transition-all rounded-full"
                >
                    <span className="text-[10px] font-bold uppercase tracking-tight">
                        {filter.label}: <span className="text-foreground normal-case font-medium">{filter.displayValue}</span>
                    </span>
                    <button
                        onClick={() => removeSpecificFilter(filter.key, filter.value)}
                        className="h-4 w-4 flex items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all ml-1"
                    >
                        <X className="h-2.5 w-2.5" />
                    </button>
                </Badge>
            ))}

            {activeCount > 1 && (
                <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 px-3 text-[10px] text-destructive hover:text-destructive-foreground hover:bg-destructive uppercase font-bold tracking-wider rounded-full ml-1"
                    onClick={clearFilters}
                >
                    Clear All
                </Button>
            )}
        </div>
    );
}
