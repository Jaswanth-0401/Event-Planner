import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../Styles/Profile.css';

interface User {
  user_id: number;
  name: string;
  email: string;
  phone?: string;
  year_of_study?: string;
}

const Profile: React.FC = () => {
  const [userDetails, setUserDetails] = useState<User | null>(null);

  useEffect(() => {
    const userId = localStorage.getItem('userId');

    if (userId) {
      axios
        .get(`http://localhost:5000/api/users/${userId}`)
        .then((res) => {
          console.log('Fetched user:', res.data);
          setUserDetails(res.data);
        })
        .catch((err) => console.error('Error fetching user details:', err));
    }
  }, []);

  if (!userDetails) return <div>Loading...</div>;

  return (
    <div className="profile-page">
      <h2>Profile</h2>
      <div className="profile-info">
        <p><strong>Name:</strong> {userDetails.name}</p>
        <p><strong>Email:</strong> {userDetails.email}</p>
        <p><strong>Phone:</strong> {userDetails.phone || 'Not provided'}</p>
        <p><strong>Year of Study:</strong> {userDetails.year_of_study || 'Not provided'}</p>
      </div>
    </div>
  );
};

export default Profile;
