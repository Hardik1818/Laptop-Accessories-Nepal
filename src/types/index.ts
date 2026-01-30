export type Product = {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    stock: number;
    images: string[];
    compatibility?: string;
    warranty?: string;
    created_at?: string;
};

export type Order = {
    id: string;
    customer_name: string;
    phone: string;
    address: string;
    total: number;
    status: 'New' | 'Payment Pending' | 'Proof Uploaded' | 'Confirmed' | 'Delivered' | 'Cancelled';
    payment_method: 'QR' | 'COD';
    proof_url?: string;
    created_at: string;
};
