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
        <div className="space-y-1.5">
            {conditions.map((option) => (
                <div
                    key={option.value}
                    className="flex items-center space-x-3 w-full group cursor-pointer hover:bg-muted/30 p-1.5 rounded-md transition-colors"
                    onClick={() => onChange(option.value)}
                >
                    <Checkbox
                        id={`condition-${option.value}`}
                        checked={selectedConditions.includes(option.value)}
                        onCheckedChange={() => { }}
                        className="h-4 w-4 rounded border-input data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                    />
                    <div className="flex-1 flex items-center justify-between min-w-0">
                        <Label
                            htmlFor={`condition-${option.value}`}
                            className="text-xs font-medium text-foreground cursor-pointer capitalize"
                        >
                            {option.label}
                        </Label>
                        <div className="flex items-center gap-2 shrink-0">
                            <Badge variant="outline" className={`text-[9px] px-1.5 py-0 rounded-full border-none font-bold uppercase tracking-tighter
                    ${option.value === 'new' ? 'text-emerald-600 bg-emerald-100' :
                                    option.value === 'refurbished' ? 'text-amber-600 bg-amber-100' :
                                        'text-slate-500 bg-slate-100'
                                }
                `}>
                                {option.value}
                            </Badge>
                            <span className="text-[10px] bg-muted px-1.5 py-0.5 rounded text-muted-foreground">
                                {option.count}
                            </span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
