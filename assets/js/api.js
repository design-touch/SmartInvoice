
const API_URL =
    "https://script.google.com/macros/s/AKfycbyqHYNteJ1l-plKqx8tszHCtDNpPz6Cal_VNs06GsK/exec";

async function apiGet(action, params = {}) {
    const query = new URLSearchParams({
        action,
        ...params
    });

    const response = await fetch(`${API_URL}?${query.toString()}`);

    if (!response.ok) {
        throw new Error("API request failed.");
    }

    return response.json();
}

async function apiPost(action, data = {}) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "text/plain;charset=utf-8"
        },
        body: JSON.stringify({
            action,
            ...data
        })
    });

    if (!response.ok) {
        throw new Error("API request failed.");
    }

    return response.json();
}
