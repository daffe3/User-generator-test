import React, { useState } from 'react';
import './App.css';

function App() {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchPeople = () => {
    setLoading(true);
    setError('');
    fetch('https://randomuser.me/api/')
      .then(response => response.json())
      .then(data => {
        setPeople(data.results);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching people:', error);
        setError('Något gick fel, försök igen.');
        setLoading(false);
      });
  };

  const handleButtonClick = () => {
    fetchPeople();
  };

  return (
    <div className="container">
      <h1>Random User Generator</h1>
      <button onClick={handleButtonClick} className="button">
        {loading ? 'Fetching...' : 'Fetch Users'}
      </button>
      {error && <p className="error">{error}</p>}
      <div className="users">
        {people.map(person => (
          <div key={person.login.uuid} className="user">
            <img src={person.picture.large} alt="User" className="avatar" />
            <div className="info">
              <h2>{person.name.first} {person.name.last}</h2>
              <p><strong>Email:</strong> {person.email}</p>
              <p><strong>Phone:</strong> {person.phone}</p>
              <p><strong>Address:</strong> {person.location.street.number} {person.location.street.name}, {person.location.city}, {person.location.state}, {person.location.country}, {person.location.postcode}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
