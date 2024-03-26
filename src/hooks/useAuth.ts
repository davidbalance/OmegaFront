import { AuthenticationService } from "@/services/authentication.service";
import endpoints from "@/services/endpoints/endpoints";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";

export const useAuth = () => {
    const authService = new AuthenticationService(endpoints.AUTH.V1);

    const router = useRouter();
    const [loading, { open, close }] = useDisclosure();

    const login = async (values: { username: string, password: string, keepmeLogged?: boolean }) => {
        try {
            open();
            await authService.submitLogin(values);
            router.refresh();
        } catch (error) {
            notifications.show({ message: 'Wrong credentials', color: 'red' });
            close();
        }
    }

    const logout = async () => {
        await authService.submitLogout();
        router.refresh();
    }

    return {
        loading,
        login,
        logout
    }
}