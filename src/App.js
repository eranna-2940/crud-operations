import React, { useState, useEffect } from "react";
import "./App.css";

const RegistrationForm = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [editingUserId, setEditingUserId] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    // Retrieve users from local storage or use the initial data if not available
    const usersData = JSON.parse(localStorage.getItem("usersData")) || require("./usersdata.json");
    setUsers(usersData.users);
  };

  const handleRegister = (event) => {
    event.preventDefault();

    const newUser = {
      id: users.length + 1,
      name,
      email,
    };

    // Add the new user to the local storage data
    const updatedUsersData = {
      users: [...users, newUser],
    };

    localStorage.setItem("usersData", JSON.stringify(updatedUsersData));
    fetchUsers(); // Fetch updated user data
    resetForm();
  };

  const handleEdit = (user) => {
    setName(user.name);
    setEmail(user.email);
    setEditingUserId(user.id);
  };

  const handleUpdate = (event, user) => {
    event.preventDefault();

    const updatedUser = {
      id: user.id,
      name,
      email,
    };

    // Update the user in the local storage data
    const updatedUsers = users.map((u) => (u.id === user.id ? updatedUser : u));
    const updatedUsersData = {
      users: updatedUsers,
    };

    localStorage.setItem("usersData", JSON.stringify(updatedUsersData));
    fetchUsers(); // Fetch updated user data
    resetForm();
    setEditingUserId(null);
  };

  const handleDelete = (userId) => {
    // Delete the user from the local storage data
    const updatedUsers = users.filter((u) => u.id !== userId);
    const updatedUsersData = {
      users: updatedUsers,
    };

    localStorage.setItem("usersData", JSON.stringify(updatedUsersData));
    fetchUsers(); // Fetch updated user data
  };

  const resetForm = () => {
    setName("");
    setEmail("");
  };

  return (
    <div className="registration-form">


  <div className="content">
      <h1>Crud-Operations</h1>
      <form onSubmit={editingUserId ? (event) => handleUpdate(event, users[editingUserId - 1]) : handleRegister}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-buttons">
          <button type="submit">{editingUserId ? "Update" : "Register"}</button>
          {/* <button type="button" onClick={() => {resetForm(); setEditingUserId(null)}}>
            Reset
          </button> */}
        </div>
        
      </form>
      </div>
      <h2>Added Users</h2>
  
      
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button onClick={() => handleEdit(user)}>Edit</button>
                <button onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RegistrationForm;
