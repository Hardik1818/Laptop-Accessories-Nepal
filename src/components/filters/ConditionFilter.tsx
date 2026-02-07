"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

interface ConditionFilterProps {
    conditions: { label: string; value: string; count: number }[];
    selectedConditions: string[];
    onChange: (condition: string) => void;
}

export function ConditionFilter({
    conditions,
    selectedConditions,
    onChange,
}: ConditionFilterProps) {
    return (
        <div className="space-y-2">
            {conditions.map((option) => (
                <div key={option.value} className="flex items-center space-x-2 w-full">
                    <Checkbox
                        id={`condition-${option.value}`}
                        checked={selectedConditions.includes(option.value)}
                        onCheckedChange={() => onChange(option.value)}
                        className="rounded-sm border-slate-600 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                    />
                    <Label
                        htmlFor={`condition-${option.value}`}
                        className="text-sm font-normal text-slate-300 flex-1 cursor-pointer flex justify-between items-center"
                    >
                        <span>{option.label}</span>
                        <div className="flex items-center gap-2">
                            <Badge variant="outline" className={`text-[10px] px-1.5 py-0 rounded-sm border-slate-700
                    ${option.value === 'new' ? 'text-emerald-400 bg-emerald-950/20' :
                                    option.value === 'refurbished' ? 'text-amber-400 bg-amber-950/20' :
                                        'text-slate-400 bg-slate-800/50'
                                }
                `}>
                                {option.value.toUpperCase()}
                            </Badge>
                            <span className="text-xs text-slate-500">({option.count})</span>
                        </div>
                    </Label>
                </div>
            ))}
        </div>
    );
}
