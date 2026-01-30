"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

type SettingsContextType = {
    settings: Record<string, string>;
    loading: boolean;
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
    const [settings, setSettings] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSettings = async () => {
            const { data, error } = await supabase
                .from('store_settings')
                .select('*');

            if (!error && data) {
                const settingsMap = data.reduce((acc, curr) => ({
                    ...acc,
                    [curr.key]: curr.value
                }), {});
                setSettings(settingsMap);
            }
            setLoading(false);
        };

        fetchSettings();

        // Subscribe to changes
        const subscription = supabase
            .channel('public:store_settings')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'store_settings' }, () => {
                fetchSettings();
            })
            .subscribe();

        return () => {
            supabase.removeChannel(subscription);
        };
    }, []);

    return (
        <SettingsContext.Provider value={{ settings, loading }}>
            {children}
        </SettingsContext.Provider>
    );
}

export function useSettings() {
    const context = useContext(SettingsContext);
    if (context === undefined) {
        throw new Error('useSettings must be used within a SettingsProvider');
    }
    return context;
}
