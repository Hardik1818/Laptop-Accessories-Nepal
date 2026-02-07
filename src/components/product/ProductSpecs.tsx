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
        <div className="space-y-8">
            {Object.entries(categorizedSpecs).map(([category, items]) => (
                <div key={category} className="border border-slate-800 rounded-lg overflow-hidden">
                    <div className="bg-slate-900 px-4 py-3 border-b border-slate-800">
                        <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider">{category} Specification</h3>
                    </div>
                    <Table>
                        <TableBody>
                            {Object.entries(items).map(([key, value]) => (
                                <TableRow key={key} className="border-b border-slate-800/50 hover:bg-slate-800/20">
                                    <TableCell className="font-medium text-slate-400 w-1/3 py-3 pl-4">{key}</TableCell>
                                    <TableCell className="text-slate-200 py-3 pr-4">
                                        {typeof value === 'boolean' ? (
                                            value ? <Badge variant="secondary" className="bg-green-500/10 text-green-400 border-0">Yes</Badge> : <Badge variant="secondary" className="bg-red-500/10 text-red-400 border-0">No</Badge>
                                        ) : (
                                            value
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
