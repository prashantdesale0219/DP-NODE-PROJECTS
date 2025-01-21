import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      // Check if the token is present in localStorage
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No authentication token found');
        return; // Exit the function early if token is missing
      }

      try {
        const response = await axios.get('http://localhost:5000/api/users', {
          headers: {
            Authorization: token, // Add the token for authentication
          },
        });

        setUsers(response.data); // Axios automatically parses JSON
      } catch (err) {
        if (err.response) {
          // Server responded with a status other than 2xx
          setError(`Error: ${err.response.status} - ${err.response.data.message || 'Failed to fetch users'}`);
        } else if (err.request) {
          // Request was made but no response received
          setError('No response received from the server');
        } else {
          // Other errors
          setError(err.message);
        }
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1>All Users</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            <strong>Username:</strong> {user.username} | <strong>Email:</strong> {user.email} | <strong>Role:</strong> {user.role}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
