import { useMutation } from '@tanstack/react-query';
import { authService } from '../../services/auth.service';

// Token is attached automatically by the axios interceptor from localStorage
export function useChangePasswordMutation() {
    return useMutation({
        mutationFn: ({ oldPassword, newPassword }: { oldPassword: string; newPassword: string }) =>
            authService.changePassword(oldPassword, newPassword),
    });
}
