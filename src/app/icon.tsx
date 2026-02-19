import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const alt = 'Laptop Accessories Nepal';
export const size = {
    width: 32,
    height: 32,
};
export const contentType = 'image/png';

export default function Icon() {
    return new ImageResponse(
        (
            <div
                style={{
                    background: '#f97316', // Primary Brand Orange
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '25%', // Matching the NavBar logo rounding
                }}
            >
                {/* Minimalist Laptop Screen */}
                <div
                    style={{
                        width: '16px',
                        height: '11px',
                        border: '2px solid white',
                        borderRadius: '2px',
                        marginBottom: '1px',
                    }}
                />
                {/* Minimalist Laptop Base */}
                <div
                    style={{
                        width: '20px',
                        height: '2px',
                        background: 'white',
                        borderRadius: '1px',
                    }}
                />
            </div>
        ),
        {
            ...size,
        }
    );
}
