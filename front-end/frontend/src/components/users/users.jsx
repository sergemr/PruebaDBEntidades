import React, { useState, useEffect } from "react";
import axios from "axios";

function UserList() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));
  const token = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        console.log("user", user);
        // Make the GET request with the token in the headers
        const response = await axios.get("http://localhost:3008/users", {
          headers: {
            Authorization: `Bearer ${token}`, // Attach the token to the Authorization header
          },
        });

        setUsers(response.data);
      } catch (error) {
        setError("Error fetching users");
      }
    };

    fetchUsers();
  }, []);

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:3008/users/${userId}`);
      setUsers(users.filter((user) => user.user_id !== userId));
    } catch (error) {
      setError("Error deleting user");
    }
  };

  return (
    <div>
      <h2>User List</h2>
      {error && <p>{error}</p>}
      <ul>
        {users.map((user) => (
          <li key={user.user_id}>
            <strong>ID:</strong> {user.user_id}, <strong>Email:</strong>{" "}
            {user.user_email}, <strong>Name:</strong> {user.user_name}
            <button onClick={() => deleteUser(user.user_id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
