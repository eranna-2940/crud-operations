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
    // Simulate fetching users from the JSON file
    const usersData = require("./usersData.json");
    setUsers(usersData.users);
  };

  const handleRegister = (event) => {
    event.preventDefault();

    const newUser = {
      id: users.length + 1,
      name,
      email,
    };

    // Simulate adding a new user to the JSON file
    setUsers([...users, newUser]);
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

    // Simulate updating the user in the JSON file
    const updatedUsers = users.map((u) => (u.id === user.id ? updatedUser : u));
    setUsers(updatedUsers);
    resetForm();
    setEditingUserId(null);
  };

  const handleDelete = (userId) => {
    // Simulate deleting the user from the JSON file
    const updatedUsers = users.filter((u) => u.id !== userId);
    setUsers(updatedUsers);
  };

  const resetForm = () => {
    setName("");
    setEmail("");
  };

  return (
    <div className="registration-form">
      <h1>Registration Form</h1>
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
        </div>
      </form>

      <h2>Registered Users</h2>
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
{
    "users": [
      {
        "id": 1,
        "name": "John Doe",
        "email": "john.doe@example.com"
      },
      {
        "id": 2,
        "name": "Jane Smith",
        "email": "jane.smith@example.com"
      }
    ]
  }
/* App.css */

body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f1f1f1;
  }
  
  .registration-form {
    margin: 20px;
    max-width: 500px;
    padding: 20px;
    border-radius: 8px;
    background-color: #fff;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  }
  
  .registration-form h1 {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .registration-form form div {
    margin-bottom: 20px;
  }
  
  .registration-form label {
    display: block;
    font-weight: bold;
    margin-bottom: 8px;
  }
  
  .registration-form input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .registration-form .form-buttons {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
  }
  
  .registration-form button {
    padding: 10px 20px;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .registration-form button.register {
    background-color: #4caf50;
  }
  
  .registration-form button.edit {
    background-color: #2196f3;
  }
  
  .registration-form button.delete {
    background-color: #f44336;
  }
  
  .registration-form button:hover {
    background-color: #45a049;
  }
  
  .registration-form h2 {
    margin-top: 40px;
  }
  
  .registration-form table {
    width: 100%;
    border-collapse: collapse;
    background-color: #fff;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  }
  
  .registration-form table th,
  .registration-form table td {
    padding: 12px;
    text-align: center;
    border-bottom: 1px solid #ddd;
  }
  
  .registration-form table th {
    background-color: #f2f2f2;
    font-weight: bold;
  }
  
  .registration-form .no-data {
    text-align: center;
    padding: 20px;
    color: #999;
  }
    