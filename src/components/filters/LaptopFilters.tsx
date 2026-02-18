"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";
import { LaptopFilters as LaptopFiltersType } from "@/types/filters";

interface LaptopFiltersProps {
    filters: LaptopFiltersType; // Active filters
    counts?: { // Optional counts for each option
        processorTypes?: Record<string, number>;
        ramSizes?: Record<number, number>;
        storageTypes?: Record<string, number>;
        screenSizes?: Record<number, number>;
    };
    onProcessorChange: (type: string) => void;
    onRamChange: (size: number) => void;
    onStorageChange: (type: 'ssd' | 'hdd' | 'both') => void;
    onScreenChange: (size: number) => void;
}

export function LaptopFilters({
    filters,
    counts,
    onProcessorChange,
    onRamChange,
    onStorageChange,
    onScreenChange,
}: LaptopFiltersProps) {
    const [openSections, setOpenSections] = useState({
        processor: true,
        ram: true,
        storage: false,
        screen: false,
    });

    const toggleSection = (section: keyof typeof openSections) => {
        setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
    };

    const processorOptions = ['i3', 'i5', 'i7', 'i9', 'ryzen-3', 'ryzen-5', 'ryzen-7', 'ryzen-9'];
    const ramOptions = [4, 8, 16, 32, 64];
    const storageOptions = ['ssd', 'hdd', 'both'];
    const screenOptions = [13, 14, 15.6, 17];

    return (
        <div className="space-y-4 border-t border-border pt-4">
            <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2 px-1">Laptop Specifications</h3>

            {/* Processor */}
            <div className="border-b border-border pb-4">
                <Collapsible open={openSections.processor} onOpenChange={() => toggleSection('processor')}>
                    <div className="flex items-center justify-between w-full mb-2">
                        <span className="text-xs font-bold text-foreground">Processor</span>
                        <CollapsibleTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-6 w-6 p-0 hover:bg-muted rounded-full">
                                {openSections.processor ? <Minus className="h-3 w-3 text-muted-foreground" /> : <Plus className="h-3 w-3 text-muted-foreground" />}
                            </Button>
                        </CollapsibleTrigger>
                    </div>
                    <CollapsibleContent>
                        <div className="grid grid-cols-2 gap-2">
                            {processorOptions.map((proc) => (
                                <div key={proc} className="flex items-center space-x-2 group cursor-pointer" onClick={() => onProcessorChange(proc)}>
                                    <Checkbox
                                        id={`proc-${proc}`}
                                        checked={filters.processorTypes?.includes(proc as any)}
                                        onCheckedChange={() => { }}
                                        className="h-3.5 w-3.5 rounded-sm border-input data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                                    />
                                    <Label htmlFor={`proc-${proc}`} className="text-xs text-muted-foreground group-hover:text-foreground cursor-pointer capitalize">
                                        {proc.replace('-', ' ')}
                                        {counts?.processorTypes?.[proc] !== undefined && <span className="text-primary font-bold ml-1 text-[10px]">({counts.processorTypes[proc]})</span>}
                                    </Label>
                                </div>
                            ))}
                        </div>
                    </CollapsibleContent>
                </Collapsible>
            </div>

            {/* RAM */}
            <div className="border-b border-border pb-4">
                <Collapsible open={openSections.ram} onOpenChange={() => toggleSection('ram')}>
                    <div className="flex items-center justify-between w-full mb-2">
                        <span className="text-xs font-bold text-foreground">RAM Capacity</span>
                        <CollapsibleTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-6 w-6 p-0 hover:bg-muted rounded-full">
                                {openSections.ram ? <Minus className="h-3 w-3 text-muted-foreground" /> : <Plus className="h-3 w-3 text-muted-foreground" />}
                            </Button>
                        </CollapsibleTrigger>
                    </div>
                    <CollapsibleContent>
                        <div className="grid grid-cols-3 gap-2">
                            {ramOptions.map((ram) => (
                                <div key={ram} className="flex items-center space-x-2 group cursor-pointer" onClick={() => onRamChange(ram)}>
                                    <Checkbox
                                        id={`ram-${ram}`}
                                        checked={filters.ramSizes?.includes(ram)}
                                        onCheckedChange={() => { }}
                                        className="h-3.5 w-3.5 rounded-sm border-input data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                                    />
                                    <Label htmlFor={`ram-${ram}`} className="text-xs text-muted-foreground group-hover:text-foreground cursor-pointer">
                                        {ram}GB
                                    </Label>
                                </div>
                            ))}
                        </div>
                    </CollapsibleContent>
                </Collapsible>
            </div>

            {/* Storage */}
            <div className="border-b border-border pb-4">
                <Collapsible open={openSections.storage} onOpenChange={() => toggleSection('storage')}>
                    <div className="flex items-center justify-between w-full mb-2">
                        <span className="text-xs font-bold text-foreground">Storage Type</span>
                        <CollapsibleTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-6 w-6 p-0 hover:bg-muted rounded-full">
                                {openSections.storage ? <Minus className="h-3 w-3 text-muted-foreground" /> : <Plus className="h-3 w-3 text-muted-foreground" />}
                            </Button>
                        </CollapsibleTrigger>
                    </div>
                    <CollapsibleContent>
                        <div className="space-y-1.5">
                            {storageOptions.map((type) => (
                                <div key={type} className="flex items-center space-x-2 group cursor-pointer" onClick={() => onStorageChange(type as any)}>
                                    <Checkbox
                                        id={`storage-${type}`}
                                        checked={filters.storageTypes?.includes(type as any)}
                                        onCheckedChange={() => { }}
                                        className="h-3.5 w-3.5 rounded-sm border-input data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                                    />
                                    <Label htmlFor={`storage-${type}`} className="text-xs text-muted-foreground group-hover:text-foreground cursor-pointer uppercase">
                                        {type}
                                    </Label>
                                </div>
                            ))}
                        </div>
                    </CollapsibleContent>
                </Collapsible>
            </div>

            {/* Screen */}
            <div className="pb-2">
                <Collapsible open={openSections.screen} onOpenChange={() => toggleSection('screen')}>
                    <div className="flex items-center justify-between w-full mb-2">
                        <span className="text-xs font-bold text-foreground">Display Size</span>
                        <CollapsibleTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-6 w-6 p-0 hover:bg-muted rounded-full">
                                {openSections.screen ? <Minus className="h-3 w-3 text-muted-foreground" /> : <Plus className="h-3 w-3 text-muted-foreground" />}
                            </Button>
                        </CollapsibleTrigger>
                    </div>
                    <CollapsibleContent>
                        <div className="grid grid-cols-2 gap-2">
                            {screenOptions.map((size) => (
                                <div key={size} className="flex items-center space-x-2 group cursor-pointer" onClick={() => onScreenChange(size)}>
                                    <Checkbox
                                        id={`screen-${size}`}
                                        checked={filters.screenSizes?.includes(size)}
                                        onCheckedChange={() => { }}
                                        className="h-3.5 w-3.5 rounded-sm border-input data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                                    />
                                    <Label htmlFor={`screen-${size}`} className="text-xs text-muted-foreground group-hover:text-foreground cursor-pointer">
                                        {size}"
                                    </Label>
                                </div>
                            ))}
                        </div>
                    </CollapsibleContent>
                </Collapsible>
            </div>

        </div>
    );
}
