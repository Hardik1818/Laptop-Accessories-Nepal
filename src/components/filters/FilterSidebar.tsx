"use client";

import { useFilters } from "@/hooks/useFilters";
import { ProductFilters, Condition } from "@/types/filters";
import { PriceRangeFilter } from "./PriceRangeFilter";
import { BrandFilter } from "./BrandFilter";
import { ConditionFilter } from "./ConditionFilter";
import { LaptopFilters } from "./LaptopFilters";
import { DesktopFilters } from "./DesktopFilters";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Plus, Minus, RotateCcw } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface FilterSidebarProps {
    initialFilters: ProductFilters;
    priceRange: { min: number; max: number };
    brands: { label: string; value: string; count: number }[];
    conditions: { label: string; value: string; count: number }[];
    className?: string;
    onClearAll?: () => void;
    categoryType?: 'laptop' | 'desktop' | 'component' | 'other';
    subType?: string; // e.g. 'ram', 'ssd', 'psu'
}

export function FilterSidebar({
    initialFilters,
    priceRange,
    brands,
    conditions,
    className,
    onClearAll,
    categoryType,
    subType = '',
}: FilterSidebarProps) {
    const {
        filters,
        setPriceRange,
        toggleBrand,
        toggleCondition,
        toggleProcessorType, // Added
        toggleRamSize, // Added
        toggleStorageType, // Added
        toggleScreenSize, // Added
        toggleDesktopCpuType,
        toggleDesktopRamSize,
        setDesktopHasGpu,
        clearFilters
    } = useFilters(initialFilters);

    const [openSections, setOpenSections] = useState({
        price: true,
        brand: true,
        condition: true,
    });

    const toggleSection = (section: keyof typeof openSections) => {
        setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
    };

    const hasActiveFilters =
        (filters.priceMin !== undefined || filters.priceMax !== undefined) ||
        (filters.brands && filters.brands.length > 0) ||
        (filters.conditions && filters.conditions.length > 0);

    const handleClearAll = () => {
        clearFilters();
        if (onClearAll) onClearAll();
    };

    return (
        <div className={cn("w-full lg:w-64 flex-shrink-0 space-y-6", className)}>
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    Filters
                    {hasActiveFilters && (
                        <Badge variant="secondary" className="h-5 px-1.5 bg-blue-600 text-white text-[10px] rounded-full">
                            {(filters.brands?.length || 0) + (filters.conditions?.length || 0) + (filters.priceMin || filters.priceMax ? 1 : 0)}
                        </Badge>
                    )}
                </h2>
                {hasActiveFilters && (
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-[10px] text-rose-400 hover:text-white hover:bg-rose-500/20 h-6 px-2 gap-1 uppercase font-bold tracking-wider"
                        onClick={handleClearAll}
                    >
                        <RotateCcw className="h-3 w-3" />
                        Reset
                    </Button>
                )}
            </div>

            <div className="space-y-1">
                {/* Price Range */}
                <div className="border-b border-slate-800/50 py-4">
                    <Collapsible open={openSections.price} onOpenChange={() => toggleSection('price')}>
                        <div className="flex items-center justify-between w-full mb-4">
                            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Price Range</span>
                            <CollapsibleTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-6 w-6 p-0 hover:bg-slate-800/50 rounded-full">
                                    {openSections.price ? <Minus className="h-3 w-3 text-slate-500" /> : <Plus className="h-3 w-3 text-slate-500" />}
                                </Button>
                            </CollapsibleTrigger>
                        </div>
                        <CollapsibleContent>
                            <PriceRangeFilter
                                minPrice={priceRange.min}
                                maxPrice={priceRange.max}
                                currentMin={filters.priceMin}
                                currentMax={filters.priceMax}
                                onChange={setPriceRange}
                            />
                        </CollapsibleContent>
                    </Collapsible>
                </div>

                {/* Brand */}
                <div className="border-b border-slate-800/50 py-4">
                    <Collapsible open={openSections.brand} onOpenChange={() => toggleSection('brand')}>
                        <div className="flex items-center justify-between w-full mb-4">
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Brand</span>
                                {filters.brands && filters.brands.length > 0 && (
                                    <span className="bg-blue-600 text-[10px] text-white font-bold px-1.5 py-0.5 rounded-full">
                                        {filters.brands.length}
                                    </span>
                                )}
                            </div>
                            <CollapsibleTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-6 w-6 p-0 hover:bg-slate-800/50 rounded-full">
                                    {openSections.brand ? <Minus className="h-3 w-3 text-slate-500" /> : <Plus className="h-3 w-3 text-slate-500" />}
                                </Button>
                            </CollapsibleTrigger>
                        </div>
                        <CollapsibleContent className="pt-2">
                            <BrandFilter
                                options={brands}
                                selectedBrands={filters.brands || []}
                                onChange={toggleBrand}
                            />
                        </CollapsibleContent>
                    </Collapsible>
                </div>

                {/* Condition */}
                <div className="border-b border-slate-800/50 py-4">
                    <Collapsible open={openSections.condition} onOpenChange={() => toggleSection('condition')}>
                        <div className="flex items-center justify-between w-full mb-4">
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Condition</span>
                                {filters.conditions && filters.conditions.length > 0 && (
                                    <span className="bg-blue-600 text-[10px] text-white font-bold px-1.5 py-0.5 rounded-full">
                                        {filters.conditions.length}
                                    </span>
                                )}
                            </div>
                            <CollapsibleTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-6 w-6 p-0 hover:bg-slate-800/50 rounded-full">
                                    {openSections.condition ? <Minus className="h-3 w-3 text-slate-500" /> : <Plus className="h-3 w-3 text-slate-500" />}
                                </Button>
                            </CollapsibleTrigger>
                        </div>
                        <CollapsibleContent className="pt-2">
                            <ConditionFilter
                                conditions={conditions}
                                selectedConditions={filters.conditions || []}
                                onChange={(c) => toggleCondition(c as Condition)}
                            />
                        </CollapsibleContent>
                    </Collapsible>
                </div>

                {/* Category Specific Filters */}
                {categoryType === 'laptop' && (
                    <div className="border-b border-slate-800/50 py-4">
                        <LaptopFilters
                            filters={filters.laptop || {}}
                            onProcessorChange={toggleProcessorType}
                            onRamChange={toggleRamSize}
                            onStorageChange={toggleStorageType}
                            onScreenChange={toggleScreenSize}
                        />
                    </div>
                )}

                {/* Desktop Filters */}
                {categoryType === 'desktop' && (
                    <div className="border-b border-slate-800/50 py-4">
                        <DesktopFilters
                            filters={filters.desktop || {}}
                            onCpuChange={toggleDesktopCpuType}
                            onRamChange={toggleDesktopRamSize}
                            onGpuChange={setDesktopHasGpu}
                        />
                    </div>
                )}

            </div>
        </div>
    );
}
