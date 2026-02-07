"use client";

import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface PriceRangeFilterProps {
    minPrice: number;
    maxPrice: number;
    currentMin?: number;
    currentMax?: number;
    onChange: (min: number, max: number) => void;
}

export function PriceRangeFilter({
    minPrice,
    maxPrice,
    currentMin,
    currentMax,
    onChange,
}: PriceRangeFilterProps) {
    const [range, setRange] = useState<[number, number]>([
        currentMin ?? minPrice,
        currentMax ?? maxPrice,
    ]);

    // Update internal state when props change
    useEffect(() => {
        setRange([currentMin ?? minPrice, currentMax ?? maxPrice]);
    }, [currentMin, currentMax, minPrice, maxPrice]);

    const handleSliderChange = (value: number[]) => {
        setRange([value[0], value[1]]);
    };

    const handleSliderCommit = (value: number[]) => {
        onChange(value[0], value[1]);
    };

    const handleInputChange = (index: 0 | 1, value: string) => {
        const numValue = parseInt(value.replace(/[^0-9]/g, "")) || 0;
        const newRange = [...range] as [number, number];
        newRange[index] = numValue;
        setRange(newRange);
    };

    const handleInputBlur = () => {
        // Ensure min <= max and within bounds
        let [newMin, newMax] = range;

        if (newMin < minPrice) newMin = minPrice;
        if (newMax > maxPrice) newMax = maxPrice;
        if (newMin > newMax) {
            const temp = newMin;
            newMin = newMax;
            newMax = temp;
        }

        setRange([newMin, newMax]);
        onChange(newMin, newMax);
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <Label className="text-sm font-medium text-slate-200">Price Range</Label>
                <span className="text-xs text-slate-400">
                    NPR {range[0].toLocaleString()} - {range[1].toLocaleString()}
                </span>
            </div>

            <Slider
                defaultValue={[minPrice, maxPrice]}
                value={range}
                min={minPrice}
                max={maxPrice}
                step={100}
                onValueChange={handleSliderChange}
                onValueCommit={handleSliderCommit}
                className="py-4"
            />

            <div className="flex items-center gap-2">
                <div className="relative flex-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-500">NPR</span>
                    <Input
                        type="text"
                        value={range[0]}
                        onChange={(e) => handleInputChange(0, e.target.value)}
                        onBlur={handleInputBlur}
                        className="pl-9 h-8 text-xs bg-slate-900 border-slate-800 focus:border-blue-500"
                    />
                </div>
                <span className="text-slate-500">-</span>
                <div className="relative flex-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-500">NPR</span>
                    <Input
                        type="text"
                        value={range[1]}
                        onChange={(e) => handleInputChange(1, e.target.value)}
                        onBlur={handleInputBlur}
                        className="pl-9 h-8 text-xs bg-slate-900 border-slate-800 focus:border-blue-500"
                    />
                </div>
            </div>
        </div>
    );
}
