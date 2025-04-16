import React, { useState, useEffect } from 'react';
import '../../Styles/Profile.css';
import { useUser } from '../../Context/UserContext';

const Profile: React.FC = () => {
  const { user } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        password: '',
      });
    }
  }, [user]);

  const handleEditClick = () => {
    setIsEditing((prev) => !prev);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Profile updated:', formData);
    setIsEditing(false);
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="profile-page">
      <h2>Profile</h2>
      <form className="profile-info" onSubmit={handleSubmit}>
        <p>
          <strong>Name:</strong>{' '}
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          ) : (
            formData.name
          )}
        </p>
        <p>
          <strong>Email:</strong>{' '}
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          ) : (
            formData.email
          )}
        </p>
        <p>
          <strong>Role:</strong> {user.role}
        </p>

        {isEditing && (
          <div className="password-field">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
        )}

        <button type={isEditing ? 'submit' : 'button'} onClick={handleEditClick} className="edit-btn">
          {isEditing ? 'Save Changes' : 'Edit Profile'}
        </button>
      </form>
    </div>
  );
};

export default Profile;
