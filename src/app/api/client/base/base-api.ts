abstract class BaseApi {
    public static generateSearchUri(url: string, params: Record<string, any>): string {
        let queryString = "";
        if (Object.keys(params).length === 0) {
            return url;
        }

        for (const key in params) {
            if (!key || !params[key]) continue;
            if (key === "search") {
                for (const searchKey in params[key]) {
                    if (!searchKey || !params[key][searchKey]) continue;
                    queryString += `&${searchKey}=${encodeURIComponent(params[key][searchKey])}`;
                }
                continue;
            }
            queryString += `&${key}=${encodeURIComponent(params[key])}`;
        }

        if (url.includes("?")) {
            url += queryString;
        } else {
            url += `?${queryString}`;
        }

        return url;
    }
}

export default BaseApi;
