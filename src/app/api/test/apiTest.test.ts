import { mockApi } from "../../../app/api/test/mockApi";
import { fetchWithoutToken, fetchWithToken } from "../../../app/api/fetch/fetch";
import AuthUtils from "../../../app/func/common/auth.utills";

// Mock the global fetch function
global.fetch = jest.fn();

// Mock AuthUtils
jest.mock("../../../app/func/common/auth.utills", () => ({
    setToken: jest.fn(),
    getToken: jest.fn(),
}));

describe('Login, Protected Data Fetch, and Token Refresh Test', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        // Reset the isRefreshing flag before each test
        (fetchWithToken as any).isRefreshing = false;
    });

    it('should login, fetch protected data, and refresh token when needed', async () => {
        // Mock successful login
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => mockApi.login('testuser', 'password'),
        });

        const loginResponse = await fetchWithoutToken('/api/v1/auth/login', {
            method: 'POST',
            body: JSON.stringify({ username: 'testuser', password: 'password' }),
        });
        const loginData = await loginResponse.json();

        expect(loginData.token.token).toBe('fake_token_123');

        AuthUtils.setToken(loginData.token.token);

        // Mock first API call with 401 (Unauthorized) response
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: false,
            status: 401,
        });

        // Mock successful token refresh
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => ({ result: { token: { token: 'new_fake_token_456' } } }),
        });

        // Mock successful API call after token refresh
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => ({ result: "This is protected data" }),
        });

        (AuthUtils.getToken as jest.Mock)
            .mockReturnValueOnce('fake_token_123')  // First call, returns old token
            .mockReturnValue('new_fake_token_456');  // Subsequent calls, returns new token

        const protectedDataResponse = await fetchWithToken('/api/v1/protected-data');
        const protectedData = await protectedDataResponse.json();

        expect(protectedData.result).toBe("This is protected data");

        // Check that fetch was called 3 times (initial call, refresh token, retry with new token)
        expect(global.fetch).toHaveBeenCalledTimes(4);  // Including the login call

        // Check that the last call used the new token
        expect(global.fetch).toHaveBeenLastCalledWith(
            expect.stringContaining('/api/v1/protected-data'),
            expect.objectContaining({
                headers: expect.objectContaining({
                    'Authorization': 'Bearer new_fake_token_456',
                }),
            })
        );

        // Check that AuthUtils.setToken was called with the new token
        expect(AuthUtils.setToken).toHaveBeenCalledWith('new_fake_token_456');
    });

    it('should handle failed token refresh', async () => {
        // Mock initial API call with 401 (Unauthorized) response
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: false,
            status: 401,
        });

        // Mock failed token refresh
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: false,
            status: 400,
        });

        (AuthUtils.getToken as jest.Mock).mockReturnValue('expired_token');

        await expect(fetchWithToken('/api/v1/protected-data')).rejects.toThrow();

        // Check that fetch was called twice (initial call and refresh attempt)
        expect(global.fetch).toHaveBeenCalledTimes(2);
    });

    it('should queue multiple requests during token refresh', async () => {
        // Mock first API call with 401 (Unauthorized) response
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: false,
            status: 401,
        });

        // // Mock successful token refresh (will be called only once)
        // (global.fetch as jest.Mock).mockResolvedValueOnce({
        //     ok: true,
        //     json: async () => ({ result: { token: { token: 'new_fake_token_789' } } }),
        // });
        //
        // (global.fetch as jest.Mock)
        //     .mockResolvedValueOnce({
        //         ok: true,
        //         json: async () => ({ result: "Protected data 1" }),
        //     })
        //     .mockResolvedValueOnce({
        //         ok: true,
        //         json: async () => ({ result: "Protected data 2" }),
        //     });
        //
        // (AuthUtils.getToken as jest.Mock)
        //     .mockReturnValueOnce('expired_token')
        //     .mockReturnValue('new_fake_token_789');

        // Make two API calls in parallel
        const [response1, response2] = await Promise.all([
            fetchWithToken('/api/v1/protected-data-1'),
            fetchWithToken('/api/v1/protected-data-2')
        ]);

        const data1 = await response1.json();
        const data2 = await response2.json();

        expect(data1.result).toBe("Protected data 1");
        expect(data2.result).toBe("Protected data 2");

        // Check that fetch was called 4 times (2 initial calls, 1 refresh, 2 retries)
        expect(global.fetch).toHaveBeenCalledTimes(5);

        // Check that the token refresh was only called once
        expect(global.fetch).toHaveBeenCalledWith(
            expect.stringContaining('/api/v1/auth/refresh-token'),
            expect.any(Object)
        );

        // Check that both retried calls used the new token
        expect(global.fetch).toHaveBeenCalledWith(
            expect.stringContaining('/api/v1/protected-data-1'),
            expect.objectContaining({
                headers: expect.objectContaining({
                    'Authorization': 'Bearer new_fake_token_789',
                }),
            })
        );
        expect(global.fetch).toHaveBeenCalledWith(
            expect.stringContaining('/api/v1/protected-data-2'),
            expect.objectContaining({
                headers: expect.objectContaining({
                    'Authorization': 'Bearer new_fake_token_789',
                }),
            })
        );
    });
});