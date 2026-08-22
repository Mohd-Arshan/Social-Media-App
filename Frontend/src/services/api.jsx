// const API = "https://api.example.com"; 
// Uncomment this line for production
const API = "http://localhost:5000/api";

/*
 This function is a wrapper around the fetch API to handle API requests.
 It automatically includes the base API URL, sets the Content-Type header to application/json,
 and includes cookies in requests for authentication purposes.
 */

export async function apiFetch(endpoint, options = {}) {

    // Construct the full URL for the API request
    const url = `${API}${endpoint}`;
    const response = await fetch(url, {
        // Spread the options provided to the function, allowing for custom headers, methods, and body
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
        credentials: 'include', // Include cookies in requests
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || 'API request failed');
    }

    return data;
}
