import React, { useState, useEffect } from 'react';
import '../Styles/OrganizerCard.css'

interface Organizer {
  organizer_id: number;
  name: string;
  description: string | null;
  email: string | null;
  phone: string | null;
}

interface OrganizerDetailProps {
  organizerId: number;
}

const OrganizerCard: React.FC<OrganizerDetailProps> = ({ organizerId }) => {
  const [organizer, setOrganizer] = useState<Organizer | null>(null);

  useEffect(() => {
    const fetchOrganizer = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/organizers/${organizerId}`);
        const data = await res.json();
        if (res.ok) {
          setOrganizer(data.organizer);
        } else {
          console.error('Organizer not found');
        }
      } catch (err) {
        console.error('Error fetching organizer details:', err);
      }
    };

    fetchOrganizer();
  }, [organizerId]);

  if (!organizer) return <p>Loading organizer details...</p>;

  return (
    <div className="organizer-card">
      <h3>{organizer.name}</h3>
      <p><strong>Description:</strong> {organizer.description || 'No description available'}</p>
      <p><strong>Email:</strong> {organizer.email || 'Not available'}</p>
      <p><strong>Phone:</strong> {organizer.phone || 'Not available'}</p>
    </div>
  );
};

export default OrganizerCard;
