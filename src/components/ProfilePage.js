import React from 'react';
import { Link } from 'react-router-dom';

function Profile() {
  const email = localStorage.getItem('user');

  const clear = () => localStorage.clear();

  return (
    <div>
      <p data-testid="profile-email">{ email }</p>
      <Link to="/done-recipes">
        <button data-testid="profile-done-btn">Done Recipes</button>
      </Link>
      <Link to="favorite-recipes">
        <button data-testid="profile-favorite-btn">Favorite Recipes</button>
      </Link>
      <Link to="/">
        <button data-testid="profile-logout-btn" onClick={ clear }>Logout</button>
      </Link>
    </div>
  );
}

export default Profile;
