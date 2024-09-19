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

describe('Login and Protected Data Fetch Test', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should login and fetch protected data', async () => {
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

        // Set the token in AuthUtils
        AuthUtils.setToken(loginData.token.token);

        // Mock protected data API call
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => ({ result: "This is protected data" }),
        });

        // Mock AuthUtils.getToken to return our fake token
        (AuthUtils.getToken as jest.Mock).mockReturnValue('fake_token_123');

        const protectedDataResponse = await fetchWithToken('/api/v1/protected-data');
        const protectedData = await protectedDataResponse.json();

        expect(protectedData.result).toBe("This is protected data");

        expect(global.fetch).toHaveBeenLastCalledWith(
            expect.stringContaining('/api/v1/protected-data'),
            expect.objectContaining({
                headers: expect.objectContaining({
                    'Authorization': 'Bearer fake_token_123',
                }),
            })
        );
    });
});