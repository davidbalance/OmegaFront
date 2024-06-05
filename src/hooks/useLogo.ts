import { useLocalStorage } from "@mantine/hooks";

const LOGO_KEY = process.env.NEXT_PUBLIC_LOGO_KEY || 'LOGO-KEY';
const DEFAULT_LOGO = 'omega';

const useLogo = (): [string, (val: string) => void, () => void] => {
    const [storedLogo, setStoredLogo, removeStoredLogo] = useLocalStorage({
        key: LOGO_KEY,
        defaultValue: DEFAULT_LOGO
    });

    const setLogo = (logo: string) => {
        try {
            setStoredLogo(logo);
        } catch (error) {
            console.error(error);
        }
        setStoredLogo(logo);
    }

    const removeLogo = () => {
        try {
            removeStoredLogo();
        } catch (error) {
            console.error(error);
        }
        setLogo('');
    }

    return [storedLogo, setLogo, removeLogo];
}

export { useLogo };