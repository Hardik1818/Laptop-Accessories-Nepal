"use client";

import { useFilters } from "@/hooks/useFilters";
import { SortDropdown } from "./SortDropdown";

export function ProductSort() {
    const { filters, setSortBy } = useFilters();

    return (
        <SortDropdown
            value={filters.sortBy || 'newest'}
            onChange={setSortBy}
        />
    );
}
