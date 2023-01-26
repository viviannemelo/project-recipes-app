import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ProfileIcon from '../images/profileIcon.svg';
import SearchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header(props) {
  const [nameHeader, setNameHeader] = useState('');
  const [profile, setProfile] = useState(false);
  const [search, setSearch] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [pageType, setPageType] = useState('');

  useState(() => {
    const { iconSearch, iconProfile, name } = props;
    setSearch(iconSearch);
    setProfile(iconProfile);
    setNameHeader(name);
    setPageType(name);
  }, []);

  const ableInput = () => {
    setShowInput(showInput === false);
  };

  return (
    <header>
      <h1 data-testid="page-title">{ nameHeader }</h1>
      { profile
      && (
        <Link to="/profile">
          <img
            data-testid="profile-top-btn"
            src={ ProfileIcon }
            alt="profile icon"
          />
        </Link>
      )}
      { search
      && (
        <button
          onClick={ ableInput }
        >
          <img
            data-testid="search-top-btn"
            src={ SearchIcon }
            alt="search icon"
          />
        </button>
      )}
      { showInput
        && <SearchBar name={ pageType } />}
    </header>
  );
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  iconProfile: PropTypes.bool.isRequired,
  iconSearch: PropTypes.bool.isRequired,
};

export default Header;
