import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ProfileIcon from '../images/profileIcon.svg';
import SearchIcon from '../images/searchIcon.svg';

function Header(props) {
  const [nameHeader, setNameHeader] = useState('');
  const [profile, setProfile] = useState(false);
  const [search, setSearch] = useState(false);

  useState(() => {
    const { iconSearch, iconProfile, name } = props;
    setSearch(iconSearch);
    setProfile(iconProfile);
    setNameHeader(name);
  }, []);
  return (
    <header>
      <h1 data-testid="page-title">{ nameHeader }</h1>
      { profile
      && <img
        data-testid="profile-top-btn"
        src={ ProfileIcon }
        alt="profile icon"
      />}
      { search
      && <img
        data-testid="search-top-btn"
        src={ SearchIcon }
        alt="search icon"
      />}
    </header>
  );
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  iconProfile: PropTypes.bool.isRequired,
  iconSearch: PropTypes.bool.isRequired,
};

export default Header;
