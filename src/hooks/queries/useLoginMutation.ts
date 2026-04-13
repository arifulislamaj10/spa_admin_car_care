import { useMutation } from '@tanstack/react-query';
import { authService, type LoginPayload } from '../../services/auth.service';
import { useAuthStore } from '../../store/useAuthStore';
import { mapRole } from '../../lib/mapRole';

export function useLoginMutation() {
    const { login } = useAuthStore();

    return useMutation({
        mutationFn: (payload: LoginPayload) => authService.login(payload),
        onSuccess: (response) => {
            const { user, tokens } = response.data.attributes;

            // Persist tokens to localStorage (api.ts interceptor reads these)
            localStorage.setItem('access_token', tokens.access.token);
            localStorage.setItem('refresh_token', tokens.refresh.token);

            const [firstName, ...rest] = user.fullName.split(' ');
            const lastName = rest.join(' ');

            login(
                {
                    id: user.id,
                    email: user.email,
                    firstName,
                    lastName,
                    role: mapRole(user.role),
                    avatar: user.image,
                    lastLogin: new Date().toISOString(),
                },
                tokens.access.token,
                tokens.refresh.token,
            );
        },
    });
}
