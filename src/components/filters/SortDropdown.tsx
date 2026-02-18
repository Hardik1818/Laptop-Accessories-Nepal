"use client";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { SortOption } from "@/types/filters";

interface SortDropdownProps {
    value: SortOption;
    onChange: (value: SortOption) => void;
}

export function SortDropdown({ value, onChange }: SortDropdownProps) {
    return (
        <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-muted-foreground">Sort by:</span>
            <Select value={value} onValueChange={(val) => onChange(val as SortOption)}>
                <SelectTrigger className="w-[180px] h-9 bg-background border-input text-foreground">
                    <SelectValue placeholder="Select sorting" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border text-popover-foreground">
                    <SelectItem value="newest">Newest Arrivals</SelectItem>
                    <SelectItem value="price-asc">Price: Low to High</SelectItem>
                    <SelectItem value="price-desc">Price: High to Low</SelectItem>
                    <SelectItem value="highest-rated">Highest Rated</SelectItem>
                    <SelectItem value="best-selling">Best Selling</SelectItem>
                    <SelectItem value="biggest-discount">Biggest Discount</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
}
