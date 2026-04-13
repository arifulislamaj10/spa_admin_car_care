import { useMutation } from '@tanstack/react-query';
import { authService } from '../../services/auth.service';

// No auto-login here — caller decides what to do with the returned tokens
// (forgot-password flow: go to reset-password step using the new access token)
export function useVerifyEmailMutation() {
    return useMutation({
        mutationFn: ({ code, accessToken }: { code: string; accessToken: string }) =>
            authService.verifyEmail(code, accessToken),
    });
}
