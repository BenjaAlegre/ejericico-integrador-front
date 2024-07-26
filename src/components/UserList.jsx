// src/components/UserList.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');
  const rol = localStorage.getItem('rol');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3000/user', {
          headers: {
            'Authorization': `${token}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          setUsers(data);
        } else {
          setMessage('Failed to fetch users: ' + data.message);
        }
      } catch (error) {
        setMessage('Failed to fetch users: ' + error.message);
      }
    };
    fetchUsers();
  }, []);
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/user/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `${token}`,
        },
      });
      if (response.ok) {
        setUsers(users.filter(user => user.id !== id));
      } else {
        setMessage('Failed to delete user');
      }
    } catch (error) {
      setMessage('Failed to delete user: ' + error.message);
    }
  };

  const handleEdit = (id) => {
    navigate(`/userlist/edit/${id}`);
  };


  return (
    <div>
      <h2>User List</h2>
      {message && <p>{message}</p>}
      <ul>
        {users.map(user => (
            <li key={user.id}>
                
            {user.nombre} {user.apellido} ({user.email})
            {rol === '2' && (
              <>
                <button onClick={() => handleEdit(user.id)}>Edit</button>
                <button onClick={() => handleDelete(user.id)}>Delete</button>
              </>
            )}
          </li>        ))}
      </ul>
    </div>
  );
};

export default UserList;
