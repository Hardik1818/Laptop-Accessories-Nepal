import { Product } from "@/types";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface ProductSpecsProps {
    product: Product;
}

export function ProductSpecs({ product }: ProductSpecsProps) {
    const specs = product.specifications || {};

    // Helper to format keys
    const formatKey = (key: string) => {
        return key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    };

    // Helper to categorize specs
    const categorizeSpecs = (specs: any) => {
        const categories: Record<string, Record<string, any>> = {
            "General": {
                "Brand": product.brand,
                "Model": product.name,
                "Condition": product.condition,
                "Warranty": product.warranty,
            },
            "Performance": {},
            "Display": {},
            "Storage": {},
            "Connectivity": {},
            "Features": {},
            "Other": {}
        };

        Object.entries(specs).forEach(([key, value]) => {
            if (!value) return;

            if (key.includes('processor') || key.includes('cpu') || key.includes('ram') || key.includes('gpu') || key.includes('graphics')) {
                categories["Performance"][formatKey(key)] = value;
            } else if (key.includes('screen') || key.includes('display') || key.includes('resolution')) {
                categories["Display"][formatKey(key)] = value;
            } else if (key.includes('storage') || key.includes('ssd') || key.includes('hdd')) {
                categories["Storage"][formatKey(key)] = value;
            } else if (key.includes('wifi') || key.includes('bluetooth') || key.includes('port') || key.includes('usb')) {
                categories["Connectivity"][formatKey(key)] = value;
            } else if (key.includes('keyboard') || key.includes('touch') || key.includes('camera') || key.includes('audio')) {
                categories["Features"][formatKey(key)] = value;
            } else {
                categories["Other"][formatKey(key)] = value;
            }
        });

        // Remove empty categories
        Object.keys(categories).forEach(cat => {
            if (Object.keys(categories[cat]).length === 0) {
                delete categories[cat];
            }
        });

        return categories;
    };

    const categorizedSpecs = categorizeSpecs(specs);

    return (
        <div className="space-y-10">
            {Object.entries(categorizedSpecs).map(([category, items]) => (
                <div key={category} className="border border-border rounded-2xl overflow-hidden shadow-sm bg-white">
                    <div className="bg-muted/40 px-6 py-4 border-b border-border">
                        <h3 className="text-xs font-black text-primary uppercase tracking-[0.2em]">{category} Specifications</h3>
                    </div>
                    <Table>
                        <TableBody>
                            {Object.entries(items).map(([key, value]) => (
                                <TableRow key={key} className="border-b border-border last:border-0 hover:bg-primary/5 transition-colors">
                                    <TableCell className="font-bold text-muted-foreground w-1/3 py-4 pl-6 text-[11px] uppercase tracking-wider">{key}</TableCell>
                                    <TableCell className="text-foreground py-4 pr-6 font-medium">
                                        {typeof value === 'boolean' ? (
                                            value
                                                ? <Badge variant="secondary" className="bg-emerald-50 text-emerald-600 border-emerald-100 rounded-full text-[10px] px-3 font-bold uppercase tracking-wider">Available</Badge>
                                                : <Badge variant="secondary" className="bg-red-50 text-red-600 border-red-100 rounded-full text-[10px] px-3 font-bold uppercase tracking-wider">Not Included</Badge>
                                        ) : (
                                            <span className="text-sm">{value}</span>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            ))}
        </div>
    );
}

