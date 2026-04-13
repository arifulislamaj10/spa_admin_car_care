import { useMutation } from '@tanstack/react-query';
import { authService } from '../../services/auth.service';

export function useResetPasswordMutation() {
    return useMutation({
        mutationFn: ({ password, accessToken }: { password: string; accessToken: string }) =>
            authService.resetPassword(password, accessToken),
    });
}
