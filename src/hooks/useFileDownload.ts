'use client'

import { blobFile } from "@/lib/utils/blob-to-file";
import { notifications } from "@mantine/notifications";
import { useCallback, useState } from "react";

export const useFileDownload = (url: string): {
    loading: boolean;
    trigger: (filename: string, body?: Record<string, any>) => Promise<void>;
} => {

    const [loading, setLoading] = useState<boolean>(false);

    const trigger = useCallback(async (filename: string, body?: Record<string, any>): Promise<void> => {
        let newUrl = url;
        if (body) {
            const searchParams = new URLSearchParams();
            Object.entries(body).forEach(([key, value]) => {
                searchParams.append(key, value);
            });
            newUrl = `${newUrl}?${searchParams.toString()}`
        }
        setLoading(true);
        const res = await fetch(newUrl);
        setLoading(false);
        if (!res.ok) {
            const data = await res.json();
            console.error(data);
            notifications.show({ message: 'Something went wrong', color: 'red' });
        }

        const blob = await res.blob();
        blobFile(blob, filename);
    }, [url]);

    return { trigger, loading };

}