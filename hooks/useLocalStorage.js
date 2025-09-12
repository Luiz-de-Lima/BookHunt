import { useState, useEffect } from "react";


export const useLocalStorage = (key, defaultValue, limit) => {
    const [value, setValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (error) {
            console.log(error);
            return defaultValue;
        }
    });

    useEffect(() => {
        try {
            // Aplica o limite de favoritos antes de salvar
            const limitedValue = value.slice(0, limit);
            window.localStorage.setItem(key, JSON.stringify(limitedValue));
        } catch (error) {
            console.log(error);
        }
    }, [key, value, limit]);

    return [value, setValue];
}
