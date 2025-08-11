export const API_URL = process.env.REACT_APP_API_URL;
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


