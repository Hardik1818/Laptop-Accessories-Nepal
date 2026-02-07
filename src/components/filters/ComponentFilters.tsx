"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";
import { useState, useEffect } from "react";
import { ComponentFilters as ComponentFiltersType } from "@/types/filters";

interface ComponentFiltersProps {
    filters: ComponentFiltersType;
    subType?: string;
    onRamTypeChange: (type: string) => void;
    onSsdTypeChange: (type: string) => void;
    onPsuCertChange: (cert: string) => void;
}

export function ComponentFilters({
    filters,
    subType = '',
    onRamTypeChange,
    onSsdTypeChange,
    onPsuCertChange
}: ComponentFiltersProps) {

    // Determine relevant sections based on subType
    // If subType is generic 'component' or empty, show all sections
    const isGeneric = subType.includes('component') || !subType;

    const [openSections, setOpenSections] = useState({
        ram: isGeneric || subType.includes('ram') || subType.includes('memory'),
        ssd: isGeneric || subType.includes('ssd') || subType.includes('storage'),
        psu: isGeneric || subType.includes('psu') || subType.includes('power'),
    });

    // Calculate visibility based on current subType (for rendering)
    const showRam = isGeneric || subType.includes('ram') || subType.includes('memory');
    const showSsd = isGeneric || subType.includes('ssd') || subType.includes('storage');
    const showPsu = isGeneric || subType.includes('psu') || subType.includes('power');

    // Update open sections if subType changes
    useEffect(() => {
        const isGeneric = subType.includes('component') || !subType;
        setOpenSections({
            ram: isGeneric || subType.includes('ram') || subType.includes('memory'),
            ssd: isGeneric || subType.includes('ssd') || subType.includes('storage'),
            psu: isGeneric || subType.includes('psu') || subType.includes('power'),
        });
    }, [subType]);

    const toggleSection = (section: keyof typeof openSections) => {
        setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
    };

    const ramTypes = ['DDR3', 'DDR4', 'DDR5'];
    const ssdTypes = ['SATA', 'NVMe', 'M.2'];
    const psuCerts = ['80+ Bronze', '80+ Silver', '80+ Gold', '80+ Platinum'];

    return (
        <div className="space-y-4 border-t border-slate-800/50 pt-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Component Specs</h3>

            {/* RAM Type */}
            {showRam && (
                <div className="pb-2 border-b border-slate-800/50">
                    <Collapsible open={openSections.ram} onOpenChange={() => toggleSection('ram')}>
                        <div className="flex items-center justify-between w-full mb-2">
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-medium text-slate-300">RAM Type</span>
                                {filters.ramTypes && filters.ramTypes.length > 0 && (
                                    <span className="bg-blue-600 text-[10px] text-white font-bold px-1.5 py-0.5 rounded-full">
                                        {filters.ramTypes.length}
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
                            <div className="grid grid-cols-2 gap-2 pb-2">
                                {ramTypes.map((type) => (
                                    <div key={type} className="flex items-center space-x-2">
                                        <Checkbox
                                            id={`ram-${type}`}
                                            checked={filters.ramTypes?.includes(type)}
                                            onCheckedChange={() => onRamTypeChange(type)}
                                            className="h-3.5 w-3.5 rounded-sm border-slate-600"
                                        />
                                        <Label htmlFor={`ram-${type}`} className="text-xs text-slate-400 cursor-pointer">
                                            {type}
                                        </Label>
                                    </div>
                                ))}
                            </div>
                        </CollapsibleContent>
                    </Collapsible>
                </div>
            )}

            {/* SSD Type */}
            {showSsd && (
                <div className="pb-2 border-b border-slate-800/50">
                    <Collapsible open={openSections.ssd} onOpenChange={() => toggleSection('ssd')}>
                        <div className="flex items-center justify-between w-full mb-2">
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-medium text-slate-300">SSD Interface</span>
                                {filters.ssdTypes && filters.ssdTypes.length > 0 && (
                                    <span className="bg-blue-600 text-[10px] text-white font-bold px-1.5 py-0.5 rounded-full">
                                        {filters.ssdTypes.length}
                                    </span>
                                )}
                            </div>
                            <CollapsibleTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-5 w-5 p-0 hover:bg-slate-800/50 rounded-full">
                                    {openSections.ssd ? <Minus className="h-3 w-3 text-slate-500" /> : <Plus className="h-3 w-3 text-slate-500" />}
                                </Button>
                            </CollapsibleTrigger>
                        </div>
                        <CollapsibleContent>
                            <div className="grid grid-cols-2 gap-2 pb-2">
                                {ssdTypes.map((type) => (
                                    <div key={type} className="flex items-center space-x-2">
                                        <Checkbox
                                            id={`ssd-${type}`}
                                            checked={filters.ssdTypes?.includes(type)}
                                            onCheckedChange={() => onSsdTypeChange(type)}
                                            className="h-3.5 w-3.5 rounded-sm border-slate-600"
                                        />
                                        <Label htmlFor={`ssd-${type}`} className="text-xs text-slate-400 cursor-pointer">
                                            {type}
                                        </Label>
                                    </div>
                                ))}
                            </div>
                        </CollapsibleContent>
                    </Collapsible>
                </div>
            )}

            {/* PSU Certification */}
            {showPsu && (
                <div className="pb-2">
                    <Collapsible open={openSections.psu} onOpenChange={() => toggleSection('psu')}>
                        <div className="flex items-center justify-between w-full mb-2">
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-medium text-slate-300">PSU Rating</span>
                                {filters.psuCertifications && filters.psuCertifications.length > 0 && (
                                    <span className="bg-blue-600 text-[10px] text-white font-bold px-1.5 py-0.5 rounded-full">
                                        {filters.psuCertifications.length}
                                    </span>
                                )}
                            </div>
                            <CollapsibleTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-5 w-5 p-0 hover:bg-slate-800/50 rounded-full">
                                    {openSections.psu ? <Minus className="h-3 w-3 text-slate-500" /> : <Plus className="h-3 w-3 text-slate-500" />}
                                </Button>
                            </CollapsibleTrigger>
                        </div>
                        <CollapsibleContent>
                            <div className="grid grid-cols-1 gap-2 pb-2">
                                {psuCerts.map((cert) => (
                                    <div key={cert} className="flex items-center space-x-2">
                                        <Checkbox
                                            id={`psu-${cert}`}
                                            checked={filters.psuCertifications?.includes(cert)}
                                            onCheckedChange={() => onPsuCertChange(cert)}
                                            className="h-3.5 w-3.5 rounded-sm border-slate-600"
                                        />
                                        <Label htmlFor={`psu-${cert}`} className="text-xs text-slate-400 cursor-pointer">
                                            {cert}
                                        </Label>
                                    </div>
                                ))}
                            </div>
                        </CollapsibleContent>
                    </Collapsible>
                </div>
            )}
        </div>
    );
}
