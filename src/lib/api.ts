const API_URL = "http://localhost:5000";

export const apiRequest = async (
    endpoint: string,
    method: string = "GET",
    body?: any
) => {
    const response = await fetch(`${API_URL}${endpoint}`, {
        method,
        headers: {
            "Content-Type": "application/json",
        },
        body: body ? JSON.stringify(body) : undefined,
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
    }

    return data;
};