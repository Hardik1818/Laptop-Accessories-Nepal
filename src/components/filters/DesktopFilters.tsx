"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";
import { DesktopFilters as DesktopFiltersType } from "@/types/filters";

interface DesktopFiltersProps {
    filters: DesktopFiltersType;
    onCpuChange: (type: string) => void;
    onRamChange: (size: number) => void;
    onGpuChange: (hasGpu: boolean) => void;
}

export function DesktopFilters({
    filters,
    onCpuChange,
    onRamChange,
    onGpuChange
}: DesktopFiltersProps) {
    const [openSections, setOpenSections] = useState({
        cpu: true,
        ram: true,
        gpu: true,
    });

    const toggleSection = (section: keyof typeof openSections) => {
        setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
    };

    const cpuOptions = ['i3', 'i5', 'i7', 'i9', 'ryzen-3', 'ryzen-5', 'ryzen-7', 'ryzen-9'];
    const ramOptions = [4, 8, 16, 32, 64];

    return (
        <div className="space-y-4 border-t border-slate-800/50 pt-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Desktop Specs</h3>

            {/* CPU */}
            <div className="pb-2 border-b border-slate-800/50">
                <Collapsible open={openSections.cpu} onOpenChange={() => toggleSection('cpu')}>
                    <div className="flex items-center justify-between w-full mb-2">
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-medium text-slate-300">CPU</span>
                            {filters.cpuTypes && filters.cpuTypes.length > 0 && (
                                <span className="bg-blue-600 text-[10px] text-white font-bold px-1.5 py-0.5 rounded-full">
                                    {filters.cpuTypes.length}
                                </span>
                            )}
                        </div>
                        <CollapsibleTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-5 w-5 p-0 hover:bg-slate-800/50 rounded-full">
                                {openSections.cpu ? <Minus className="h-3 w-3 text-slate-500" /> : <Plus className="h-3 w-3 text-slate-500" />}
                            </Button>
                        </CollapsibleTrigger>
                    </div>
                    <CollapsibleContent>
                        <div className="grid grid-cols-2 gap-2 pb-2">
                            {cpuOptions.map((cpu) => (
                                <div key={cpu} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={`cpu-${cpu}`}
                                        checked={filters.cpuTypes?.includes(cpu)}
                                        onCheckedChange={() => onCpuChange(cpu)}
                                        className="h-3.5 w-3.5 rounded-sm border-slate-600"
                                    />
                                    <Label htmlFor={`cpu-${cpu}`} className="text-xs text-slate-400 cursor-pointer capitalize">
                                        {cpu.replace('-', ' ')}
                                    </Label>
                                </div>
                            ))}
                        </div>
                    </CollapsibleContent>
                </Collapsible>
            </div>

            {/* RAM */}
            <div className="pb-2 border-b border-slate-800/50">
                <Collapsible open={openSections.ram} onOpenChange={() => toggleSection('ram')}>
                    <div className="flex items-center justify-between w-full mb-2">
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-medium text-slate-300">RAM</span>
                            {filters.ramSizes && filters.ramSizes.length > 0 && (
                                <span className="bg-blue-600 text-[10px] text-white font-bold px-1.5 py-0.5 rounded-full">
                                    {filters.ramSizes.length}
                                </span>
                            )}
                        </div>
                        <CollapsibleTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-5 w-5 p-0 hover:bg-slate-800/50 rounded-full">
                                {openSections.ram ? <Minus className="h-3 w-3 text-slate-500" /> : <Plus className="h-3 w-3 text-slate-500" />}
                            </Button>
                        </CollapsibleTrigger>
                    </div>
                    <CollapsibleContent>
                        <div className="grid grid-cols-3 gap-2 pb-2">
                            {ramOptions.map((size) => (
                                <div key={size} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={`ram-${size}`}
                                        checked={filters.ramSizes?.includes(size)}
                                        onCheckedChange={() => onRamChange(size)}
                                        className="h-3.5 w-3.5 rounded-sm border-slate-600"
                                    />
                                    <Label htmlFor={`ram-${size}`} className="text-xs text-slate-400 cursor-pointer">
                                        {size}GB
                                    </Label>
                                </div>
                            ))}
                        </div>
                    </CollapsibleContent>
                </Collapsible>
            </div>

            {/* GPU */}
            <div className="pb-2">
                <div className="flex items-center space-x-2 py-2">
                    <Checkbox
                        id="has-gpu"
                        checked={filters.hasGPU === true}
                        onCheckedChange={(checked) => onGpuChange(checked as boolean)}
                        className="h-3.5 w-3.5 rounded-sm border-slate-600"
                    />
                    <Label htmlFor="has-gpu" className="text-xs font-medium text-slate-300 cursor-pointer">
                        Dedicated GPU
                    </Label>
                </div>
            </div>
        </div>
    );
}
