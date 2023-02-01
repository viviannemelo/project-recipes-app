import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ProfilePage from '../components/ProfilePage';

function Profile() {
  return (
    <div>
      <Header name="Profile" iconProfile iconSearch={ false } />
      <ProfilePage />
      <Footer />
    </div>
  );
}

export default Profile;
