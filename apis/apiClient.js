// apiClient.js

export async function apiFetch(url, options = {}) {
  const response = await fetch(url, {
    method: "GET",      //default method already because of fetch but yeah
    ...options,
    credentials: "include",

    headers: {
      "Content-Type": "application/json",
      ...options.headers
    }
  });

  if (response.status === 401) {
    throw new Error("Not authenticated");
  }

  if (response.status === 403) {
    throw new Error("Not authorized");
  }

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  return response.json();
}