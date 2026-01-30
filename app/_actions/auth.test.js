import { describe, it, expect, vi, beforeEach } from 'vitest';
import { refreshUserAccessToken } from './auth';
import { cookies } from 'next/headers';
import { jwtVerify, SignJWT } from 'jose';

vi.mock('next/headers', () => ({
    cookies: vi.fn(),
}));

vi.mock('jose', () => ({
    jwtVerify: vi.fn(),
    SignJWT: vi.fn().mockReturnValue({
        setProtectedHeader: vi.fn().mockReturnThis(),
        setIssuedAt: vi.fn().mockReturnThis(),
        setExpirationTime: vi.fn().mockReturnThis(),
        sign: vi.fn().mockResolvedValue('mocked_encrypted_token'),
    }),
}));

vi.mock('posthog-js', () => ({
    default: {
        captureException: vi.fn(),
        capture: vi.fn(),
    },
}));

vi.mock('@/app/_lib/utils', () => ({
    Log: vi.fn(),
}));

describe('refreshUserAccessToken', () => {
    let mockCookieStore;

    beforeEach(() => {
        vi.clearAllMocks();
        mockCookieStore = {
            get: vi.fn(),
            set: vi.fn(),
        };
        cookies.mockReturnValue(Promise.resolve(mockCookieStore));
    });

    it('should return success if access token is still valid', async () => {
        const encryptedAccessToken = 'encrypted_access_token';
        
        mockCookieStore.get.mockImplementation((name) => {
            if (name === 'access_token') return { value: encryptedAccessToken };
            return null;
        });
        
        jwtVerify.mockResolvedValue({ payload: { value: 'valid_access_token' } });

        const result = await refreshUserAccessToken();

        expect(result.success).toBe(true);
        expect(result.message).toBe('Access token is still valid');
        expect(mockCookieStore.set).not.toHaveBeenCalled();
    });

    it('should refresh token if access token is invalid or expired', async () => {
        const encryptedAccessToken = 'expired_access_token';
        const encryptedRefreshToken = 'encrypted_refresh_token';
        
        mockCookieStore.get.mockImplementation((name) => {
            if (name === 'access_token') return { value: encryptedAccessToken };
            if (name === 'refresh_token') return { value: encryptedRefreshToken };
            return null;
        });

        // First call to jwtVerify (access token) fails, second (refresh token) succeeds
        jwtVerify
            .mockRejectedValueOnce(new Error('JWT expired'))
            .mockResolvedValueOnce({ payload: { value: 'decrypted_refresh_token' } });

        global.fetch = vi.fn().mockResolvedValue({
            ok: true,
            json: () => Promise.resolve({
                access: 'new_access_token',
                refresh: 'new_refresh_token'
            }),
        });

        const result = await refreshUserAccessToken();

        expect(result.success).toBe(true);
        expect(global.fetch).toHaveBeenCalled();
        expect(mockCookieStore.set).toHaveBeenCalledTimes(2);
        expect(mockCookieStore.set).toHaveBeenCalledWith(expect.objectContaining({ name: 'access_token' }));
        expect(mockCookieStore.set).toHaveBeenCalledWith(expect.objectContaining({ name: 'refresh_token' }));
    });
});
