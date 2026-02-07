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
        <div className="space-y-4 border-t border-slate-800/50 pt-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Laptop Specs</h3>

            {/* Processor */}
            <div className="border-b border-slate-800/50 pb-4">
                <Collapsible open={openSections.processor} onOpenChange={() => toggleSection('processor')}>
                    <div className="flex items-center justify-between w-full mb-2">
                        <span className="text-xs font-medium text-slate-300">Processor</span>
                        <CollapsibleTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-5 w-5 p-0 hover:bg-slate-800/50 rounded-full">
                                {openSections.processor ? <Minus className="h-3 w-3 text-slate-500" /> : <Plus className="h-3 w-3 text-slate-500" />}
                            </Button>
                        </CollapsibleTrigger>
                    </div>
                    <CollapsibleContent>
                        <div className="grid grid-cols-2 gap-2">
                            {processorOptions.map((proc) => (
                                <div key={proc} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={`proc-${proc}`}
                                        checked={filters.processorTypes?.includes(proc as any)}
                                        onCheckedChange={() => onProcessorChange(proc)}
                                        className="h-3.5 w-3.5 rounded-sm border-slate-600"
                                    />
                                    <Label htmlFor={`proc-${proc}`} className="text-xs text-slate-400 cursor-pointer capitalize">
                                        {proc.replace('-', ' ')}
                                        {counts?.processorTypes?.[proc] !== undefined && <span className="text-slate-600 ml-1">({counts.processorTypes[proc]})</span>}
                                    </Label>
                                </div>
                            ))}
                        </div>
                    </CollapsibleContent>
                </Collapsible>
            </div>

            {/* RAM */}
            <div className="border-b border-slate-800/50 pb-4">
                <Collapsible open={openSections.ram} onOpenChange={() => toggleSection('ram')}>
                    <div className="flex items-center justify-between w-full mb-2">
                        <span className="text-xs font-medium text-slate-300">RAM</span>
                        <CollapsibleTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-5 w-5 p-0 hover:bg-slate-800/50 rounded-full">
                                {openSections.ram ? <Minus className="h-3 w-3 text-slate-500" /> : <Plus className="h-3 w-3 text-slate-500" />}
                            </Button>
                        </CollapsibleTrigger>
                    </div>
                    <CollapsibleContent>
                        <div className="grid grid-cols-3 gap-2">
                            {ramOptions.map((ram) => (
                                <div key={ram} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={`ram-${ram}`}
                                        checked={filters.ramSizes?.includes(ram)}
                                        onCheckedChange={() => onRamChange(ram)}
                                        className="h-3.5 w-3.5 rounded-sm border-slate-600"
                                    />
                                    <Label htmlFor={`ram-${ram}`} className="text-xs text-slate-400 cursor-pointer">
                                        {ram}GB
                                    </Label>
                                </div>
                            ))}
                        </div>
                    </CollapsibleContent>
                </Collapsible>
            </div>

            {/* Storage */}
            <div className="border-b border-slate-800/50 pb-4">
                <Collapsible open={openSections.storage} onOpenChange={() => toggleSection('storage')}>
                    <div className="flex items-center justify-between w-full mb-2">
                        <span className="text-xs font-medium text-slate-300">Storage Type</span>
                        <CollapsibleTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-5 w-5 p-0 hover:bg-slate-800/50 rounded-full">
                                {openSections.storage ? <Minus className="h-3 w-3 text-slate-500" /> : <Plus className="h-3 w-3 text-slate-500" />}
                            </Button>
                        </CollapsibleTrigger>
                    </div>
                    <CollapsibleContent>
                        <div className="space-y-1">
                            {storageOptions.map((type) => (
                                <div key={type} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={`storage-${type}`}
                                        checked={filters.storageTypes?.includes(type as any)}
                                        onCheckedChange={() => onStorageChange(type as any)}
                                        className="h-3.5 w-3.5 rounded-sm border-slate-600"
                                    />
                                    <Label htmlFor={`storage-${type}`} className="text-xs text-slate-400 cursor-pointer uppercase">
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
                        <span className="text-xs font-medium text-slate-300">Screen Size</span>
                        <CollapsibleTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-5 w-5 p-0 hover:bg-slate-800/50 rounded-full">
                                {openSections.screen ? <Minus className="h-3 w-3 text-slate-500" /> : <Plus className="h-3 w-3 text-slate-500" />}
                            </Button>
                        </CollapsibleTrigger>
                    </div>
                    <CollapsibleContent>
                        <div className="grid grid-cols-2 gap-2">
                            {screenOptions.map((size) => (
                                <div key={size} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={`screen-${size}`}
                                        checked={filters.screenSizes?.includes(size)}
                                        onCheckedChange={() => onScreenChange(size)}
                                        className="h-3.5 w-3.5 rounded-sm border-slate-600"
                                    />
                                    <Label htmlFor={`screen-${size}`} className="text-xs text-slate-400 cursor-pointer">
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
