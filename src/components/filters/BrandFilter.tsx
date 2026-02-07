"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface BrandFilterProps {
    options: { label: string; value: string; count: number }[];
    selectedBrands: string[];
    onChange: (brand: string) => void;
}

export function BrandFilter({
    options,
    selectedBrands,
    onChange,
}: BrandFilterProps) {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredOptions = options.filter((option) =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-4">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
                <Input
                    placeholder="Search brands..."
                    className="pl-8 h-8 text-xs bg-slate-900 border-slate-800 focus:border-blue-500 rounded-lg"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <ScrollArea className="h-48 pr-2">
                <div className="space-y-2">
                    {filteredOptions.length > 0 ? (
                        filteredOptions.map((option) => (
                            <div key={option.value} className="flex items-center space-x-2">
                                <Checkbox
                                    id={`brand-${option.value}`}
                                    checked={selectedBrands.includes(option.value)}
                                    onCheckedChange={() => onChange(option.value)}
                                    className="rounded-sm border-slate-600 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                                />
                                <Label
                                    htmlFor={`brand-${option.value}`}
                                    className="text-sm font-normal text-slate-300 flex-1 cursor-pointer flex justify-between"
                                >
                                    <span className="truncate">{option.label}</span>
                                    <span className="text-xs text-slate-500 ml-2">({option.count})</span>
                                </Label>
                            </div>
                        ))
                    ) : (
                        <div className="text-xs text-slate-500 text-center py-4">
                            No brands found matching "{searchTerm}"
                        </div>
                    )}
                </div>
            </ScrollArea>
        </div>
    );
}
