// updateUser.js

import { useEffect, useState } from "react";
import { getUser, updateUserApi } from "./userApi";

export function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Load the user when the component loads
  useEffect(() => {
    async function loadUser() {
      try {
        setLoading(true);
        setError(null);

        const data = await getUser(userId);

        setUser(data);
      } catch (error) {
        console.error("Unable to load user:", error);
        setError("Unable to load user.");
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, [userId]);

  // Called when the user saves changes
  async function handleUpdate(updates) {
    try {
      setSaving(true);
      setError(null);

      // Send only the changes and the user's ID
      const savedUser = await updateUserApi(user.id, updates);

      // Server response becomes the new frontend state
      setUser(savedUser);

      console.log("User updated successfully");
    } catch (error) {
      console.error("Unable to update user:", error);
      setError("Unable to save your changes. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error && !user) {
    return <div>{error}</div>;
  }

  if (!user) {
    return <div>User not found.</div>;
  }

  return (
    <div>
      <h1>{user.name}</h1>
      <p>Age: {user.age}</p>

      {error && <p>{error}</p>}

      <button
        disabled={saving}
        onClick={() =>
          handleUpdate({
            name: "Updated Name"
          })
        }
      >
        {saving ? "Saving..." : "Update User"}
      </button>
    </div>
  );
}