// src/pages/Profile.js
import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      setUsername(user.username || '');
      setEmail(user.email || '');
      setFirstname(user.name?.firstname || '');
      setLastname(user.name?.lastname || '');
      setCity(user.address?.city || '');
      setStreet(user.address?.street || '');
      setNumber(user.address?.number || '');
      setZipcode(user.address?.zipcode || '');
      setPhone(user.phone || '');
    } else {
      navigate('/login'); // Redirect to login if user is not logged in
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`https://fakestoreapi.com/users/7`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          username,
          password: password || user.password, // giữ mật khẩu hiện tại nếu không có mật khẩu mới
          name: {
            firstname,
            lastname
          },
          address: {
            city,
            street,
            number,
            zipcode,
            geolocation: user.address?.geolocation // giữ nguyên geolocation
          },
          phone
        })
      });

      const updatedUser = await response.json();

      if (response.ok) {
        setUser(updatedUser);
        alert('Profile updated successfully!');
        navigate('/');
      } else {
        throw new Error(updatedUser.message || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setError(error.message);
    }
  };

  return (
    <div className="container my-3 py-3">
      <h1 className="text-center">Profile</h1>
      <hr />
      <div className="row my-4">
        <div className="col-md-6 col-lg-4 col-sm-8 mx-auto">
          <form onSubmit={handleSubmit}>
            <div className="my-3">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="my-3">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="my-3">
              <label htmlFor="firstname">First Name</label>
              <input
                type="text"
                className="form-control"
                id="firstname"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                required
              />
            </div>
            <div className="my-3">
              <label htmlFor="lastname">Last Name</label>
              <input
                type="text"
                className="form-control"
                id="lastname"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                required
              />
            </div>
            <div className="my-3">
              <label htmlFor="city">City</label>
              <input
                type="text"
                className="form-control"
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>
            <div className="my-3">
              <label htmlFor="street">Street</label>
              <input
                type="text"
                className="form-control"
                id="street"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                required
              />
            </div>
            <div className="my-3">
              <label htmlFor="number">Number</label>
              <input
                type="number"
                className="form-control"
                id="number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                required
              />
            </div>
            <div className="my-3">
              <label htmlFor="zipcode">Zip Code</label>
              <input
                type="text"
                className="form-control"
                id="zipcode"
                value={zipcode}
                onChange={(e) => setZipcode(e.target.value)}
                required
              />
            </div>
            <div className="my-3">
              <label htmlFor="phone">Phone</label>
              <input
                type="text"
                className="form-control"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <div className="my-3">
              <label htmlFor="password">New Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Leave blank to keep current password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="text-center">
              <button className="btn btn-dark" type="submit">
                Update Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
