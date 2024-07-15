import { useState, useCallback } from "react";

export const useSearchFilter = (initialValue = "") => {
    const [value, setValue] = useState<string>(initialValue);
    const handleChange = useCallback(({ target }: React.ChangeEvent<HTMLInputElement>) => {
        setValue(target.value);
    }, []);
    const clear = useCallback(() => setValue(""), []);

    return { value, handleChange, clear };
};