import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";

interface QuantitySelectorProps {
    quantity: number;
    setQuantity: (qty: number) => void;
    min?: number;
    max?: number;
}

export function QuantitySelector({ quantity, setQuantity, min = 1, max = 99 }: QuantitySelectorProps) {
    const decrease = () => {
        if (quantity > min) setQuantity(quantity - 1);
    };

    const increase = () => {
        if (quantity < max) setQuantity(quantity + 1);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        if (!isNaN(value)) {
            if (value < min) setQuantity(min);
            else if (value > max) setQuantity(max);
            else setQuantity(value);
        }
    };

    return (
        <div className="flex items-center space-x-2">
            <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-white"
                onClick={decrease}
                disabled={quantity <= min}
            >
                <Minus className="h-4 w-4" />
            </Button>
            <Input
                type="number"
                value={quantity}
                onChange={handleInputChange}
                className="h-10 w-16 text-center bg-slate-900 border-slate-700 text-slate-100 focus-visible:ring-blue-500"
                min={min}
                max={max}
            />
            <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-white"
                onClick={increase}
                disabled={max ? quantity >= max : false}
            >
                <Plus className="h-4 w-4" />
            </Button>
        </div>
    );
}
