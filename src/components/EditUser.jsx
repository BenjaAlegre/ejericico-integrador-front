// src/components/EditUser.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditUser = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:3000/user/${id}`, {
          headers: {
            'Authorization': `${token}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          setUser(data);
        } else {
          setMessage('Failed to fetch user: ' + data.message);
        }
      } catch (error) {
        setMessage('Failed to fetch user: ' + error.message);
      }
    };
    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/user/${id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      const data = await response.json();
      if (response.ok) {
        navigate('/userlist');
      } else {
        setMessage('Failed to update user: ' + data.message);
      }
    } catch (error) {
      setMessage('Failed to update user: ' + error.message);
    }
  };

  return (
    <div>
      <h2>Edit User</h2>
      {message && <p>{message}</p>}
      {user && (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Nombre</label>
            <input name="nombre" value={user.nombre} onChange={handleChange} />
          </div>
          <div>
            <label>Apellido</label>
            <input name="apellido" value={user.apellido} onChange={handleChange} />
          </div>

          <button type="submit">Guardar</button>
        </form>
      )}
    </div>
  );
};

export default EditUser;
