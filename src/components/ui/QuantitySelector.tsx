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
        <div className="flex items-center bg-muted/30 rounded-xl border border-border p-1 shadow-sm">
            <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 text-muted-foreground hover:bg-white hover:text-primary transition-all rounded-lg"
                onClick={decrease}
                disabled={quantity <= min}
            >
                <Minus className="h-4 w-4" />
            </Button>
            <Input
                type="number"
                value={quantity}
                onChange={handleInputChange}
                className="h-10 w-14 text-center border-none bg-transparent text-foreground font-bold focus-visible:ring-0 text-base"
                min={min}
                max={max}
            />
            <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 text-muted-foreground hover:bg-white hover:text-primary transition-all rounded-lg"
                onClick={increase}
                disabled={max ? quantity >= max : false}
            >
                <Plus className="h-4 w-4" />
            </Button>
        </div>
    );
}

