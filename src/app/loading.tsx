

export default function Loading() {
    return (
        <div className="flex flex-1 items-center justify-center min-h-[60vh] w-full">
            <div className="flex flex-col items-center gap-4">
                <div className="relative">
                    <div className="h-16 w-16 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="h-2 w-2 bg-primary rounded-full animate-pulse" />
                    </div>
                </div>
                <p className="text-muted-foreground text-sm font-bold tracking-widest uppercase animate-pulse">
                    Loading
                </p>
            </div>
        </div>
    );
}
