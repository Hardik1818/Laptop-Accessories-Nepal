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
            <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                    placeholder="Search brands..."
                    className="pl-9 h-9 text-xs bg-muted/20 border-border focus-visible:ring-primary/20 rounded-lg transition-all"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <ScrollArea className="h-48 pr-2">
                <div className="space-y-1.5">
                    {filteredOptions.length > 0 ? (
                        filteredOptions.map((option) => (
                            <div key={option.value} className="flex items-center space-x-3 group cursor-pointer hover:bg-muted/30 p-1.5 rounded-md transition-colors" onClick={() => onChange(option.value)}>
                                <Checkbox
                                    id={`brand-${option.value}`}
                                    checked={selectedBrands.includes(option.value)}
                                    onCheckedChange={() => { }} // Handled by div click for better UX
                                    className="h-4 w-4 rounded border-input data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                                />
                                <Label
                                    htmlFor={`brand-${option.value}`}
                                    className="text-xs font-medium text-foreground flex-1 cursor-pointer flex justify-between items-center"
                                >
                                    <span>{option.label}</span>
                                    <span className="text-[10px] bg-muted px-1.5 py-0.5 rounded text-muted-foreground">
                                        {option.count}
                                    </span>
                                </Label>
                            </div>
                        ))
                    ) : (
                        <div className="text-xs text-muted-foreground text-center py-8 bg-muted/10 rounded-lg border border-dashed border-border">
                            No brands found
                        </div>
                    )}
                </div>
            </ScrollArea>
        </div>
    );
}
