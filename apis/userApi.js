// userApi.js
import { apiClient } from "./apiClient";

export async function updateUser(user) {
  try {
    const data = await apiClient("/api/user", {
      method: "PUT",
      body: JSON.stringify(user)
    });

    return data;
  } catch (error) {
    console.error("Failed to update:", error);
    throw error;
  }
}

export async function getUser(id) {
  return apiClient(`/api/user/${id}`, {
    method: "GET"
  });
}