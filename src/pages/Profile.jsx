import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Profile() {
  return (
    <div>
      <Header name="Profile" iconProfile iconSearch={ false } />
      <Footer />
    </div>
  );
}

export default Profile;
