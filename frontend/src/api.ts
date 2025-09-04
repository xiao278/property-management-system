// export const API_URL = process.env.REACT_APP_API_URL;
export const API_URL = `${window.location.protocol}//${window.location.hostname}:${process.env.REACT_APP_API_PORT}`;
export const tokenName = "pms-token";

export const post = async (endpoint: string, payload: object) => {
    const token = localStorage.getItem(tokenName);
    return await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...(token && {'Authorization':`Bearer ${token}`})
        },
        body: JSON.stringify(payload)
    });
}

export const get = async (endpoint: string, query?: string | Record<string, string> | URLSearchParams | string[][]) => {
    const token = localStorage.getItem(tokenName);
    var queryURL = "";
    if (query) {
        const params = new URLSearchParams(query);
        queryURL = "?" + params.toString();
    }
    return await fetch(`${API_URL}${endpoint}${queryURL}`, {
        method: 'GET',
        headers: {
            ...(token && {'Authorization':`Bearer ${token}`})
        },
    });
}