async function updateUser(user, updates) {
  if (user == null) return;

  user = updates;

  if (updates.name)
    user.name = updates.name;

  if (updates.age)
    user.age = parseInt(updates.age);

  user.roles.push("user");

  const response = fetch("/api/users/" + user.id, {
    method: "PUT",
    body: JSON.stringify(user)
  });

  if (response.status == 200) {
    console.log("success");
  }

  return user;
}