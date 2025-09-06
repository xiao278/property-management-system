// export const API_URL = process.env.REACT_APP_API_URL;
export const API_URL = `${window.location.protocol}//${window.location.hostname}:${process.env.REACT_APP_API_PORT}`;
export const tokenName = "pms-token";

const request = async (endpoint: string, requestParams: RequestInit) => {
    const token = localStorage.getItem(tokenName);
    if (token) {
        if (!requestParams.headers) requestParams.headers = {};
        (requestParams.headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
    }
    const result = await fetch(endpoint, requestParams);
    if (result.status == 401) {
        localStorage.removeItem(tokenName);
    }
    return result;
}

export const post = async (endpoint: string, payload: object) => {
    return await request(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
    });
}

export const get = async (endpoint: string, query?: string | Record<string, string> | URLSearchParams | string[][]) => {
    var queryURL = "";
    if (query) {
        const params = new URLSearchParams(query);
        queryURL = "?" + params.toString();
    }
    return await request(`${API_URL}${endpoint}${queryURL}`, {
        method: 'GET',
        headers: {}
    });
}